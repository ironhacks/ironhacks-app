// IronHacks Platform
// ironhackApp.js - Main router
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import Header from './js/components/header.js';
import Landing from './js/components/landing.js';

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
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={UserProfile}/>
        {this.isUserConected() && 
          <Redirect to='/profile'/>
        }
      </Switch>
    )
  }
}

export default IronHacksApp;
