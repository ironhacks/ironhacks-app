// IronHacks Platform
// ironhackApp.js - Main router
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import Header from './js/components/header.js';
import Landing from './js/components/landing.js';
import Login from './js/components/login.js';
import UserProfile from './js/components/userProfile.js';

import { Switch, Route, Redirect } from "react-router-dom";

//The main purpose of this class is to identify if there is a logged user and redirect him to the proper view.
class IronHacksApp extends React.Component {
  
  isUserConected = () => {
    // This is a funciton that calls Firebase SDK to know if there is an active user session
    

    return false;
  }

  checkUserType = () => {

  }


  render() {

    return (
      <div className='App'> 
        <Header/>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/login" component={Login}/>
          <Route path="/profile" component={UserProfile}/>
          {this.isUserConected() && 
            <Redirect to='/profile'/>
          }
        </Switch>
      </div>
    )
  }
}

export default IronHacksApp;
