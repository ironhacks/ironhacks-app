// DO NOT MODIFY THE CONTENT NOR THE NAME OF THIS FILE.
// IronHacks Platform
// index.js - Main entry point
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import IronHacksApp from './ironhackApp.js';

import { BrowserRouter } from 'react-router-dom' // Router

// Bootstrap 4
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

//Main CSS
import './main.css'

import firebase from 'firebase/app'
import 'firebase/auth'


var config = {
apiKey: "AIzaSyCkcfwdASmN50otDinZUiRBdkj8umKZt0Y", // Dev
authDomain: "ironhacks-platform-dev.firebaseapp.com",
projectId: "ironhacks-platform-dev"
};

firebase.initializeApp(config);

ReactDOM.render((
  <BrowserRouter>
    <IronHacksApp/>
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker();

// DO NOT MODIFY THE CONTENT NOR THE NAME OF THIS FILE.
