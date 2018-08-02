// IronHacks Platform
// login.js - Loging page
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import firebaseui from 'firebaseui';

// CSS
import '../../css/login.css'

class Login extends React.Component {
  componentDidMount(){
    this.initAuthUI()
  }

  initAuthUI(){ 
    //Config object
    const uiConfig = {
      callbacks : {
        signInSuccessWithAuthResult : (authResult, redirectUrl) => {
          console.log(authResult)
          console.log(redirectUrl)
        }
      },
      signInFlow: 'redirect',
      tosUrl : '/tos',
      privacyPolicyUrl : '/pp',
      'credentialHelper': firebaseui.auth.CredentialHelper.NONE, // Disableing credentialHelper
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    //Making sure there is only one AuthUI instance
    if(firebaseui.auth.AuthUI.getInstance()) {
      const ui = firebaseui.auth.AuthUI.getInstance()
      ui.start('#firebaseui-auth-container', uiConfig)
    } else {
      const ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  }
  
  render() {
    return (
      <div className="login container-fluid">
        <div className='row'>
          <div className='col-12'>
            <div id="firebaseui-auth-container"></div>
          </div>
        </div>
      </div>
      );
  }
}

export default Login;