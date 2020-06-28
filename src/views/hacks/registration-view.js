import React from 'react';
import * as AlertsContent from '../../components/alert';
import { Row, Col } from '../../components/layout';
import swal from 'sweetalert2';

class RegistrationView extends React.Component {
  constructor(props) {
    super(props);
    this.registerHack = this.registerHack.bind(this);
    this.registerSuccess = this.registerSuccess.bind(this);
    this.callRegisterUser = this.callRegisterUser.bind(this);
    this.goToPresurvey = this.goToPresurvey.bind(this);
  }

  componentDidMount() {
    if (!this.props.user){
      console.log('user not set');
    }
  }

  registerSuccess(){
    console.log('success');
    window.location = `/hacks/${this.props.hackId}/task`;
  }

  callRegisterUser() {
    const registerUser = window.firebase.functions().httpsCallable('registerUser');
    registerUser({hackId: this.props.hackId})
      .then((result) => {
        console.log('done', result);
        this.registerSuccess();
      })
  }

  goToPresurvey() {
    if (this.props.hackRegistration){
      let userEmail = window.firebase.auth().currentUser.email;
      let alertUrl = `${this.props.hackRegistration}?user_email=${userEmail}`;
      swal(AlertsContent.preSurveyAlertContent(alertUrl))
        .then((result) => {
          if (!result.dismiss) {
            console.log('RESULT', result)
          } else {
            console.log('RESULT', result)
            this.callRegisterUser()
          }
        })
    }
  }

  registerHack() {
    this.goToPresurvey()
    console.log('registering now');
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            <h2 className="h2 my-2">{this.props.hackName} Registration</h2>
            <h3 className="h4">Registration Survey: {this.props.hackRegistration}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              onClick={this.registerHack}
              className="my-3">
              Register
            </button>
          </Col>
        </Row>
      </>
    )
  }
}

export default RegistrationView;
