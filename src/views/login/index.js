import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../../theme';
import { Cookies, withCookies } from 'react-cookie';
import { BlankPage, Section, Row, Col } from '../../components/layout';

const styles = Theme.STYLES.LoginTheme;

const SectionContainer = styled('div')`
  width: 100%;
  height: 100vh;
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h1 {
    font-size: 60px;
    font-weight: 900;
    line-height: 40px;
  }

  h1 span {
    font-weight: 300;
  }

  h2 {
    font-weight: 300;
  }
`;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mustNavigate: false,
    }

    this.isAdmin = this.isAdmin.bind(this);

  }

  componentDidMount() {
    this.initAuthUI();
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
          };

          this.setState({
            user: user
          });

          if (authResult.additionalUserInfo.isNewUser === true) {
            this.saveUserOnDB(user);
            user.isAdmin = false;
            return false;

          } else {
            this.isAdmin(user);
            return false;
          }
        },
        signInFailure: function(error) {
          console.log(error);
        },
      },
      tosUrl: '/tos',
      privacyPolicyUrl: '/pp',
      credentialHelper: window.firebaseui.auth.CredentialHelper.NONE, // Disableing credentialHelper
    };

    const uiInstance = window.firebaseui.auth.AuthUI.getInstance();
    if (uiInstance) {
      uiInstance.start('#firebaseui-auth-container', uiConfig);
    } else {
      const ui = new window.firebaseui.auth.AuthUI(window.firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }


  async _saveUserOnDB(user) {
    window.firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .set({
        name: user.name,
        email: user.email
      })
      .then(function(docRef) {
        this.setState({
          mustNavigate: true
        });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      })
  };


  async _isAdmin(uid) {
    if (uid) {
      let isAdmin = await window.firebase.firestore()
        .collection('admins')
        .doc(uid)
        .get();
      return isAdmin.exists
    }
  }

  isAdmin(user) {
    const _user = user;
    window.firebase.firestore()
      .collection('admins')
      .doc(_user.uid)
      .get()
      .then((doc)=>{
        this.setState((prevState, props) => {
          _user.isAdmin = true;
          return {
            user: _user,
            mustNavigate: true
          }
        })
      })
      .catch((error)=>{
        console.log('User Role Check Error', error);
        this.setState((prevState, props) => {
          _user.isAdmin = false;
          return {
            user: _user,
            mustNavigate: true
          }
        });
      });
  }

  render() {
    if (this.state.mustNavigate) {
      return (
        <Redirect to={{
            pathname: '/hacks',
            state: {
              user: this.state.user
            },
          }}
        />
      )
    } else {
      return (
        <ThemeProvider theme={styles}>
        <BlankPage>
          <SectionContainer>

            <h1><span>PURDUE</span> IRONHACKS</h1>

            <h2>Hack for innovation and join the open data movement.</h2>

            <div id='firebaseui-auth-container' />
          </SectionContainer>
         </BlankPage>
        </ThemeProvider>
      )
    }
  }
}

export default withCookies(Login);
