import { Component } from 'react';
import { Row, Col } from '../../components/layout';
import { MdContentView }  from '../../components/markdown-viewer';
import Swal from 'sweetalert2';
import { userMetrics } from '../../util/user-metrics'

class TaskView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      taskButtonDisabled: false,
      formFilled: false,
      task: null,
      userCohort: null,
    }
  }

  componentDidMount(){
    userMetrics({event: 'view_task'})
    this.getUserForms()
    this.getCohortTasks()
    this.getUserCohort()
    this.getTask()
  }

  getTask = () => {
    let defaultTask = this.props.defaultTask
    let taskId = defaultTask.name

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tasks')
      .doc(taskId)
      .get()
      .then((doc)=>{
        let task = doc.data()
        task.taskId = doc.id
        this.setState({
          task: task,
          loading: false,
        })
      })
  }

  getCohortTasks = async () => {
    let doc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('settings')
      .get()

    let data = doc.data()
    let cohortTasks = {}
    if (data) {
      for(let cohort of Object.keys(data)) {
        let { task } = data[cohort].properties
        if (task) {
          cohortTasks[cohort] = task.name
        }
      }
    }
    console.log('cohortTasks', cohortTasks);
  }

  getUserCohort = async () => {
    let doc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('cohorts')
      .get()

    let data = doc.data()
    console.log('cohort data', data);
    let userCohort = null;
    if (data) {
      for (let cohort of Object.keys(data)) {
        if (data[cohort].includes(this.props.userId)) {
          userCohort = cohort;
        }
      }
    }

    console.log('user cohort', userCohort);
    this.setState({userCohort: userCohort})
  }

  getUserForms(){
    window.firebase.firestore()
      .collection('users')
      .doc(this.props.userId)
      .collection('forms')
      .doc(this.props.hackId)
      .get()
      .then((doc)=>{
        if (doc.exists){
          let data = doc.data();
          if ('hackTaskSurvey' in data){
            this.setState({formFilled: true});
          }
        }
      })
  }


  showTaskSurvey = () => {
    let hackId = this.props.hackId;
    let userEmail = this.props.userEmail;
    let userId = this.props.userId;
    let formUrl = this.state.task.survey;

    let formType = 'hackTaskSurvey';
    let alertUrl = `${formUrl}?userid=${userId}&email=${userEmail}&hackid=${hackId}&type=${formType}`;

    userMetrics({event: 'open_survey'})

    Swal.fire({
      title: 'Hack Consent Form',
      html: `<iframe src="${alertUrl}" title="Hack Consent Form"/>`,
      showCloseButton: true,
      showConfirmButton: false,
      allowOutsideClick: false,
      customClass: 'surveyAlert',
    })
    .then((result) => {
      this.setState({
        formFilled: true
      });
    })
  };

  render() {
    return (
      <>
      {this.state.task && (
      <Row>
        <Col>
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
              ):(
                <MdContentView
                  content={this.state.task.doc}
                  encoded={true}
                  emptyText="Task Document is not available yet."
                />
              )}
              </>
            ):(
                <MdContentView
                  content={this.state.task.doc}
                  encoded={true}
                  emptyText="Task Document is not available yet."
                />
            )}
        </Col>
      </Row>
      )}
      </>
    )
  }
}

export default TaskView
