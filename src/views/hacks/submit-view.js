import React from 'react';
import { Row, Col } from '../../components/layout';
import { InputText, InputCheckbox, InputTextarea } from '../../components/input';
import { FileUpload, } from '../../components/dropzone';


class SubmitView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: true,
      submissionData: {
        description: '',
        references: '',
        keywords: [],
        public: false,
        files: [],
      },
      submissionFiles: [],
      submissionDisabled: false,
    }

    this.submissionPhase = 'phase1';

    this.onFileUploadFiles = this.onFileUploadFiles.bind(this);
    this.startSubmitSubmission = this.startSubmitSubmission.bind(this);
    this.uploadSubmissionFile = this.uploadSubmissionFile.bind(this);
    this.onSubmissionInputChange = this.onSubmissionInputChange.bind(this);
  }

  onFileUploadFiles(_files) {
    this.setState({submissionFiles: _files});
  }

  onSubmissionInputChange(name, value) {
    let submission = this.state.submissionData;
    submission[name] = value;
    this.setState({public: value})
  }

  uploadSubmissionFile({file, hackId, phaseId, userId}) {
    const storageRef = window.firebase.storage().ref();
    const pathRef = storageRef.child(`data/hacks/${hackId}/${phaseId}/${userId}/${file.path}`);

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
            });

            const submissionData = this.state.submissionData;
            if (fileData.length === submissionData.files.length){
              console.log('uploading complete');
              this.setState({uploading: false});
              this.completeSubmitSubmission(submissionData);
            }
          })
          .catch(function(error) {
            console.error('Error getting documents: ', error);
          });
      })
      .catch((error) => {
        console.log('Upload Failed:', file, error.message);
      });
  }

  startSubmitSubmission() {
    this.setState({submissionDisabled: true});
    let files = this.state.submissionFiles;
    const userId = this.props.userId;
    const hackId = this.props.hackId;
    const phaseId = 'phase1';

    files.forEach((item, i) => {
      this.uploadSubmissionFile({
        file: item,
        hackId: hackId,
        phaseId: phaseId,
        userId: userId,
      })
    });
  }

  completeSubmitSubmission(data) {
    const userId = this.props.userId;
    const hackId = this.props.hackId;
    const phaseId = 'phase1';

    window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('submissions')
      .doc(phaseId)
      .collection('users')
      .doc(userId)
      .set(data, {merge: true})
      .then(()=>{
        this.setState({submissionDisabled: false});
        console.log('done');
        window.location.reload();
      })
  }

  render() {
    return (
      <>
      <Row>
        <Col>

          <h3 className="h3 py-2">
            Current Submission
          </h3>

          <InputTextarea
            containerClass="flex py-1 flex-between"
            inputClass="mx-2 flex-3"
            labelClass="flex-1"
            name="submission_description"
            label="Description of the model"
            value={this.state.submissionData.description || ''}
            onInputChange={(name, value)=>this.onSubmissionInputChange('description', value)}
          />

          <InputTextarea
            containerClass="flex py-1 flex-between"
            inputClass="mx-2 flex-3"
            labelClass="flex-1"
            name="submission_references"
            label="Submission References"
            value={this.state.submissionData.references || ''}
            onInputChange={(name, value)=>this.onSubmissionInputChange('references', value)}
          />

          <InputText
            containerClass="flex py-1 flex-between"
            inputClass="mx-2 flex-2"
            labelClass="flex-1"
            name="submission_keywords"
            label="Keywords"
            icon="image"
            iconClass="pl-1 pr-2"
            value={this.state.submissionData.keywords || ''}
            onInputChange={(name, value)=>this.onSubmissionInputChange('keywords', value)}
          />

          <InputCheckbox
            label="Share my submission"
            name="public"
            onInputChange={this.onSubmissionInputChange}
            isChecked={this.state.submissionData.public}
          />

          <h2 className="h2 py-3">
            File Upload
          </h2>

          <FileUpload
            onFilesChanged={this.onFileUploadFiles}
          />

        </Col>
      </Row>

      <Row>
        <Col>
          <button
            onClick={this.startSubmitSubmission}
            disabled={this.state.submissionDisabled}
            >
            Submit
          </button>
        </Col>
      </Row>
      </>
    )
  }
}

export default SubmitView
