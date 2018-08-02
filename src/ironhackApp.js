// IronHacks Platform
// ironhackApp.js - Main router
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

// Custom Components
import Header from './js/components/header.js';
import Footer from './js/components/footer.js';
import Landing from './js/components/landing.js';
import Login from './js/components/login.js';
import Forum from './js/components/forum.js';
import Tutorial from './js/components/tutorial.js';
import Task from './js/components/task.js';
import Quizzes from './js/components/quizzes.js';
import Results from './js/components/results.js';
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
          <Route path="/forum" component={Forum}/>
          <Route path="/tutorial" component={Tutorial}/>
          <Route path="/task" component={Task}/>
          <Route path="/quizzes" component={Quizzes}/>
          <Route path="/results" component={Results}/>
          
          {this.isUserConected() && 
            <Redirect to='/profile'/>
          }
        </Switch>
        <Footer/>
      </div>
    )
  }
}

export default IronHacksApp;
