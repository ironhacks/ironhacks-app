import { Component } from 'react'
import { Row, Col } from '../../components/layout'
import { MdContentView } from '../../components/markdown-viewer'
import Swal from 'sweetalert2'
import { userMetrics } from '../../util/user-metrics'

class TaskView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      taskButtonDisabled: false,
      formFilled: false,
      task: null,
    }
  }

  componentDidMount() {
    userMetrics({ event: 'view_task' })
    this.getUserForms()
    this.getTask()
  }

  getTask = () => {
    window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tasks')
      .doc(this.props.taskId)
      .get()
      .then((doc) => {
        let task = doc.data()
        task.taskId = doc.id
        this.setState({
          task: task,
          loading: false,
        })
      })
  }

  getUserForms() {
    window.firebase
      .firestore()
      .collection('users')
      .doc(this.props.userId)
      .collection('forms')
      .doc(this.props.hackId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let data = doc.data()
          if ('hackTaskSurvey' in data) {
            this.setState({ formFilled: true })
          }
        }
      })
  }

  // SURVEY RESPONSE CALLBACK CAN TAKE SEVERAL MINUTES
  // IN CASE USER REFRESHED THE PAGE OR LEAVES THEN
  // RETURNS WE IMMEDIATLEY ADD A PLACEHOLDER TO TRIGGER
  // TASK VIEW ON LOAD SINCE THE SURVEY HAS BEEN LOADED
  taskSurveyViewed = async () => {
    await window.firebase
      .firestore()
      .collection('users')
      .doc(this.props.userId)
      .collection('forms')
      .doc(this.props.hackId)
      .set(
        {
          hackTaskSurvey: { viewed: true },
        },
        { merge: true }
      )
  }

  showTaskSurvey = () => {
    let hackId = this.props.hackId
    let userEmail = this.props.userEmail
    let userId = this.props.userId
    let formUrl = this.state.task.survey

    let formType = 'hackTaskSurvey'
    let alertUrl = `${formUrl}?userid=${userId}&email=${userEmail}&hackid=${hackId}&type=${formType}`

    userMetrics({ event: 'open_survey' })
    this.taskSurveyViewed()

    Swal.fire({
      title: 'Hack Consent Form',
      html: `<iframe src="${alertUrl}" title="Hack Consent Form"/>`,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: 'surveyAlert',
    }).then((result) => {
      this.setState({ formFilled: true })
    })
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            {this.props.taskPublished ? (
              <>
                {this.state.task && (
                  <>
                    {this.state.task.surveyEnabled ? (
                      <>
                        {!this.state.formFilled ? (
                          <div>
                            <p>
                              Please accept the hack terms and complete the form to view the task.
                            </p>

                            <button
                              className="btn btn-dark"
                              onClick={this.showTaskSurvey}
                              disabled={this.state.taskButtonDisabled}
                            >
                              Get Task
                            </button>
                          </div>
                        ) : (
                          <MdContentView
                            content={this.state.task.doc}
                            encoded={true}
                            emptyText="Task Document is not available yet."
                          />
                        )}
                      </>
                    ) : (
                      <MdContentView
                        content={this.state.task.doc}
                        encoded={true}
                        emptyText="Task Document is not available yet."
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              <div>
                <p>The task document is not available yet.</p>
              </div>
            )}
          </Col>
        </Row>
      </>
    )
  }
}

export default TaskView
