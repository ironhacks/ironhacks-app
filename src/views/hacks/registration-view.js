import { Component } from 'react';
import Swal from 'sweetalert2';
import { Section, Row, Col } from '../../components/layout';
import { registerUser } from '../../services/register-hack';
import { userMetrics } from '../../util/user-metrics'
import { MdContentView }  from '../../components/markdown-viewer';

class RegistrationView extends Component {
  constructor(props) {
    super(props);
    this.state = {registerDisabled: false }
  }

  registerSuccess = () => {
    window.firebase.analytics()
      .logEvent('register_hack', {
        'value': this.props.hackSlug
      })

    userMetrics({
      event: 'register_hack',
      hackId: this.props.hackId,
    })

    window.location = `/hacks/${this.props.hackSlug}`
  }

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
  }

  registerHack = () => {
    if (this.props.hackRegistration){
      let hackId = this.props.hackId
      let userEmail = this.props.userEmail
      let userId = this.props.userId
      let formUrl = this.props.hackRegistration
      let formType = 'hackRegistration'
      let alertUrl = `${formUrl}?userid=${userId}&email=${userEmail}&hackid=${hackId}&type=${formType}`

      Swal.fire({
        title: 'Registration survey',
        html: `<iframe src="${alertUrl}" title="Registration Form"/>`,
        showCloseButton: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        customClass: 'surveyAlert',
      })
      .then((result) => {
        this.setState({registerDisabled: true})
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
          this.setState({registerDisabled: true})
          this.callRegisterUser()
        }
      })
    }
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <Row>
            <img src={this.props.hackBannerImg} alt='Hack Banner Img'/>
          </Row>
        </Section>
        <Section sectionClass="py-2">
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
                  Register
              </button>
            </Col>
          </Row>
          <Row>
            <Col>
              <MdContentView
                content={this.props.hackDocument}
                encoded={false}
                emptyText="Hack Overview not available yet."
              />
            </Col>
          </Row>
          <Row rowClass="mb-3">
            <Col colClass="flex flex-center">
              <button
                onClick={this.registerHack}
                className="btn btn-primary my-3"
                disabled={this.state.registerDisabled}
                >
                  Register
              </button>
            </Col>
          </Row>
        </Section>
      </>
    )
  }
}

export default RegistrationView;
