import React from 'react';
import { Row, Col } from '../../components/layout';
import { MdContentView }  from '../../components/markdown-viewer';
import Swal from 'sweetalert2';
import { userMetrics } from '../../util/user-metrics'

class TaskView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskButtonDisabled: false,
      formFilled: false,
    }
  }

  componentDidMount(){
    userMetrics({event: 'view_task'})
    this.getUserForms();
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
    let formUrl = this.props.task.survey;
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
      <Row>
        <Col>
          {this.props.task.survey ? (
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
                content={this.props.task.doc}
                encoded={true}
                emptyText="Task Document is not available yet."
              />
            )}
            </>
          ):(
              <MdContentView
                content={this.props.task.doc}
                encoded={true}
                emptyText="Task Document is not available yet."
              />
          )}
        </Col>
      </Row>
    )
  }
}

export default TaskView
