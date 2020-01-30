import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Switch, Route, Redirect} from "react-router-dom";
import styled from 'styled-components';
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
import QuizForm from './js/components/quizzes/quizForm/quizForm.js';
import Results from './js/components/results/results.js';
import UserProfile from './js/components/userProfile/userProfile.js';
import ProjectEditor from './js/components/projectEditor/projectEditor.js';
import ProjectPreview from './js/components/projectEditor/projectPreview.js';
import NotFound from './js/utilities/404.js';
import Log from './js/utilities/debugLog';


const LoaderContainer = styled('div')`
  width: 100vw;
  height: 100vh;
`;

Log.info('Application Loaded');

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
        const splitedName = user.displayName.split(' ');
        const profileLetters = splitedName[0].slice(0, 1) + splitedName[1].slice(0, 1)
        user.profileLetters = profileLetters;
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
      // Here we have all the posible routes on the platform, we use 3 switches becouse the header and the footer are only shown when there is a user logged.
      // We also hide them on the preview of a project.
      return (
        <CookiesProvider>
          <div className='App'>
            <Switch>
              <Route exact path='/' render={() => null}/>
              <Route exact path='/login' render={() => null}/>
              <Route exact path='/404' render={() => null}/>
              <Route exact path='/projectEditor/:proyectName/preview' render={() => null}/>
              {!this.state.user && <Redirect to='/'/>}
              <Route render={(props) => (<Header user={this.state.user} {...props}/>)}/>
            </Switch>
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/hackSelection' render={(props) => (<HackSelection user={this.state.user} {...props}/>)}/>
              <Route path='/profile' render={(props) => (<UserProfile user={this.state.user} {...props}/>)}/>
              <Route exact path='/forum' render={(props) => (<Forum user={this.state.user} {...props}/>)}/>
              <Route exact path='/forum/new' render={(props) => (<NewThread user={this.state.user} {...props}/>)}/>
              <Route path='/forum/thread/:threadId' render={(props) => (<ThreadViewWithRouter user={this.state.user} {...props}/>)}/>
              <Route exact path='/admin/newHack' component={NewHack}/>
              <Route path='/admin/dashboard/:hackId' component={AdminDashboard}/>
              <Route path='/admin' component={Admin}/>
              <Route path='/tutorial' render={(props) => (<Tutorial user={this.state.user} {...props}/>)}/>
              <Route path='/task' render={(props) => (<Task user={this.state.user} {...props}/>)}/>
              <Route exact path='/quizzes' component={Quizzes}/>
              <Route path='/quizzes/:quizName' render={(props) => (<QuizForm user={this.state.user} {...props}/>)}/>
              <Route path='/results' render={(props) => (<Results user={this.state.user} {...props}/>)}/>
              <Route exact path='/projectEditor/:proyectName' render={(props) => (<ProjectEditor user={this.state.user} {...props}/>)}/>
              <Route exact path='/projectEditor/:proyectName/preview' render={(props) => (<ProjectPreview user={this.state.user} {...props}/>)}/>
              <Route exact path='/404' component={NotFound}/>
              {this.state.user.admin && <Redirect to='/admin'/>}
              <Route exact path='/' component={Landing}/>
              {this.state.user && <Redirect to='/404'/>}
              {<Redirect to='/'/>}
            </Switch>
            <Switch>
              <Route exact path='/' render={() => null}/>
              <Route exact path='/login' render={() => null}/>
              <Route exact path='/404' render={() => null}/>
              <Route exact path='/projectEditor/:proyectName/preview' render={() => null}/>
              <Route component={Footer}/>
            </Switch>
          </div>
        </CookiesProvider>
      );
    }
  };
}

export default IronHacksApp;
