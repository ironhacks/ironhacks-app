import React from 'react';
import { withRouter } from 'react-router';
import { Row, Col } from '../../components/layout';
import { InputText, InputCheckbox, InputTextarea } from '../../components/input';
import { FileUpload, } from '../../components/dropzone';
import { fire2Date, fire2Ms } from '../../util/date-utils'

class SubmitView extends React.Component {
  constructor(props) {
    super(props);

    this.submissionId = this.props.match.params.submissionId;

    this.state = {
      loading: true,
      submissionForm: {
        deadline: '',
        name: '',
        description: '',
        survey: '',
        fields: [],
        files: [],
      },
      acceptedFiles: null,
      submissionData: {
        public: false,
        files: [], // COMPLETED FILE UPLOADS ADDED TO HERE BEFORE SUBMISSION
        fields: [],
      },
      submissionFiles: [], // HOLDS FILES BEFORE UPLOAD BEGINS
      submissionDisabled: false,
    }

    this.onFileUploadFiles = this.onFileUploadFiles.bind(this);
    this.startSubmitSubmission = this.startSubmitSubmission.bind(this);
    this.uploadSubmissionFile = this.uploadSubmissionFile.bind(this);
    this.onSubmissionInputChange = this.onSubmissionInputChange.bind(this);
    this.onSubmissionFieldChanged = this.onSubmissionFieldChanged.bind(this);
    this.getSubmissionData = this.getSubmissionData.bind(this);
  }

  componentDidMount(){
    this.getSubmissionData()
  }

  onFileUploadFiles(_files) {
    this.setState({submissionFiles: _files});
  }

  onSubmissionInputChange(name, value) {
    let submission = this.state.submissionData;
    submission[name] = value;
    this.setState({public: value})
  }

  getSubmissionData() {
    const hackId = this.props.hackId;
    const submissionId = this.submissionId;
    window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('submissions')
      .doc('settings')
      .get()
      .then((doc)=>{
        let submissions = doc.data();
        if (submissions[submissionId]){
          let submissionForm = submissions[submissionId];
          let acceptedFiles = submissionForm.files.map((item, index)=>{
            return item.name;
          })

          this.setState({
            submissionForm: submissionForm,
            acceptedFiles: acceptedFiles,
          });
        }
      })
  }

  onSubmissionFieldChanged(name, value, index) {
    let fields = this.state.submissionData.fields;
    let submissionData = this.state.submissionData;
    fields[index] = value;

    this.setState({
      submissionData: {
        ...submissionData,
        fields: fields,
      }
    });
  }

  uploadSubmissionFile({file, hackId, submissionId, userId}) {
    const storageRef = window.firebase.storage().ref();
    const pathRef = storageRef.child(`data/hacks/${hackId}/${submissionId}/${userId}/${file.path}`);
    const uploadTask = pathRef.put(file);

    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case window.firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case window.firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
          default:
            console.log('Uploading');
        }
      }, function(error) {
        console.log('Upload error', error);
      }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
        });
      });


    uploadTask.then((snapshot) => {
        pathRef.getDownloadURL()
          .then((url)=>{
            const fileData = this.state.submissionData.files;
            fileData.push({
              name: file.path,
              url: url,
              size: file.size,
              type: file.type,
              updated: file.lastModified,
            });

            this.setState({
              submissionData: {
                ...this.state.submissionData,
                files: fileData,
              }
            })

            const submissionData = this.state.submissionData;

            if (fileData.length === submissionData.files.length){
              console.log('uploading complete');
              this.setState({uploading: false});
              this.completeSubmitSubmission(submissionData);
            }
          })
          .catch(function(error) {
            console.error('Error getting documents: ', error);
          })
      })
      .catch((error) => {
        console.log('Upload Failed:', file, error.message);
      })
  }

  startSubmitSubmission() {
    this.setState({submissionDisabled: true});
    const files = this.state.submissionFiles;
    const userId = this.props.userId;
    const hackId = this.props.hackId;
    const submissionId = this.submissionId;

    files.forEach((item, i) => {
      this.uploadSubmissionFile({
        file: item,
        hackId: hackId,
        submissionId: submissionId,
        userId: userId,
      })
    });
  }

  completeSubmitSubmission(data) {
    const userId = this.props.userId;
    const hackId = this.props.hackId;
    const submissionId = this.submissionId;

    window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('submissions')
      .doc(submissionId)
      .collection('users')
      .doc(userId)
      .set(data, {merge: true})
      .then(()=>{
        this.setState({submissionDisabled: false});
        console.log('done');
        window.location = `/hacks/${this.props.hackSlug}`;
      })
  }

  render() {
    return (
      <>
      <Row>
        <Col>
          <h3 className="h2 font-bold py-2">
            {this.state.submissionForm.name}
          </h3>

          <p className="py-1">
            Deadline: {this.state.submissionForm.deadline ? fire2Date(this.state.submissionForm.deadline).toISOString() : ''}
          </p>

          <h3 className="h3 font-bold">Description:</h3>

          <p className="bg-grey-lt4 p-2 mb-2">
            {this.state.submissionForm.description}
          </p>

          {this.state.submissionForm.fields.map((item, index)=>(
            <InputTextarea
              key={index}
              containerClass="flex flex-col py-1 flex-between"
              inputClass="flex-3"
              labelClass="flex-1 font-bold"
              name={`field_${index}`}
              label={item.title}
              value={this.state.submissionData.fields[index] || ''}
              onInputChange={(name, value)=>this.onSubmissionFieldChanged(name, value, index)}
            />
          ))}

          <h3 className="h3 py-1 font-bold">
            Submission Files
          </h3>
          <ul className="list">
          {this.state.submissionForm.files.map((item, index)=>(
            <li key={index} className="list-item">
              <span>{item.name}</span>
              {item.required && (<span className="font-italic ml-1">*required</span>)}
            </li>
          ))}
          </ul>

          <div className="p-2">
            <h3 className="h3 font-bold py-3">
              File Upload
            </h3>

            <FileUpload
              acceptedFiles={this.state.acceptedFiles}
              onFilesChanged={this.onFileUploadFiles}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="flex flex-end">
            <InputCheckbox
              label="Share my submission"
              name="public"
              labelClass="badge"
              onInputChange={this.onSubmissionInputChange}
              isChecked={this.state.submissionData.public}
            />
          </div>

          <div className="flex flex-end">
            <button
              className="btn btn-success px-3"
              onClick={this.startSubmitSubmission}
              disabled={this.state.submissionDisabled}
              >
              Submit
            </button>
          </div>
        </Col>
      </Row>
      </>
    )
  }
}

export default withRouter(SubmitView)
