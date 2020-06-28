import React from 'react';
import styled from 'styled-components';
import { Loader } from './components/loader';
import { CookiesProvider, Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProjectSelectView from './views/hacks/project-select-view';
import {
  HomePage,
  LoginPage,
  LogoutPage,
  NewHackPage,
  AdminHackSelectPage,
  ProfilePage,
  UpcomingHackPage,
  HackPage,
  AdminHackPage,
  HackSelectPage,
} from './views/pages/';

import './assets/static/bootstrap-reboot.css'
import './assets/static/bootstrap-grid.css'
import './styles/css/root.css'
import './styles/css/main.css'
import './styles/css/colors.css'
import './styles/css/layout.css'
import './styles/css/flex.css'
import './styles/css/base.css'
import './styles/css/icons.css'
import './styles/css/content.css'
import './styles/css/charrismatic.css'

const LoaderContainer = styled('div')`
  width: 100vw;
  height: 100vh;
`;

const filterUserData = (user) => {
  const names = user.displayName.split(' ');
  return {
    createdAt: user.metadata.creationTime,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    // phoneNumber: user.photoURL,
    photoURL: user.photoURL,
    profileLetters: names[0].slice(0, 1) + names[1].slice(0, 1),
    provider: user.providerData,
    user: user.isAnonymous,
    userId: user.uid,
    uid: user.uid,
    lastLoginAt: user.metadata.lastSignInTime,
  }
}

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props);

    // const { cookies } = props;

    this.state = {
      mustNavigate: false,
      navigateTo: '',
      loading: true,
      user: null,
      userId: null,
      userIsAdmin: false,
      userHackData: null,
    }

    this._isMounted = false;
    this._setUser = this._setUser.bind(this);
    this._isAdmin = this._isAdmin.bind(this);
    this._isUserConnected = this._isUserConnected.bind(this);
    this._setLoadingState = this._setLoadingState.bind(this);
    this._updateAppNavigation = this._updateAppNavigation.bind(this);
  }

   componentDidMount() {
     console.log('%c App is mounted', 'color:red;font-weight:bold');
     this._isMounted = true;
     this._isUserConnected();
   }

   componentWillUnmount() {
    this._isMounted = false;
   }

  _setLoadingState(isLoading) {
     this.setState({loading: isLoading});
  }

  _updateAppNavigation(data){
    console.log('updateAppNavigation app navigation', data);
    this.setState({
      navigateTo: data.navigateTo,
      mustNavigate: data.mustNavigate,
    })
  }

  _isUserConnected() {

    const currentUser = window.firebase.auth().currentUser;

    if (currentUser){
      console.log('current user', currentUser);
      let user = filterUserData(currentUser);
      this._setUser({
        user: user,
        userId: user.userId,
        userIsAdmin: false,
      });
      console.log('current user', user);
    }

    window.firebase.auth()
      .onAuthStateChanged((user) => {
        console.log('auth state changed', user);
        console.log('auth state changed state', this.state);
        if (user) {
          let _user = filterUserData(user);
          let _userId = _user.userId;
          let _userIsAdmin = this._isAdmin(_userId);

          Promise.resolve(_userIsAdmin).then((_userIsAdminResult)=>{
            this._setUser({
              user: _user,
              userId: _user.userId,
              userIsAdmin: _userIsAdminResult,
            });
          }).catch((error)=>{
            console.log('error', error);
          })
        } else {
          this._setUser({
            user: false,
            userId: false,
            userIsAdmin: false,
          });
        }
      })
  }


  _setUser(data) {
    if (!data.user){
      console.log('no user');
    } else {
      console.log('setting user data', data);

      const { cookies } = this.props;

      const { lastLoginAt, uid, profileLetters, displayName } = data.user;

      const cookieData = {
        loggedIn: lastLoginAt,
        userId: uid,
        initials: profileLetters,
        displayName: displayName,
      };

      cookies.set('ironhack_user', window.btoa(JSON.stringify(cookieData)))
    }

    this.setState({
      user: data.user,
      userId: data.userId,
      userIsAdmin: data.userIsAdmin,
    })

    this._setLoadingState(false);
  }

  async _isAdmin(uid) {
    if (uid) {
      const isAdmin = await window.firebase.firestore()
        .collection('admins')
        .doc(uid)
        .get();

      return isAdmin.exists;

    } else {
      return false;
    }
  }

  render() {
    if (this.state.mustNavigate) {
      return (
        <Redirect push to={{
            pathname: `${this.state.navigateTo}`,
            state: {
              user: this.state.user,
              mustNavigate: false,
            },
          }}
        />
      )
    } else {
      return (
        <CookiesProvider>
          <div className='App'>
            {this.state.loading ? (
                <LoaderContainer>
                  <Loader/>
                </LoaderContainer>
            ) : (
              <Switch>
                <Route exact path='/' >
                  <HomePage />
                </Route>

                <Route exact path='/covid19' >
                  <UpcomingHackPage />
                </Route>

                <Route path='/login'>
                  <LoginPage
                    onLoginSuccess={this._updateAppNavigation}
                    onLoginFail={this._updateAppNavigation}
                  />
                </Route>

                {this.state.user && (
                  <>
                    <Route exact path='/hacks'>
                      <HackSelectPage
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                        userId={this.state.userId}
                      />
                    </Route>

                    <Route path='/hacks/:hackId'>
                      <HackPage
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                        userId={this.state.userId}
                      />
                    </Route>

                    <Route exact path='/projects'>
                      <ProjectSelectView
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route path='/projects/:projectName'>
                      <ProjectSelectView
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route exact path='/profile'>
                      <ProfilePage
                        profileId={this.state.userId}
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route path='/profile:profileId'>
                      <ProfilePage
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route exact path='/logout'>
                      <LogoutPage />
                    </Route>

                  {this.state.userIsAdmin && (
                    <>
                    <Route exact path='/admin'>
                      <AdminHackSelectPage
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route path='/admin/hacks/:hackId'>
                      <AdminHackPage
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route path='/admin/new-hack'>
                      <NewHackPage
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>
                    </>
                  )}
                  </>
                )}

                <Redirect to='/'/>
              </Switch>
        )}
          </div>
        </CookiesProvider>
      )
    }
  }
}
// <Route exact path='/404' component={PageNotFound}/>


//     <Route path='/profile/:userId' render={(props) => (<UserProfile user={this.state.user} {...props}/>)}/>

export default withCookies(withRouter(App));
