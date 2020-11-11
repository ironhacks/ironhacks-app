import { Component } from 'react';
import Swal from 'sweetalert2';
import { Row, Col } from '../../components/layout';
import { registerUser } from '../../services/register-hack';
import { userMetrics } from '../../util/user-metrics'

class RegistrationView extends Component {
  constructor(props) {
    super(props);
    this.state = {registerDisabled: false }
  }

  componentDidMount() {
    console.log('registration view');
  }

  registerSuccess = () => {
    console.log('register success');
    window.firebase.analytics()
      .logEvent('register_hack', {
        'value': this.props.hackSlug
      });

    userMetrics({
      event: 'register_hack',
      hackId: this.props.hackId,
    })

    window.location = `/hacks/${this.props.hackSlug}`;
  };

  callRegisterUser = () => {
    registerUser({
      userId: this.props.userId,
      hackId: this.props.hackId,
    })
    .then((result) => {
      if (result) {
        this.registerSuccess();
      } else {
        window.location.reload();
      }
    })
  };

  goToPresurvey = () => {
    if (this.props.hackRegistration){
      let hackId = this.props.hackId;
      let userEmail = this.props.userEmail;
      let userId = this.props.userId;
      let formUrl = this.props.hackRegistration;
      let formType = 'hackRegistration';
      let alertUrl = `${formUrl}?userid=${userId}&email=${userEmail}&hackid=${hackId}&type=${formType}`;
      Swal.fire({
          title: 'Registration survey',
          html: `<iframe src="${alertUrl}" title="Registration Form"/>`,
          showCloseButton: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          customClass: 'surveyAlert',
        }
      )
      .then((result) => {
        this.setState({registerDisabled: true});
        this.callRegisterUser()
      })

    } else {
      Swal.fire({
        title: 'Confirm Registration',
        text: 'Click to continue registering for this hack.',
        icon: 'success',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.setState({registerDisabled: true});
          this.callRegisterUser()
        }
      })
    }
  };

  registerHack = () => {
    this.goToPresurvey()
  };

  render() {
    return (
      <>
        <Row>
          <Col>
            <h2 className="h2 my-2">{this.props.hackName} Registration</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              onClick={this.registerHack}
              className="btn btn-primary my-3"
              disabled={this.state.registerDisabled}
              >
                Start Registration
            </button>
          </Col>
        </Row>
      </>
    )
  }
}

export default RegistrationView;
