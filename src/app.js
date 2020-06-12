import React from 'react';
import styled from 'styled-components';
import { Loader } from './components/loader';
import { CookiesProvider, Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PageNotFound } from './views/default/404';
import HomePage from './views/home';
import { AdminHackDashboard  } from './views/admin';
import {
  AdminHackSelectPage,
  ProfilePage,
  UpcomingHackPage,
  HackPage,
  HackSelectPage,
  // ShowcasePage,
} from './views/pages/';
import { ProjectEditor } from './components/project';
import Login from './views/login';
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

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props);

    // const { cookies } = props;

    this.state = {
      loading: true,
      user: null,
      userId: null,
      userIsAdmin: false,
      userHackData: null,
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

   _setLoadingState(isLoading) {
     this.setState({loading: isLoading});
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

  async getUserName() {
    var user = await window.firebase.auth().currentUser
    if (user) {
      return user.displayName;
    }
  }

  _logout() {
    this.removeCookies();
    window.localStorage.clear();
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
    if (cookies.get('ironhack_user')) {
      cookies.remove('ironhack_user');
    }
    if (cookies.get('currentForum')) {
      cookies.remove('currentForum');
    }
  }

   _setUser(data) {
     const { cookies } = this.props;
     this.setState({
       user: data.user,
       userIsAdmin: data.userIsAdmin,
       userId: data.userId,
    })
    const { lastLoginAt, uid, profileLetters, displayName } = data.user;
    const cookieData = {
      loggedIn: lastLoginAt,
      userId: uid,
      initials: profileLetters,
      displayName: displayName,
    };

    this._setLoadingState(false)
    cookies.set('ironhack_user', window.btoa(JSON.stringify(cookieData)))
   }

  async _isAdmin(uid) {
    if (uid) {
      let isAdmin = await window.firebase.firestore()
        .collection('admins')
        .doc(uid)
        .get();
      return isAdmin.exists
    }
  }

  _isUserConnected() {
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

    window.firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          let _user = filterUserData(user);
          let _userIsAdmin = this._isAdmin(_user.uid);

          Promise.resolve(_userIsAdmin).then((_userIsAdminResult)=>{
            this._setUser({
              user: _user,
              userId: _user.uid,
              userIsAdmin: _userIsAdminResult,
            });
          })

          this._updateHackData(_user.uid);

        } else {
          this._setUser({
            user: false,
            userId: false,
            userIsAdmin: false,
          });
        }
      })
  }

  render() {
      if(this.state.loading){
        return(
          <LoaderContainer>
            <Loader/>
          </LoaderContainer>
        )
      } else {
        return (
          <CookiesProvider>
            <div className='App'>
              <Switch>
                <Route exact path='/' >
                  <HomePage />
                </Route>

                <Route exact path='/covid19' >
                  <UpcomingHackPage />
                </Route>

                <Route
                  path='/login'
                  component={Login}
                />
                {this.state.user && (
                  <>
                    <Route exact path='/hacks'>
                      <HackSelectPage
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
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
                      <ProjectEditor
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

                    <Route exact path='/logout'
                      render={()=>(this._logout())}
                    />

                  {this.state.userIsAdmin && (
                    <>
                    <Route exact path='/admin'>
                      <AdminHackSelectPage
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route path='/admin/hacks/:hackId'>
                      <AdminHackDashboard
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>
                    </>
                  )}
                  </>
                )}

                <Route exact path='/404' component={PageNotFound}/>

                <Redirect to='/'/>

              </Switch>
            </div>
          </CookiesProvider>
      );
    }
  };
}


//     <Route path='/profile/:userId' render={(props) => (<UserProfile user={this.state.user} {...props}/>)}/>

export default withCookies(App);
