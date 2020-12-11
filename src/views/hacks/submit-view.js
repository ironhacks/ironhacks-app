import { Component } from 'react'
import { withRouter } from 'react-router'
import { Row, Col } from '../../components/layout'
import { InputTextarea, InputMultiCreatableSelect } from '../../components/input'
import { CountdownTimer } from '../../components/timer'
import { FileUpload } from '../../components/dropzone'
import { MaterialDesignIcon } from '../../components/icons'
import { MdContentView } from '../../components/markdown-viewer'
import { fire2Date, fire2Ms } from '../../util/date-utils'
import { userMetrics } from '../../util/user-metrics'
import { crc32 } from '../../util/hash-crc32'
import { SUBMISSION_TAGS } from '../../data'
import Swal from 'sweetalert2'

function SubmissionField({ index, title, value, isValid, isRequired, isDisabled, onChange }) {
  return (
    <div className="my-3">
      <h3 className={`h4 ${isValid ? '' : 'cl-red'}`}>
        <span className="font-extrabold">{`Q${index + 1}. ${title}`}</span>
        {isRequired ? <span className="ml-1 pb-1 badge font-italic">(required)</span> : null}
      </h3>

      <InputTextarea
        containerClass="flex flex-col py-1 flex-between"
        inputClass={`flex-3 p-2 ${isValid ? '' : 'border-danger'}`}
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

class SubmitView extends Component {
  constructor(props) {
    super(props)

    this.submissionId = this.props.match.params.submissionId

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
        enabled: null,
        deadline: '',
        name: '',
        description: '',
        survey: '',
        summaryEnabled: false,
        tagsEnabled: false,
        fields: [],
        files: [],
      },
      uploading: false,
      acceptedFiles: null,
      submissionData: {
        public: false,
        summary: '',
        files: [], // COMPLETED FILE UPLOADS ADDED TO HERE BEFORE SUBMISSION
        fields: [],
        tags: [],
      },
      submissionFiles: [], // HOLDS FILES BEFORE UPLOAD BEGINS
      previousFiles: {},
      fileProgress: [],
      summaryInvalid: false,
      submissionDisabled: false,
      surveyComplete: false,
      uploadComplete: false,
      submissionClosed: false,
      submissionComplete: false,
    }

    this.SUMMARY_MIN_LENGTH = 500
  }

  uploadMessageStyle = {
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
  }

  componentDidMount() {
    this.getUser()
    this.getSubmissionData()
  }

  getUser = () => {
    window.firebase
      .firestore()
      .collection('users')
      .doc(this.props.userId)
      .get()
      .then((doc) => {
        this.setState({ user: doc.data() })
      })
  }

  getUserSubmissionData = async () => {
    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc(this.submissionId)
      .collection('users')
      .doc(this.props.userId)
      .get()

    if (doc.exists) {
      this.setState({ loading: true })
      let data = doc.data()
      let submissionData = this.state.submissionData

      submissionData.summary = data.summary
      submissionData.fields = data.fields
      submissionData.tags = data.tags

      let previousFiles = {}
      data.files.forEach((item, index) => {
        previousFiles[item.name] = item.url
      })

      this.setState({
        submissionData: submissionData,
        previousFiles: previousFiles,
        loading: false,
      })
    } else {
      this.setState({ loading: false })
    }
  }

  getSubmissionData = async () => {
    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc('settings')
      .get()

    let submissions = doc.data()
    if (submissions[this.submissionId]) {
      let submissionForm = submissions[this.submissionId]

      if (fire2Ms(submissionForm.deadline) < Date.now()) {
        this.setState({
          submissionDisabled: true,
          submissionClosed: true,
        })
      }

      if (!submissionForm.enabled) {
        this.setState({ submissionDisabled: true })
      }

      let acceptedFiles = submissionForm.files.map((item, index) => {
        return item.name
      })

      submissionForm.files = submissionForm.files.map((item, index) => {
        return {
          ...item,
          isValid: true,
        }
      })

      let fields = []
      submissionForm.fields = submissionForm.fields.map((item, index) => {
        fields.push('')
        return {
          ...item,
          isValid: true,
        }
      })

      let submissionData = this.state.submissionData
      submissionData.fields = fields

      this.setState({
        submissionData: submissionData,
        submissionForm: submissionForm,
        acceptedFiles: acceptedFiles,
      })

      this.getUserSubmissionData()
    }
  }

  onFileUploadFiles = (_files) => {
    this.setState({ submissionFiles: _files })
  }

  onSubmissionInputChange = (name, value) => {
    let submission = this.state.submissionData
    submission[name] = value
    this.setState({ submissionData: submission })
    if (name === 'summary' && this.state.summaryInvalid) {
      if (value.length >= this.SUMMARY_MIN_LENGTH) {
        this.setState({ summaryInvalid: false })
      }
    }
  }

  onSubmissionFieldChanged = (name, value, index) => {
    let fields = this.state.submissionData.fields
    let submissionData = this.state.submissionData
    fields[index] = value

    this.setState({
      submissionData: {
        ...submissionData,
        fields: fields,
      },
    })
  }

  uploadSubmissionFile = ({ file, index, hackId, submissionId, userId }) => {
    const storageRef = window.firebase.storage().ref()
    const pathRef = storageRef.child(`data/hacks/${hackId}/${submissionId}/${userId}/${file.path}`)
    const uploadTask = pathRef.put(file)

    uploadTask.on(
      'state_changed',
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case window.firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused')
            break
          case window.firebase.storage.TaskState.RUNNING:
            console.log('Upload is running')
            break
          default:
            console.log('Uploading')
        }
      },
      function(error) {
        console.log('Upload error', error)
      },
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL)
        })
      }
    )

    uploadTask
      .then((snapshot) => {
        pathRef
          .getDownloadURL()
          .then((url) => {
            const fileData = this.state.submissionData.files
            fileData.push({
              name: file.path,
              url: url,
              size: file.size,
              type: file.type,
              updated: file.lastModified,
            })

            this.setState({
              submissionData: {
                ...this.state.submissionData,
                files: fileData,
              },
            })

            if (fileData.length === this.state.submissionFiles.length) {
              console.log('uploading complete')
              this.setState({
                uploadComplete: true,
                uploading: false,
              })

              this.completeSubmitSubmission()
            }
          })
          .catch(function(error) {
            console.error('Error getting documents: ', error)
          })
      })
      .catch((error) => {
        console.log('Upload Failed:', file, error.message)
      })
  }

  showConfirmModal = () => {
    Swal.fire({
      title: 'Are you ready to submit?',
      html: `
        <p>Confirm you want to submit the files.</p>
        <ul>${this.state.submissionFiles.map((item, index) => `<li><em>${item.name}<em></li>`)}</ul>
      `,
      icon: 'question',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit',
    }).then((result) => {
      if (result.value) {
        const files = this.state.submissionFiles
        const userId = this.props.userId
        const hackId = this.props.hackId
        const submissionId = this.submissionId

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
          this.setState({ surveyComplete: true })
        }
      } else {
        this.setState({ loading: false })
      }
    })
  }

  showSurveryModal = () => {
    const formUrl = this.state.submissionForm.survey
    const userEmail = this.state.user.email
    const userId = this.props.userId
    const hackId = this.props.hackId
    const formId = crc32(`${this.props.hackSlug}|${this.submissionId}`)
      .toString(16)
      .toUpperCase()
    const formType = `hackSubmitSurvey_${formId}`
    const alertUrl = `${formUrl}?userid=${userId}&email=${userEmail}&hackid=${hackId}&type=${formType}`

    Swal.fire({
      title: 'Hack Submission Form',
      html: `<iframe src="${alertUrl}" title="Hack Submission Form"/>`,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: 'surveyAlert',
    }).then(() => {
      this.setState({ surveyComplete: true })
      if (this.state.submissionComplete) {
        this.showSuccessModal()
      }
    })
  }

  showSuccessModal = () => {
    Swal.fire({
      title: 'Submission Successful',
      text: 'Your submission is complete.',
      icon: 'success',
    }).then(() => {
      console.log('done')
      window.location = `/hacks/${this.props.hackSlug}`
    })
  }

  validateFields = () => {
    let submissionFields = this.state.submissionData.fields
    let fieldIsValid = []
    let form = this.state.submissionForm
    let formFields = form.fields

    formFields.forEach((field, index) => {
      if (
        field.required &&
        (!submissionFields[index] || submissionFields[index].trim().length === 0)
      ) {
        fieldIsValid.push(false)
        formFields[index].isValid = false
      } else {
        fieldIsValid.push(true)
        formFields[index].isValid = true
      }
    })

    // SET STATE FOR UI STATE / FEEDBACK
    this.setState({
      submissionForm: {
        ...form,
        fields: formFields,
      },
    })

    // RETURN TRUTH STATEMENT TO CONTINUE OR STOP SUBMISSION
    return fieldIsValid.every((item) => {
      return item === true
    })
  }

  validateFiles = () => {
    let submissionFiles = this.state.submissionFiles.map((item) => item.name)
    let fileIsValid = []

    let form = this.state.submissionForm
    let formFiles = form.files

    formFiles.forEach((file, index) => {
      if (file.required && !submissionFiles.includes(file.name)) {
        fileIsValid.push(false)
        formFiles[index].isValid = false
      } else {
        fileIsValid.push(true)
        formFiles[index].isValid = true
      }
    })

    // SET STATE FOR UI STATE / FEEDBACK
    this.setState({
      submissionForm: {
        ...form,
        files: formFiles,
      },
    })
    // RETURN TRUTH STATEMENT TO CONTINUE OR STOP SUBMISSION
    return fileIsValid.every((item) => {
      return item === true
    })
  }

  validateSummary = () => {
    if (this.state.submissionData.summary.length < this.SUMMARY_MIN_LENGTH) {
      this.setState({ summaryInvalid: true })
      return false
    } else {
      this.setState({ summaryInvalid: false })
      return true
    }
  }

  startSubmitSubmission = () => {
    this.setState({ loading: true })

    let validFields = this.validateFields()
    let validFiles = this.validateFiles()
    let validSummary = this.validateSummary()

    if (!validFields || !validFiles || !validSummary) {
      this.setState({ loading: false })
      return false
    }

    this.showConfirmModal()
  }

  completeSubmitSubmission() {
    const submissionData = this.state.submissionData
    const userId = this.props.userId
    const hackId = this.props.hackId
    const submissionId = this.submissionId
    userMetrics({ event: 'user_submission' })

    // for (let field of submissionData.fields){
    //   if (typeof(submissionData.fields[field]) === 'undefined'){
    //
    //   }
    // }

    window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('submissions')
      .doc(submissionId)
      .collection('users')
      .doc(userId)
      .set(submissionData, { merge: true })
      .then(() => {
        this.setState({ submissionComplete: true })
        if (this.state.surveyComplete) {
          this.showSuccessModal()
        }
      })
  }

  render() {
    return (
      <div className="mb-7">
        <Row>
          {this.state.uploading && <div style={this.uploadMessageStyle}>Upload in progress...</div>}

          <Col>
            {this.state.submissionClosed && (
              <div className="bg-pink cl-white font-italic my-2 py-2 text-center w-full">
                This submission has passed the deadline and is now closed
              </div>
            )}

            {!this.state.submissionClosed && this.state.submissionForm.enabled === false && (
              <div className="bg-info cl-darkgrey my-2 py-2 text-center w-full">
                <div className="font-italic">This submission is currently locked.</div>
                <div className="fs-m1">
                  You will be notified once the next submission round is made available.
                </div>
              </div>
            )}

            <h3 className="h2 font-bold py-2">{this.state.submissionForm.name}</h3>

            {this.state.submissionForm.deadline && (
              <div className="py-1 flex">
                <h3 className="h4 font-extrabold">Deadline:</h3>
                <span className="ml-2">
                  {fire2Date(this.state.submissionForm.deadline).toLocaleString(
                    'en-US',
                    this.dateSettings
                  )}
                </span>
              </div>
            )}

            {this.state.submissionForm.deadline && (
              <div className="py-1 flex">
                <h3 className="h4 font-extrabold">Time Remaining:</h3>
                <CountdownTimer
                  timerClass="ml-2 font-italic cl-grey-dk2"
                  endTime={fire2Date(this.state.submissionForm.deadline)}
                />
              </div>
            )}

            <MdContentView
              content={this.state.submissionForm.description}
              encoded={false}
              emptyText="Submission Description not available yet."
            />

            {this.state.submissionForm.summaryEnabled && (
              <div
                className={['my-3', this.state.summaryInvalid === true ? 'cl-red' : ''].join(' ')}
              >
                <div className="flex">
                  <h3 className="h4 font-extrabold">Summary:</h3>
                  <span className="font-italic font-bold fs-m1 ml-2">
                    {`(required ${this.SUMMARY_MIN_LENGTH} characters or more)`}
                  </span>
                </div>

                <InputTextarea
                  containerClass="py-1"
                  inputClass="p-2 bd-1 cl-inherit w-full"
                  labelClass="hide"
                  name="summary"
                  label="Summary"
                  value={this.state.submissionData.summary}
                  onInputChange={this.onSubmissionInputChange}
                  disabled={this.state.submissionDisabled}
                />
              </div>
            )}

            {this.state.submissionForm.fields.map((field, index) => (
              <SubmissionField
                key={index}
                index={index}
                isValid={field.isValid}
                isRequired={field.required}
                title={field.title}
                value={this.state.submissionData.fields[index] || ''}
                isDisabled={this.state.submissionDisabled}
                onChange={(name, value) => this.onSubmissionFieldChanged(name, value, index)}
              />
            ))}

            {this.state.submissionForm.tagsEnabled && (
              <InputMultiCreatableSelect
                name="tags"
                label="Tags"
                containerClass="flex align-items-center mt-2 mb-4"
                labelClass="mr-2 font-extrabold mb-0"
                inputClass={`flex-1 cl-grey-dk1 ${this.state.submissionDisabled ? '' : 'bd-1'}`}
                options={SUBMISSION_TAGS}
                value={this.state.submissionData.tags}
                onInputChange={this.onSubmissionInputChange}
                disabled={this.state.submissionDisabled}
              />
            )}

            <h3 className="h4 py-1 font-extrabold">Submission Files</h3>

            <ul className="list">
              {this.state.submissionForm.files.map((item, index) => (
                <li key={index} className="list-item">
                  <code className={item.isValid ? '' : 'border-danger border'}>{item.name}</code>

                  {item.required && (
                    <span
                      className={`font-italic ml-1 mr-1 badge font-italic ${
                        item.isValid ? '' : 'cl-red'
                      }`}
                    >
                      (required)
                    </span>
                  )}

                  {item.name in this.state.previousFiles && <MaterialDesignIcon name="check" />}
                </li>
              ))}
            </ul>

            <FileUpload
              disabled={this.state.submissionDisabled}
              acceptedFiles={this.state.acceptedFiles}
              acceptedFilesLabel="Pending Files:"
              onFilesChanged={this.onFileUploadFiles}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="flex flex-end">
              {!this.state.submissionDisabled && (
                <button
                  className="btn btn-success px-3"
                  onClick={this.startSubmitSubmission}
                  disabled={this.state.submissionDisabled || this.state.loading}
                >
                  Submit
                </button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(SubmitView)
