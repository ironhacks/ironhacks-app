// IronHacks Platform
// ironhackApp.js - Main router
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Switch, Route, Redirect} from "react-router-dom";
//Styled components
import styled from 'styled-components';
// Custom Components
import Loader from './js/utilities/loader.js';
import Header from './js/components/header/header.js';
import Footer from './js/components/footer/footer.js';
import Landing from './js/components/landing/landing.js';
import Admin from './js/components/admin/admin.js';
import Login from './js/components/login/login.js';
import Forum from './js/components/forum/forum.js';
import NewThread from './js/components/forum/newThread.js';
import ThreadViewWithRouter from './js/components/forum/threadView/threadView.js';
import Tutorial from './js/components/tutorial/tutorial.js';
import Task from './js/components/task/task.js';
import Quizzes from './js/components/quizzes/quizzes.js';
import Results from './js/components/results/results.js';
import UserProfile from './js/components/userProfile/userProfile.js';

const LoaderContainer = styled('div')`
  width: 100vw;
  height: 100vh;
`;

//The main purpose of this class is to identify if there is a logged user and redirect him to the proper view.
class IronHacksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount(){
    this.isUserConected();
  };

  // This funciton calls Firebase SDK to know if there is an active user session
  isUserConected = () => {
    window.firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        this.setState({user: user});
      }else{
        this.setState({user: false});
      }
    }.bind(this), function(error) {
      console.log(error);
      this.setState({user: false});
    }.bind(this))
  }

  checkUserType = () => {

  }


  render() {
    //If this.user is null, means that we didn't receive response from firebase auth, therefore we show a loader:
    if(typeof this.state.user === 'undefined'){
      return(
        <LoaderContainer>
          <Loader/>
        </LoaderContainer>
      );
    }else{
      return (
        <div className='App'>
          <Switch>
            <Route exact path="/" render={() => null}/> 
            <Route exact path="/login" render={() => null}/>
            {!this.state.user && <Redirect to='/'/>}
            <Route component={Header}/>
          </Switch>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/profile" component={UserProfile}/>
            <Route path="/admin" component={Admin}/>
            <Route exact path="/forum" component={Forum}/>
            <Route exact path="/forum/new" component={NewThread}/>
            <Route path="/forum/thread/:threadId" component={ThreadViewWithRouter}/>
            <Route path="/tutorial" component={Tutorial}/>
            <Route path="/task" component={Task}/>
            <Route path="/quizzes" component={Quizzes}/>
            <Route path="/results" component={Results}/>
            {this.state.user && <Redirect to='/forum'/>}
            <Route exact path="/" component={Landing}/>
          </Switch>
          <Switch>
            <Route exact path="/" render={() => null}/>
            <Route exact path="/login" render={() => null}/>
            <Route component={Footer}/>
          </Switch>
        </div>
      );
    }
  };
}

export default IronHacksApp;
   
/*
    return (
      <div className='App'>
        <Switch>
          <Route exact path="/" render={() => null}/> 
          <Route exact path="/login" render={() => null}/>
          <Route component={Header}/>
        </Switch>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/login" component={Login}/>
          <Route path="/profile" component={UserProfile}/>
          <Route exact path="/forum" component={Forum}/>
          <Route exact path="/forum/new" component={NewThread}/>
          <Route path="/tutorial" component={Tutorial}/>
          <Route path="/task" component={Task}/>
          <Route path="/quizzes" component={Quizzes}/>
          <Route path="/results" component={Results}/>
        </Switch>
        <Switch>
          <Route exact path="/" render={() => null}/>
          <Route exact path="/login" render={() => null}/>
          <Route component={Footer}/>
        </Switch>
      </div>
    )
*/