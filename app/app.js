import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import styled from 'styled-components';
import Log from './util/log';
import Reactotron from 'reactotron-react-js';
import NotFound from './js/utilities/404.js';
import Loader from './js/utilities/loader.js';
import Task from './views/task';
import TutorialScreen from './views/tutorial';
import Admin from './js/components/admin/admin.js';
import AdminDashboard from './js/components/admin/adminDashboard.js';
import Footer from './js/components/footer/footer.js';
import Forum from './js/components/forum/forum.js';
import HackSelection from './js/components/login/hackSelection.js';
import Header from './js/components/header/header.js';
import Landing from './js/components/landing/landing.js';
import Login from './js/components/login/login.js';
import NewHack from './js/components/admin/newHack/newHack.js';
import NewThread from './js/components/forum/newThread.js';
import ProjectEditor from './js/components/projectEditor/projectEditor.js';
import ProjectPreview from './js/components/projectEditor/projectPreview.js';
import QuizForm from './js/components/quizzes/quizForm/quizForm.js';
import Quizzes from './js/components/quizzes/quizzes.js';
import Results from './js/components/results/results.js';
import UserProfile from './js/components/userProfile/userProfile.js';
import ThreadViewWithRouter from './js/components/forum/threadView/threadView';


const LoaderContainer = styled('div')`
width: 100vw;
height: 100vh;
`;

Log.info('Application Loaded');
if (process.env.NODE_ENV !== 'production') {

}


/**
 * The main purpose of this class is to identify
 * if there is a logged user and redirect him to the proper view
 *
 * @class IronHacksApp
 * @component
 */
class IronHacksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      mustNavigate: false,
    };

    this.firestore = window.firebase.firestore();
  };

  componentDidMount() {
    Reactotron.log('[App.js] Mounted');
    this.isUserConected();
  };

  _setUser(_user) {
    this.setState({user: _user});
  };

  _setShouldNavigate(_update) {
    this.setState({mustNavigate: _update});
  }

  _setUpdateAdmin(_admin) {
    this.setState((prevState, props) => {
      if (prevState.user) {
        prevState.user.isAdmin = _admin;
      }

      prevState.mustNavigate = true;
      return prevState;
    });
  }

  _isAdmin() {
    this.firestore.collection('admins')
        .doc(this.state.user.uid)
        .get()
        .then((doc) => {
          this._setUpdateAdmin(true);
        })
        .catch((error) => {
          this._setUpdateAdmin(false);
        });
  };


  // Check firebase for active user session
  isUserConected() {
    window.firebase
        .auth()
        .onAuthStateChanged((user) => {
          if (user) {
            const names = user.displayName.split(' ');
            user.profileLetters = names[0].slice(0, 1) + names[1].slice(0, 1);
            this._setUser(user);
            this._isAdmin();
          } else {
            this._setUser(false);
            this._setShouldNavigate(true);
          }
        });
  };


  render() {
    if (!this.state.mustNavigate) {
      return (
        <LoaderContainer>
          <Loader/>
        </LoaderContainer>
      );
    } else {
      // Here we have all the posible routes on the platform,
      // we use 3 switches becouse the header and the footer
      // are only shown when there is a user logged.
      // We also hide them on the preview of a project.
      return (
        <CookiesProvider>
          <div className='App'>
            <Switch>
              <Route exact path='/login' render={() => null}/>
              <Route exact path='/' render={() => null}/>
              {!this.state.user && <Redirect to='/'/>}
              <Route exact path='/404' render={() => null}/>
              <Route exact path='/projectEditor/:proyectName/preview' render={() => null}/>
              <Route render={(props) => (<Header user={this.state.user} {...props}/>)}/>
            </Switch>

            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/profile' render={(props) => (<UserProfile user={this.state.user} {...props}/>)}/>
              <Route path='/hackSelection' render={(props) => (<HackSelection user={this.state.user} {...props}/>)}/>

              <Route path='/forum/thread/:threadId' render={(props) => (<ThreadViewWithRouter user={this.state.user} {...props}/>)}/>
              <Route exact path='/forum/new' render={(props) => (<NewThread user={this.state.user} {...props}/>)}/>
              <Route exact path='/forum' render={(props) => (<Forum user={this.state.user} {...props}/>)}/>

              <Route exact path='/admin/newHack' component={NewHack}/>
              <Route path='/admin/dashboard/:hackId' component={AdminDashboard}/>
              <Route path='/admin' component={Admin}/>

              <Route path='/task' render={(props) => (<Task user={this.state.user} {...props}/>)}/>
              <Route path='/tutorial' render={(props) => (<TutorialScreen user={this.state.user} {...props}/>)}/>
              <Route path='/results' render={(props) => (<Results user={this.state.user} {...props}/>)}/>

              <Route path='/quizzes/:quizName' render={(props) => (<QuizForm user={this.state.user} {...props}/>)}/>
              <Route exact path='/quizzes' component={Quizzes}/>


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
