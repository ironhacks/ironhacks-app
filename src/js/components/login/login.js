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
      mustNavigate: false,
    };
  };

  componentDidMount(){
    this.initAuthUI()
  };

  initAuthUI(){ 
    //Config object
    const uiConfig = {
      signInFlow: 'redirect', 
      signInOptions: [
        window.firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks : {
        signInSuccessWithAuthResult : (authResult, redirectUrl) => {
          var user = {
            name: authResult.user.displayName,
            email: authResult.user.email,
            uid: authResult.user.uid
          }
          this.setState({user: user});
          if(authResult.additionalUserInfo.isNewUser === true){
            this.saveUserOnDB(user);
            user.isAdmin = false;
            return false;
          }else{
            this.isAdmin(user);
            return false;
          }
        },
        signInFailure: function(error) {
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
  };
  
  saveUserOnDB = (user) => {
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    const _this = this;
    firestore.settings(settings);
    console.log(user)
    firestore.collection("users").doc(user.uid).set({
      name: user.name,
      email: user.email,
    })
    .then(function(docRef) {
      _this.setState({mustNavigate: true});
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };

  isAdmin = (user) => {
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    const _user = user;
    //Updating the current hack:
    firestore.collection('admins').doc(_user.uid)
    .get()
    .then(function(doc) {
      //Is admin.
        _this.setState((prevState, props) => {
        _user.isAdmin = true
        return {
          user: _user,
          mustNavigate: true
        };
      })
    }) 
    .catch(function(error) {
      // The user can't read the admins collection, therefore, is not admin.
        _this.setState((prevState, props) => {
        _user.isAdmin = false;
        return {
          user: _user,
          mustNavigate: true
        };
      })
    });
  };

  render() {
    const currentUser = this.state.user;
    if(this.state.mustNavigate){
      if(currentUser.isAdmin){
        return <Redirect to={{
          pathname: '/admin',
          state: {user: currentUser}
        }}/>
      }else{
        return <Redirect to={{
          pathname: '/hackSelection',
          state: {user: currentUser}
        }}/>
      }
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