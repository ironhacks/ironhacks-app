import React from 'react';
// import { Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import {
  // Cookies, 
  withCookies
} from 'react-cookie';
import { Theme } from '../../theme';
import { BlankPage,Row, Col } from '../../components/layout';

const styles = Theme.STYLES.LoginTheme;

const SectionContainer = styled('div')`
  width: 100%;
  height: 100vh;
  background-color: var(--color-primary);
  display: flex;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // this._isAdmin = this._isAdmin.bind(this);
    this._saveUserOnDB = this._saveUserOnDB.bind(this);
    this.initAuthUI = this.initAuthUI.bind(this);
  }

  componentDidMount() {
    console.log('%c LoginPage is mounted', 'color:red;font-weight:bold');
    this.initAuthUI();
  }

  onComplete(){
    console.log('complete', this.state);
    // if (this.props.onLoginSuccess){
    //   this.props.onLoginSuccess({
    //     mustNavigate: true,
    //     navigateTo: '/hacks',
    //   })
    // } else {
      // this.context.router.history.push(`/target`)
    window.location = '/hacks';
    // }

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
          // this.setState({
          //   mustNavigate: false,
          //   navigateTo: '/login',
          // })
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
        // this.setState({
        //   user: user,
        //   // mustNavigate: true,
        //   // navigateTo: '/hacks',
        // });
        this.onComplete();
      })
      .catch((error)=>{
        console.error('Error adding document: ', error);
        this.onFailed();
      })
  }
  //
  // async _isAdmin(userId) {
  //   if (userId) {
  //     try {
  //       let isAdmin = await window.firebase.firestore()
  //         .collection('admins')
  //         .doc(userId)
  //         .get();
  //       return isAdmin.exists
  //     } catch (e) {
  //       return false;
  //     } finally {
  //       return false;
  //     }
  //   }
  // }

  // isAdmin(user) {
  //   const _user = user;
  //   window.firebase.firestore()
  //     .collection('admins')
  //     .doc(_user.uid)
  //     .get()
  //     .then((doc)=>{
  //       this.setState((prevState, props) => {
  //         _user.isAdmin = true;
  //         return {
  //           user: _user,
  //           mustNavigate: false,
  //           navigateTo: '/admin',
  //         }
  //       })
  //     })
  //     .catch((error)=>{
  //       console.log('User Role Check Error', error);
  //       this.setState((prevState, props) => {
  //         _user.isAdmin = false;
  //         return {
  //           user: _user,
  //           mustNavigate: true,
  //           navigateTo: '/hacks',
  //         }
  //       });
  //     });
  // }

  render() {
    // if (this.state.mustNavigate) {
    //   console.log('navigating', this.state);
    //   return (
    //      <Redirect to={{
    //         pathname: `${this.state.navigateTo}`,
    //         state: {
    //           user: this.state.user
    //         },
    //       }}
    //     />
    //   )
    // } else {
      return (
        <ThemeProvider theme={styles}>
          <BlankPage>
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
          </BlankPage>
        </ThemeProvider>
      )
    }
  // }
}

export default withCookies(LoginPage);
