import React from 'react';
import styled from 'styled-components';
import { Loader } from './components/loader';
import { CookiesProvider, Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Switch, Route,
  // Redirect,
} from 'react-router-dom';
import { PageNotFound } from './views/default/404';
import HomePage from './views/home';
import { ProjectEditor } from './components/project';
import { DashboardPage } from './views/dashboard';
import Login from './views/login';
import './styles/css/root.css'
import './styles/css/main.css'
import './styles/css/flex.css'
import './styles/css/colors.css'
import './styles/css/layout.css'
import './styles/css/base.css'
import './styles/css/icons.css'
import './styles/css/charrismatic.css'


const LoaderContainer = styled('div')`
  width: 100vw;
  height: 100vh;
`;

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props);

    // const { cookies } = props;

    this.state = {
      userId: null,
      userIsAdmin: false,
      userHackData: null,
      mustNavigate: false,
    }

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

   _setShouldNavigate(_update) {
     this.setState({mustNavigate: _update});
   }

   _setUpdateAdmin(_admin) {
     this.setState((prevState, props) => {
       if (prevState.user) {
         prevState.user.isAdmin = _admin;
         prevState.userIsAdmin = _admin;
       }
       return prevState;
     });
   }

   async _isAdmin(uid) {
    if (uid) {
      let isAdmin = await window.firebase.firestore()
        .collection('admins')
        .doc(uid)
        .get();
      this._setUpdateAdmin(isAdmin.exists)
    }
  }

  _setUserHackdata(hackData){
    localStorage.setItem('userHackData', JSON.stringify(hackData));
    if (this._isMounted){
      this.setState({
        userHackData: hackData,
      })
    }
  }

  async _getUserHackdata(userId){
    let userHackData = await window.firebase.firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((user)=>{
        return user.data();
      })

    return userHackData;
  }

  async _updateHackData(userId) {
    let hackData = await this._getUserHackdata(userId);
    this._setUserHackdata(hackData);
  }

  getUserName() {
    var user = window.firebase.auth().currentUser
    if (user) {
      return user.displayName;
    }
  }


  _logout() {
    this.removeCookies();
    window.firebase.auth()
      .signOut()
      .then(
        function() {
          window.location = '/';
        },
        function(error) {
          console.error('Sign Out Error', error);
        }
      )
  }

  removeCookies() {
    const { cookies } = this.props;
    if (cookies.get('currentHack')) {
      cookies.remove('currentHack');
    }
    if (cookies.get('currentForum')) {
      cookies.remove('currentForum');
    }
  }

   _setUser(_user) {
     this.setState({
       user: _user,
       userId: _user.uid,
    });
   }

  _isUserConnected() {
    const filterUserData = (user) => {
      const names = user.displayName.split(' ');
      return {
          createdAt: user.metadata.creationTime,
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          phoneNumber: user.photoURL,
          photoURL: user.photoURL,
          profileLetters: names[0].slice(0, 1) + names[1].slice(0, 1),
          provider: user.providerData,
          user: user.isAnonymous,
          userId: user.uid,
          uid: user.uid,
          lastLoginAt: user.metadata.lastSignInTime,
        }
    }

    window.firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          let _user = filterUserData(user);
          this._setUser(_user);
          this._isAdmin(_user.uid);
          this._updateHackData(_user.uid);
        } else {
          this._setUser({});
          this._setShouldNavigate(true);
        }
      })
    this._setShouldNavigate(true);
  }

  render() {
      if(!this.state.user){
        return(
          <LoaderContainer>
            <Loader/>
          </LoaderContainer>
        );
      } else {
        return (
          <CookiesProvider>
          <div className='App'>
            <Switch>
              <Route exact path='/' >
                <HomePage />
              </Route>

              {this.state.user && (
                <Route path='/hacks'>
                <DashboardPage
                    user={this.state.user}
                    userIsAdmin={this.state.userIsAdmin}
                  />
                </Route>
              )}

              {this.state.user && (
                <Route path='/project'>
                  <ProjectEditor
                    user={this.state.user}
                    userIsAdmin={this.state.userIsAdmin}
                  />
                </Route>
              )}

              {this.state.user && (
                <Route path='/profile'>
                  <DashboardPage
                    user={this.state.user}
                    userIsAdmin={this.state.userIsAdmin}
                  />
                </Route>
              )}

              {this.state.user && (
                <Route
                  path='/logout'
                  render={()=>(this._logout())}
                />
              )}
              <Route path='/login' component={Login}/>
              <Route exact path='/404' component={PageNotFound}/>
              <Route path='/hacks'>
                <DashboardPage
                  user={this.state.user}
                  userIsAdmin={this.state.userIsAdmin}
                />
              </Route>
              <Route path='/projects/:projectName'>
                <ProjectEditor
                  user={this.state.user}
                  userIsAdmin={this.state.userIsAdmin}
                />
              </Route>
              <Route path='/profile'>
                <DashboardPage
                user={this.state.user}
                userIsAdmin={this.state.userIsAdmin}
                />
              </Route>
              <Route
                path='/logout'
                render={()=>(this._logout())}
              />
              <Redirect to='/'/>
            </Switch>
            </div>
          </CookiesProvider>
      );
    }
  };
}

export default withCookies(App);
