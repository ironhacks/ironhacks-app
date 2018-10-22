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
import AdminDashboard from './js/components/admin/adminDashboard.js';
import NewHack from './js/components/admin/newHack/newHack.js';
import Login from './js/components/login/login.js';
import HackSelection from './js/components/login/hackSelection.js';
import Forum from './js/components/forum/forum.js';
import NewThread from './js/components/forum/newThread.js';
import ThreadViewWithRouter from './js/components/forum/threadView/threadView.js';
import Tutorial from './js/components/tutorial/tutorial.js';
import Task from './js/components/task/task.js';
import Quizzes from './js/components/quizzes/quizzes.js';
import Results from './js/components/results/results.js';
import UserProfile from './js/components/userProfile/userProfile.js';
import ProjectEditor from './js/components/projectEditor/projectEditor.js';
import NotFound from './js/utilities/404.js';

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
      mustNavigate: false,
    };
  };

  componentDidMount(){
    this.isUserConected();
  };

  // This funciton calls Firebase SDK to know if there is an active user session
  isUserConected = () => {
    const _this = this;
    window.firebase.auth().onAuthStateChanged((user) => {
      if(user){
        _this.setState({user: user});
        _this.isAdmin(); //We only check this to display specific ui items.
      }else{
        _this.setState({user: false, mustNavigate: true});
      }
    });
  };
  //check on the DB if the current user is admin.
  isAdmin = () => {
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    //Updating the current hack:
    firestore.collection('admins').doc(this.state.user.uid)
    .get()
    .then(function(doc) {
      //Is admin.
        _this.setState((prevState, props) => {
        prevState.user.isAdmin = true;
        prevState.mustNavigate = true;
        return prevState;
      })
    }) 
    .catch(function(error) {
      // The user can't read the admins collection, therefore, is not admin.
        _this.setState((prevState, props) => {
        prevState.user.isAdmin = false;
        prevState.mustNavigate = true;
        return prevState;
      })
    });
  };


  render() {
    //If this.user is null, means that we didn't receive response from firebase auth, therefore we show a loader:
    if(!this.state.mustNavigate){
      return(
        <LoaderContainer>
          <Loader/>
        </LoaderContainer>
      );
    }else{
      return (
        <div className='App'>
          <Switch>
            <Route exact path='/' render={() => null}/> 
            <Route exact path='/login' render={() => null}/>
            <Route exact path='/404' render={() => null}/>
            {!this.state.user && <Redirect to='/'/>}
            <Route component={Header}/>
          </Switch>
          <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/hackSelection' component={HackSelection}/>
            <Route path='/profile' component={UserProfile}/>
            <Route exact path='/forum' component={Forum}/>
            <Route exact path='/forum/new' component={NewThread}/>
            <Route exact path='/admin/newHack' component={NewHack}/>
            <Route path='/admin/dashboard/:hackId' component={AdminDashboard}/>
            <Route path='/admin' component={Admin}/>
            <Route path='/forum/thread/:threadId' component={ThreadViewWithRouter}/>
            <Route path='/tutorial' component={Tutorial}/>
            <Route path='/task' component={Task}/>
            <Route path='/quizzes' component={Quizzes}/>
            <Route path='/results' component={Results}/>
            <Route exact path='/projectEditor' component={ProjectEditor}/>
            <Route exact path='/projectEditor/:proyectName' component={ProjectEditor}/>
            <Route exact path='/404' component={NotFound}/> 
            {this.state.user.admin && <Redirect to='/admin'/>}
            {this.state.user && <Redirect to='/forum'/>}
            <Route exact path='/' component={Landing}/>
            {this.state.user && <Redirect to='/404'/>}
            {<Redirect to='/'/>}
          </Switch>
          <Switch>
            <Route exact path='/' render={() => null}/>
            <Route exact path='/login' render={() => null}/>
            <Route exact path='/404' render={() => null}/>
            <Route component={Footer}/>
          </Switch>
        </div>
      );
    }
  };
}

export default IronHacksApp;