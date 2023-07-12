import { Component } from 'react'
import { Page, Section, Row, Col } from '../../components/layout'
import { Loader } from '../../components/loader'
import randomUsername from '../../services/random-username'
import { userMetrics } from '../../util/user-metrics'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      status: 'loading',
    }
  }

  componentDidMount() {
    if (window.firebase.auth().currentUser) {
      this._onComplete('/hacks')
    } else {
      this.initAuthUI()
    }
  }

  _onComplete = (path) => {
    this.setState({ status: 'Navigating...' })
    window.location = path
  }

  _onFailed = (error) => {
    if (this.props.onLoginSuccess) {
      this.props.onLoginSuccess({
        mustNavigate: true,
        navigateTo: '/',
      })
    }
  }

  _onSignInSuccess = () => {
    this.setState({
      loading: true,
      status: 'Sign-in success',
    })
  }

  initAuthUI = () => {
    let authProviders

    if (process.env.NODE_ENV !== 'production') {
      authProviders = [
        window.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        window.firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ]
    } else {
      authProviders = [window.firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    }

    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: authProviders,
      callbacks: {
        signInSuccessWithAuthResult: (result, redirectUrl) => {
          this._onSignInSuccess()

          if (result.additionalUserInfo.isNewUser === true) {
            this._saveUserOnDB({
              name: result.user.displayName,
              email: result.user.email,
              uid: result.user.uid,
              isAdmin: false,
            })
          } else {
            window.firebase.analytics().logEvent('user_login')
            userMetrics({ event: 'user_login' })
            this._onComplete('/hacks')
          }
        },
        signInFailure: (error) => {
          this._onFailed(error)
        },
      },
      tosUrl: '/tos',
      privacyPolicyUrl: '/pp',
      credentialHelper: window.firebaseui.auth.CredentialHelper.NONE,
    }

    const uiInstance = window.firebaseui.auth.AuthUI.getInstance()

    if (uiInstance) {
      uiInstance.start('#firebaseui-auth-container', uiConfig)
    } else {
      const ui = new window.firebaseui.auth.AuthUI(window.firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }

  _saveUserOnDB = (user) => {
    this.setState({
      status: 'Creating user account',
    })

    window.firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set({
        name: user.name,
        email: user.email,
        alias: randomUsername(),
        created: window.firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        let timestamp = new Date().toISOString()
        window.firebase.analytics().logEvent('user_signup', { value: timestamp })
        userMetrics({ event: 'user_signup' })
        this._onComplete('/profile/edit?newuser=true')
      })
      .catch((error) => {
        console.error('Error adding user: ', error)
        this._onFailed()
      })
  }

  render() {
    return (
      <Page
        pageClass="bg-primary"
        pageTitle="IronHacks | Login"
        pageDescription="Login to IronHacks"
        pageUrl="https://ironhacks.com/login"
        showFooter={false}
        showHeader={false}
      >
        <Section>
          <div
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Row>
              <Col>
                <div className="text-center">
                  <h1 className={'h2 site-title'}>
                    <span className="font-light">PURDUE </span>
                    <span className="font-extrabold">IRONHACKS</span>
                  </h1>

                  <h2 className="h4 mb-3 mt-1">Hack for innovation to solve global challenges.</h2>
                </div>

                {this.state.loading && <Loader status={this.state.status} />}

                <div style={{ display: 'flex' }}>
                  <div
                    style={{ flex: 1, backgroundColor: 'transparent' }}
                    id="firebaseui-auth-container"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Section>
      </Page>
    )
  }
}

export default LoginPage
