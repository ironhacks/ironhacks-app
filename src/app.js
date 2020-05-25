import React from 'react';
import { Footer } from './views/layouts/sections/footer';
import styled from 'styled-components';
import { Loader } from './components/loader';
// import { Loader, LoaderContainer } from './components/loader';
// import { AppRoutes } from './config/routes';
import {CookiesProvider} from 'react-cookie';
import {
  Switch,
  Route,
  Redirect,
 } from 'react-router-dom';
import Log from './util/log.js';

import NewHack from './components/hacks/new-hack';
import ProjectEditor from  './components/projectEditor/projectEditor.js';
import ProjectPreview from './components/projectEditor/projectPreview.js';
import QuizForm from './components/quizzes/quizForm.js';
import Quizzes from './components/quizzes/quizzes.js';

import { PageNotFound } from './views/default/404';
import Header   from './views/layouts/sections/header';
import HomePage from './views/home';
import ThreadViewWithRouter from './views/forum/threadView/threadView';
import UserProfile from './views/userProfile/user-profile';
import TutorialScreen from './views/tutorial';
import Login from './views/login';
import ExamplesPage from './views/examples';
import Admin from './views/admin';
import AdminDashboard from './views/admin/adminDashboard';
import Forum from './views/forum/forum.js';
import { HackSelectPage, HackPage } from './views/hacks';
import NewThread from './views/forum/newThread.js';
import ProjectsPage from  './views/projects';
import Task from './views/task';
import Results from './views/results';

import './theme/styles.css';
import './assets/main.css';

const LoaderContainer = styled('div')`
  width: 100vw;
  height: 100vh;
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        isAdmin: false,
      },
      userIsAdmin: false,
      userHackData: null,
      mustNavigate: false,
    };
    this._isMounted = false;
  }

   componentDidMount() {
    this._isMounted = true;
     this.firestore = window.firebase.firestore();
     this._isUserConnected();
   }

   componentWillUnmount() {
    this._isMounted = false;
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
    this.firestore.collection('admins')
      .doc(this.state.user.uid)
      .get()
      .then((doc) => {
        console.log('is admin', doc);
        if (doc.exists) {
          console.log(true);
        }
        this._setUpdateAdmin(true);
      })
      .catch((error) => {
        this._setUpdateAdmin(false);
      })
   }

  async _getUserHackdata(userId){
    let userHackData = await window.firebase.firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((user)=>{
        console.log(user.data());
        return user.data();
      })

    return userHackData;
  }

  _setUserHackdata(hackData){
    localStorage.setItem('userHackData', JSON.stringify(hackData));

    if (this._isMounted){
      this.setState({
        userHackData: hackData,
      })
    }
  }

  _isUserConnected() {
    // this._setUpdateAdmin(true);
    this._setShouldNavigate(true);
    console.log('%c is user connected', 'color:red;font-weight:bold;');
    window.firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          const names = user.displayName.split(' ');
          const _user = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            isAdmin: user.isAdmin,
            metadata: user.metadata,
            phoneNumber: user.photoURL,
            photoURL: user.photoURL,
            profileLetters: names[0].slice(0, 1) + names[1].slice(0, 1),
            provider: user.providerData,
            user: user.isAnonymous,
            userId: user.uid,
            uid: user.uid,
          }
          console.log('%c onAuthStateChanged', 'color:red;font-weight:bold;', _user);
          this._setUser(_user);
          this._isAdmin();
          let hackData = this._getUserHackdata(_user.uid);
          this._setUserHackdata(hackData);
        } else {
          this._setUser({});
          this._setShouldNavigate(true);
        }
    });
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
              <Route path='/login' render={() => null}/>
              <Route exact path='/404' render={() => null}/>
              <Route exact path='/projectEditor/:proyectName/preview' render={() => null}/>

              {!this.state.user && <Redirect to='/'/>}
              <Route render={(props) => (<Header user={this.state.user} {...props}/>)}/>
            </Switch>

            <Switch>
              <Route path='/login' component={Login}/>

              <Route path='/profile' render={(props) => (<UserProfile user={this.state.user} {...props}/>)}/>
              <Route path='/profile/:userId' render={(props) => (<UserProfile user={this.state.user} {...props}/>)}/>

              <Route exact path='/forum' render={(props) => (<Forum user={this.state.user} {...props}/>)}/>
              <Route exact path='/forum/new' render={(props) => (<NewThread user={this.state.user} {...props}/>)}/>
              <Route path='/forum/thread/:threadId' render={(props) => (<ThreadViewWithRouter user={this.state.user} {...props}/>)}/>

              <Route exact path='/admin/newHack' component={NewHack}/>
              <Route path='/admin/dashboard/:hackId' component={AdminDashboard}/>
              <Route path='/admin' component={Admin}/>

              <Route path='/examples' render={(props) => (<ExamplesPage user={this.state.user} {...props}/>)}/>
              <Route path='/tutorial' render={(props) => (<TutorialScreen user={this.state.user} {...props}/>)}/>
              <Route path='/task' render={(props) => (<Task user={this.state.user} {...props}/>)}/>

              <Route exact path='/quizzes' component={Quizzes}/>
              <Route path='/quizzes/:quizName' render={(props) => (<QuizForm user={this.state.user} {...props}/>)}/>

              <Route path='/results' render={(props) => (<Results user={this.state.user} {...props}/>)}/>

              <Route exact path='/hacks' render={(props) => (<HackSelectPage user={this.state.user} {...props}/>)}/>
              <Route path='/hacks/:hackId' render={(props) => (<HackPage user={this.state.user} {...props}/>)}/>
              <Route path='/hack-settings/:hackId' component={AdminDashboard}/>

              <Route exact path='/projects' render={(props) => (<ProjectsPage user={this.state.user} {...props}/>)}/>
              <Route exact path='/projectEditor/:proyectName' render={(props) => (<ProjectEditor user={this.state.user} {...props}/>)}/>
              <Route exact path='/projectEditor/:proyectName/preview' render={(props) => (<ProjectPreview user={this.state.user} {...props}/>)}/>
              <Route exact path='/404' component={PageNotFound}/>

              {this.state.user.isAdmin && <Redirect to='/admin'/>}
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


//
// export function RouteConfigExample() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to='/tacos'>Tacos</Link>
//           </li>
//           <li>
//             <Link to='/sandwiches'>Sandwiches</Link>
//           </li>
//         </ul>
//
//         <Switch>
//           {AppRoutes.map((route, i) => (
//             <RouteWithSubRoutes key={i} {...route} />
//           ))}
//         </Switch>
//       </div>u
//     </Router>
//   );
// }
//
//
// // pass the sub-routes down to keep nesting
// function RouteWithSubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       render={props => (
//         <route.component {...props} routes={route.routes} />
//       )}
//     />
//   );
// }

export default App;
