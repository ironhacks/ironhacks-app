  // IronHacks Platform
// login.js - Loging page
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.LoginTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: 100vh;
  background-color: ${Constants.mainBgColor};
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
  constructor(props){
    super(props);
    this.state = {
      navigate: false,
    };
  }

  componentDidMount(){
    this.initAuthUI()
  }

  initAuthUI(){ 
    //Config object
    const uiConfig = {
      signInSuccessUrl: '/forum',
      signInFlow: 'redirect',
      signInOptions: [
        window.firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks : {
        signInSuccessWithAuthResult : (authResult, redirectUrl) => {
          var user = authResult.user;
          // Interupt the redirect if the user is new while writing on the db.
          if(authResult.additionalUserInfo.isNewUser === true){
            this.writeOnDatabase(user);
            return false;
          }else{
            return true;
          }
        },
        signInFailure: function(error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs.
          console.log(error);
        }
      },
      tosUrl: '/tos',
      privacyPolicyUrl: '/pp',
      credentialHelper: window.firebaseui.auth.CredentialHelper.NONE, // Disableing credentialHelper
    }
    //Making sure there is only one AuthUI instance
    if(window.firebaseui.auth.AuthUI.getInstance()) {
      const ui = window.firebaseui.auth.AuthUI.getInstance()
      ui.start('#firebaseui-auth-container', uiConfig)
    } else {
      const ui = new window.firebaseui.auth.AuthUI(window.firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }
  
  writeOnDatabase = (user) => {
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    const _this = this;
    firestore.settings(settings);

    firestore.collection("users").add({
      name: user.displayName,
      email: user.email,
    })
    .then(function(docRef) {
      _this.setState((prevState, props) => {
        return {navigate: !prevState.navigate};
      });
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    if(this.state.navigate === true){
      return(
        <Redirect to='/hackSelection'/>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <h1><span>PURDUE </span>IRONHACKS</h1>
          <h2>Hack for innovation and join the open data movement.</h2>
          <div id="firebaseui-auth-container"></div>
        </SectionContainer>
        </ThemeProvider>
      );
  }
}

export default Login;