import React from 'react';
import { Footer } from './layouts/sections/footer';
import Reactotron from 'reactotron-react-js';
import styled from 'styled-components';
import { Loader } from './components/loader';
import { AppRoutes } from './config/routes';
// import { Loader, LoaderContainer } from './components/loader';
import {CookiesProvider} from 'react-cookie';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
  Link,
 } from 'react-router-dom';
import Log from './util/log.js';
import { PageNotFound } from './views/default/404';
import Header from './layouts/sections/header';
import HomePage from './views/home';
import ThreadViewWithRouter from './views/forum/threadView/threadView';
import UserProfile from './views/userProfile/user-profile';
import TutorialScreen from './views/tutorial';
import Login from './views/login';
import Admin from './views/admin';
import AdminDashboard from './views/admin/adminDashboard';
import Forum from './views/forum/forum.js';
import HackSelection from './views/login/hackSelection.js';
import NewHack from './views/admin/newHack/newHack.js';
import NewThread from './views/forum/newThread.js';
import ProjectEditor from  './components/projectEditor/projectEditor.js';
import ProjectPreview from './components/projectEditor/projectPreview.js';
import QuizForm from './components/quizzes/quizForm.js';
import Quizzes from './components/quizzes/quizzes.js';
import Task from './views/task';
import Results from './views/results/results.js';
import './theme/styles.css';


const LoaderContainer = styled('div')`
  width: 100vw;
  height: 100vh;
`;

const testUser = {
  uid: 111,
  displayName: 'developer',
  name: 'developer',
  isAdmin: true,
  admin: true,
  email: 'developer@develer.com',
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: undefined,
      user: testUser,
      mustNavigate: false,
    };

    // this.firestore = window.firebase.firestore();
  }


   componentDidMount() {
     Reactotron.log('[App.js] Mounted');
     this.isUserConected();
   }

   _setUser(_user) {
     this.setState({user: _user});
   }

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
    this._setUpdateAdmin(true);
     // this.firestore.collection('admins')
     //     .doc(this.state.user.uid)
     //     .get()
     //     .then((doc) => {
     //       this._setUpdateAdmin(true);
     //     })
     //     .catch((error) => {
     //       this._setUpdateAdmin(false);
     //     });
   }

  isUserConected() {
    this._setUpdateAdmin(true);
    this._setShouldNavigate(true);
    // window.firebase
    //   .auth()
    //   .onAuthStateChanged((user) => {
    //     if (user) {
    //       const names = user.displayName.split(' ');
    //       user.profileLetters = names[0].slice(0, 1) + names[1].slice(0, 1);
    //       this._setUser(user);
    //       this._isAdmin();
    //     } else {
    //       this._setUser(false);
    //       this._setShouldNavigate(true);
    //     }
    // });
  }


  render() {
      if(!this.state.mustNavigate){
        return(
          <LoaderContainer>
            <Loader/>
          </LoaderContainer>
        );
      } else {
        if (process.env.NODE_ENV !== 'production') {
          Log.info('Application Loaded');
        }
       return (
         <CookiesProvider>
          <div className='App'>
           <Switch>
              <Route exact path='/' render={() => null}/>
              <Route path='/login' component={Login}/>
              {!this.state.user && <Redirect to='/'/>}
              <Route render={(props) => (<Header user={this.state.user} {...props}/>)}/>
            </Switch>
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/hackSelection' render={(props) =>                             (<HackSelection user={this.state.user} {...props}/>)}/>
              <Route path='/profile' render={(props) =>                                   (<UserProfile user={this.state.user} {...props}/>)}/>

              <Route exact path='/forum' render={(props) =>                               (<Forum user={this.state.user} {...props}/>)}/>
              <Route exact path='/forum/new' render={(props) =>                           (<NewThread user={this.state.user} {...props}/>)}/>
              <Route path='/forum/thread/:threadId' render={(props) =>                    (<ThreadViewWithRouter user={this.state.user} {...props}/>)}/>

              <Route exact path='/admin/newHack' component={NewHack}/>
              <Route path='/admin/dashboard/:hackId' component={AdminDashboard}/>
              <Route path='/admin' component={Admin}/>
              <Route path='/tutorial' render={(props) =>                                  (<TutorialScreen user={this.state.user} {...props}/>)}/>

              <Route path='/task' render={(props) =>                                      (<Task user={this.state.user} {...props}/>)}/>
              <Route exact path='/quizzes' component={Quizzes}/>

              <Route path='/quizzes/:quizName' render={(props) =>                         (<QuizForm user={this.state.user} {...props}/>)}/>
              <Route path='/results' render={(props) =>                                   (<Results user={this.state.user} {...props}/>)}/>
              <Route exact path='/projectEditor/:proyectName' render={(props) =>          (<ProjectEditor user={this.state.user} {...props}/>)}/>
              <Route exact path='/projectEditor/:proyectName/preview' render={(props) =>  (<ProjectPreview user={this.state.user} {...props}/>)}/>
              <Route exact path='/404' component={PageNotFound}/>
              {this.state.user.admin && <Redirect to='/admin'/>}
              <Route exact path='/' component={HomePage}/>
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
          </CookiesProvider>
      );
    }
  };
}



export function RouteConfigExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/tacos'>Tacos</Link>
          </li>
          <li>
            <Link to='/sandwiches'>Sandwiches</Link>
          </li>
        </ul>

        <Switch>
          {AppRoutes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>u
    </Router>
  );
}


// pass the sub-routes down to keep nesting
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default App;
