import React from 'react';
import { withRouter } from 'react-router';
import { Row, Col } from '../../components/layout';
import { InputTextarea } from '../../components/input';
import { FileUpload } from '../../components/dropzone';
import { MdContentView } from '../../components/markdown-viewer';
import { fire2Date, fire2Ms } from '../../util/date-utils'
import { userMetrics } from '../../util/user-metrics'
import { crc32 } from '../../util/hash-crc32'
import Swal from 'sweetalert2';

function SubmissionField({
  index,
  title,
  value,
  isValid,
  isRequired,
  isDisabled,
  onChange,
}) {
  return (
    <div className="my-3">
      <h3 className={`${isValid ? '' : 'font-bold cl-red'}`}>
        <strong>{`Q${index + 1}.`}</strong>
        <span>{title}</span>
        {isRequired ? (<span className="ml-1 pb-1 badge font-italic">(required)</span>) : (null)}
      </h3>

      <InputTextarea
        containerClass="flex flex-col py-1 flex-between"
        inputClass={`flex-3 ${isValid ? '' : 'border-danger'}`}
        labelClass="flex-1 font-bold hide"
        name={`field_${index}`}
        label={`Q${index + 1}`}
        value={value}
        disabled={isDisabled}
        onInputChange={onChange}
      />
    </div>
  )
}

class SubmitView extends React.Component {
  constructor(props) {
    super(props);

    this.submissionId = this.props.match.params.submissionId;

    this.dateSettings = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }

    this.state = {
      loading: true,
      user: null,
      submissionForm: {
        deadline: '',
        name: '',
        description: '',
        survey: '',
        fields: [],
        files: [],
      },
      uploading: false,
      acceptedFiles: null,
      submissionData: {
        public: false,
        files: [], // COMPLETED FILE UPLOADS ADDED TO HERE BEFORE SUBMISSION
        fields: [],
      },
      submissionFiles: [], // HOLDS FILES BEFORE UPLOAD BEGINS
      fileProgress: [],
      submissionDisabled: false,
      surveyComplete: false,
      uploadComplete: false,
      submissionComplete: false,
    }
  }

  componentDidMount(){
    this.getUser()
    this.getSubmissionData()
  }

  getUser = () => {
    window.firebase.firestore()
      .collection('users')
      .doc(this.props.userId)
      .get()
      .then(doc=>{
        this.setState({user: doc.data()})
      })

  };

  onFileUploadFiles = _files => {
    this.setState({submissionFiles: _files});
  };

  onSubmissionInputChange = (name, value) => {
    let submission = this.state.submissionData;
    submission[name] = value;
    this.setState({public: value})
  };

  getSubmissionData = () => {
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
          let fields = [];
          let submissionForm = submissions[submissionId];
          let acceptedFiles = submissionForm.files.map((item, index)=>{
            return item.name;
          })

          submissionForm.fields = submissionForm.fields.map((item, index)=>{
            fields.push('');
            return {
              ...item,
              isValid: true,
            }
          })
          submissionForm.files = submissionForm.files.map((item, index)=>{
            return {
              ...item,
              isValid: true,
            }
          })

          if (fire2Ms(submissionForm.deadline) < Date.now()){
            this.setState({
              submissionDisabled: true,
            })
          }

          let submissionData = this.state.submissionData;
          submissionData.fields = fields;
          this.setState({
            submissionData: submissionData,
            submissionForm: submissionForm,
            acceptedFiles: acceptedFiles,
          });
        }
      })
  };

  onSubmissionFieldChanged = (name, value, index) => {
    let fields = this.state.submissionData.fields;
    let submissionData = this.state.submissionData;
    fields[index] = value;

    this.setState({
      submissionData: {
        ...submissionData,
        fields: fields,
      }
    });
  };

  uploadSubmissionFile = ({file, index, hackId, submissionId, userId}) => {
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


            if (fileData.length === this.state.submissionFiles.length){
              console.log('uploading complete');
              this.setState({
                uploadComplete: true,
                uploading: false
              });

              this.completeSubmitSubmission();
            }
          })
          .catch(function(error) {
            console.error('Error getting documents: ', error);
          })
      })
      .catch((error) => {
        console.log('Upload Failed:', file, error.message);
      })
  };

  validateFields = () => {
    let submissionFields = this.state.submissionData.fields;
    let fieldIsValid = [];
    let form = this.state.submissionForm;
    let formFields = form.fields;

    formFields.forEach((field, index) => {

      if (field.required &&
        (!submissionFields[index] || submissionFields[index].trim().length === 0))
      {
        fieldIsValid.push(false)
        formFields[index].isValid = false;
      } else {
        fieldIsValid.push(true)
        formFields[index].isValid = true;
      }
    })

    // SET STATE FOR UI STATE / FEEDBACK
    this.setState({
      submissionForm: {
        ...form,
        fields: formFields,
      }
    })

    // RETURN TRUTH STATEMENT TO CONTINUE OR STOP SUBMISSION
    return fieldIsValid.every(item=>{ return item === true })
  };


  validateFiles() {
    let submissionFiles = this.state.submissionFiles;
    let fileIsValid = [];

    let form = this.state.submissionForm;
    let formFiles = form.files;

    formFiles.forEach((file, index) => {
      if (file.required && (!submissionFiles[index]))
      {
        fileIsValid.push(false)
        formFiles[index].isValid = false;
      } else {
        fileIsValid.push(true)
        formFiles[index].isValid = true;
      }
    })

    // SET STATE FOR UI STATE / FEEDBACK
    this.setState({
      submissionForm: {
        ...form,
        files: formFiles,
      }
    })

    // RETURN TRUTH STATEMENT TO CONTINUE OR STOP SUBMISSION
    return fileIsValid.every(item=>{ return item === true })
  }

  showConfirmModal = () => {
    Swal.fire({
      title: 'Are you ready to submit?',
      html: `
        <p>Confirm you want to submit the files.</p>
        <ul>${this.state.submissionFiles.map((item, index)=>(`<li><em>${item.name}<em></li>`))}</ul>
      `,
      icon: 'question',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit'
    })
    .then((result) => {
      if (result.value) {
        const files = this.state.submissionFiles;
        const userId = this.props.userId;
        const hackId = this.props.hackId;
        const submissionId = this.submissionId;

        this.setState({ uploading: true })

        files.forEach((item, index) => {
          this.uploadSubmissionFile({
            index: index,
            file: item,
            hackId: hackId,
            submissionId: submissionId,
            userId: userId,
          })
        })

        if (this.state.submissionForm.survey) {
          this.showSurveryModal()
        } else {
          this.setState({surveyComplete: true});
        }
      } else {
        this.setState({submissionDisabled: false});
      }
    })
  };

  showSurveryModal = () => {
    const formUrl = this.state.submissionForm.survey;
    const userEmail = this.state.user.email;
    const userId = this.props.userId;
    const hackId = this.props.hackId;
    const formId= crc32(`${this.props.hackSlug}|${this.submissionId}`).toString(16).toUpperCase()
    const formType = `hackSubmitSurvey_${formId}`;
    const alertUrl = `${formUrl}?userid=${userId}&email=${userEmail}&hackid=${hackId}&type=${formType}`;

    Swal.fire({
        title: 'Hack Submission Form',
        html: `<iframe src="${alertUrl}" title="Hack Submission Form"/>`,
        showCloseButton: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: 'surveyAlert',
      }).then(()=>{
        this.setState({surveyComplete: true});
        if (this.state.submissionComplete){
          this.showSuccessModal()
        }
      })
  };

  showSuccessModal = () => {
    Swal.fire({
      title: 'Submission Successful',
      text: 'Your submission is complete.',
      icon: 'success',
    })
    .then(() => {
      console.log('done');
      // this.setState({submissionDisabled: false});
      window.location = `/hacks/${this.props.hackSlug}`;
    })
  };

  startSubmitSubmission = () => {
    this.setState({submissionDisabled: true});

    let validFields = this.validateFields();
    let validFiles = this.validateFiles()

    if (!validFields || !validFiles) {
      this.setState({submissionDisabled: false});
      return false
    }

    this.showConfirmModal()
  };

  completeSubmitSubmission() {
    const submissionData = this.state.submissionData;
    const userId = this.props.userId;
    const hackId = this.props.hackId;
    const submissionId = this.submissionId;
    userMetrics({event: 'user_submission'})

    for (let field of submissionData.fields){
      if (typeof(submissionData.fields[field]) === 'undefined'){

      }
    }

    window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('submissions')
      .doc(submissionId)
      .collection('users')
      .doc(userId)
      .set(submissionData, {merge: true})
      .then(()=>{
        this.setState({ submissionComplete: true })
        if (this.state.surveyComplete){
          this.showSuccessModal()
        }
      })
  }

  render() {
    return (
      <div className="mb-7">
      <Row>
       {this.state.uploading && (
         <div style={{
           display: 'flex',
           position: 'fixed',
           width: '100vw',
           height: '100vh',
           zIndex: '1',
           top: 0,
           left: 0,
           bottom: 0,
           right: 0,
           background: 'radial-gradient(rgba(0,0,0,.4), transparent)',
           justifyContent: 'center',
           alignItems: 'center',
           color: 'white',
           fontSize: '1em',
         }}
         >
          Upload in progress...
         </div>
       )}
        <Col>
          <h3 className="h2 font-bold py-2">
            {this.state.submissionForm.name}
          </h3>

          <p className="py-1">
            <strong>Deadline:</strong>
            <span className="ml-2">
              {this.state.submissionForm.deadline ?
                fire2Date(this.state.submissionForm.deadline).toLocaleString('en-US', this.dateSettings)
                : ''
              }
            </span>
          </p>

          <MdContentView
            content={this.state.submissionForm.description}
            encoded={false}
            emptyText="Submission Description not available yet."
          />

          {this.state.submissionForm.fields.map((field, index)=>(
            <SubmissionField
              key={index}
              index={index}
              isValid={field.isValid}
              isRequired={field.required}
              title={field.title}
              value={this.state.submissionData.fields[index] || ''}
              isDisabled={this.state.submissionDisabled}
              onChange={(name, value)=>this.onSubmissionFieldChanged(name, value, index)}
            />
          ))}

          <h3 className="h3 py-1 font-bold">
            Submission Files
          </h3>

          <ul className="list">
          {this.state.submissionForm.files.map((item, index)=>(
            <li key={index} className="list-item">
              <code className={item.isValid ? '' : 'border-danger border'}>
                {item.name}
              </code>
              {item.required && (
                <span
                  className={`font-italic ml-1 badge font-italic ${item.isValid ? '' : 'cl-red'}`}>
                    (required)
                </span>
              )}
            </li>
          ))}
          </ul>

          <div className="p-2">
            <h3 className="h3 font-bold py-3">
              File Upload
            </h3>

            <FileUpload
              disabled={this.state.submissionDisabled}
              acceptedFiles={this.state.acceptedFiles}
              onFilesChanged={this.onFileUploadFiles}
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
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
      </div>
    )
  }
}

export default withRouter(SubmitView)
