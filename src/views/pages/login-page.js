import React from 'react';
import styled from 'styled-components';
import { withCookies } from 'react-cookie';
import { BlankPage, Section, Row, Col } from '../../components/layout';

const SectionContainer = styled('div')`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this._saveUserOnDB = this._saveUserOnDB.bind(this);
    this.initAuthUI = this.initAuthUI.bind(this);
  }

  componentDidMount() {
    console.log('%c LoginPage is mounted', 'color:red;font-weight:bold');
    this.initAuthUI();
  }

  onComplete(){
    if (document.referrer) {
      let prevUrl = new URL(document.referrer);
      if (prevUrl.hostname.includes('localhost')
      || prevUrl.hostname.includes('ironhacks.com')) {
        let forwardUrl = prevUrl.pathname;
        if (forwardUrl !== '/' && forwardUrl !== '/login' ) {
          window.location.replace(forwardUrl);
        } else {
          window.location = '/hacks';
        }
      } else {
        window.location = '/hacks';
      }
    }
    window.location = '/hacks';
  }

  onFailed(){
    if (this.props.onLoginSuccess){
      this.props.onLoginSuccess({
        mustNavigate: true,
        navigateTo: '/',
      })
    }
  }

  initAuthUI() {
    const uiConfig = {
      signInFlow: 'redirect',
      signInOptions: [
        window.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        window.firebase.auth.EmailAuthProvider.PROVIDER_ID,
        window.firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],

      callbacks: {

        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          const user = {
            name: authResult.user.displayName,
            email: authResult.user.email,
            uid: authResult.user.uid,
            isAdmin: false,
          };

          console.log('signIn Success With AuthResult', authResult);

          if (authResult.additionalUserInfo.isNewUser === true) {
            console.log('user is new user', user);
            this._saveUserOnDB(user);
          } else {
            // let userIsAdmin = this._isAdmin(user.uid);
            // Promise.resolve(userIsAdmin).then((result)=>{
            //   user.isAdmin = result;
            this.onComplete()
            // })
          }
        },

        signInFailure: function(error) {
          console.log('sign in failure', error);
          this.onFailed();
        },
      },
      tosUrl: '/tos',
      privacyPolicyUrl: '/pp',
      credentialHelper: window.firebaseui.auth.CredentialHelper.NONE,
    };

    const uiInstance = window.firebaseui.auth.AuthUI.getInstance();
    if (uiInstance) {
      uiInstance.start('#firebaseui-auth-container', uiConfig);
    } else {
      const ui = new window.firebaseui.auth.AuthUI(window.firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }


  _saveUserOnDB(user) {
    window.firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .set({
        name: user.name,
        email: user.email,
        created: window.firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(()=>{
        console.log('user saved success');
        let timestamp = new Date().toISOString();
        window.firebase.analytics().logEvent('user_signup', {
          'value': timestamp
        });
        this.onComplete();
      })
      .catch((error)=>{
        console.error('Error adding document: ', error);
        this.onFailed();
      })
  }

  render() {
      return (
          <BlankPage pageClass="bg-primary">
          <Section>
            <SectionContainer>
              <Row>
                <Col>
                  <h1 className={'h1 site-title'}>
                    <span className="font-light">PURDUE </span>
                    <span className="font-extrabold">IRONHACKS</span>
                  </h1>

                  <h2 className="mb-3 mt-1">
                    Hack for innovation and join the open data movement.
                  </h2>

                </Col>
              </Row>
              <Row>
                <Col>
                  <div id='firebaseui-auth-container' />
                </Col>
              </Row>
            </SectionContainer>
            </Section>
          </BlankPage>
      )
    }
}

export default withCookies(LoginPage);
