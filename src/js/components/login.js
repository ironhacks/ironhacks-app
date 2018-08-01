// IronHacks Platform
// login.js - Loging page
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import firebaseui from 'firebaseui';

class Login extends React.Component {
	componentDidMount(){
		this.initUI()
	}

	initUI(){
		// Initialize the FirebaseUI Widget using Firebase.
		var ui = new firebaseui.auth.AuthUI(firebase.auth());

		ui.start('#firebaseui-auth-container', {
	  signInOptions: [
	    firebase.auth.EmailAuthProvider.PROVIDER_ID
	  ],
	  // Other config options...
	});
	}


	render() {
		return (
			<div className="login">
			<h1>Test del Login</h1>
			<div id="firebaseui-auth-container"></div>
			</div>
			);
	}
}

export default Login;