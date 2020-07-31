import React from 'react';
import { Loader } from './components/loader';
import { CookiesProvider, Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProjectSelectView from './views/hacks/project-select-view';
import { Pages } from './views/pages/';

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
import './styles/css/typography.css'
import './styles/css/buttons.css'
import './styles/css/forum.css'

const filterUserData = (user) => {
  const names = user.displayName.split(' ');
  return {
    createdAt: user.metadata.creationTime,
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
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
    // console.log('document referrer', document.referrer);

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
     window.firebase.analytics()
       .logEvent('screen_view');

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
    this.setState({
      navigateTo: data.navigateTo,
      mustNavigate: data.mustNavigate,
    })
  }

  _isUserConnected() {
    const currentUser = window.firebase.auth().currentUser;

    if (currentUser){
      let user = filterUserData(currentUser);
      this._setUser({
        user: user,
        userId: user.userId,
        userIsAdmin: false,
      });
    }

    window.firebase.auth()
      .onAuthStateChanged((user) => {
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
                <div style={{width: '100vw', height: '100vh',  background: 'var(--color-primary)'}}>
                  <Loader />
                </div>
            ) : (
              <Switch>
                <Route exact path='/' >
                  <Pages.Home />
                </Route>

                <Route exact path='/covid19' >
                  <Pages.UpcomingHack />
                </Route>

                <Route path='/login'>
                  <Pages.Login
                    onLoginSuccess={this._updateAppNavigation}
                    onLoginFail={this._updateAppNavigation}
                  />
                </Route>

                {this.state.user && (
                  <>
                    <Route path='/notebook-viewer'>
                      <Pages.Notebook
                      user={this.state.user}
                      />
                    </Route>

                    <Route exact path='/hub'>
                      <Pages.Hub
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                        userId={this.state.userId}
                      />
                    </Route>

                    <Route exact path='/hacks'>
                      <Pages.HackSelect
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                        userId={this.state.userId}
                      />
                    </Route>

                    <Route path='/hacks/:hackSlug'>
                      <Pages.Hack
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
                      <Pages.Profile
                        profileId={this.state.userId}
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route exact path='/profile/edit'>
                      <Pages.ProfileEdit
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route path='/profile:profileId'>
                      <Pages.Profile
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route exact path='/logout'>
                      <Pages.Logout />
                    </Route>

                  {this.state.userIsAdmin && (
                    <>
                    <Route exact path='/admin'>
                      <Pages.AdminHackSelect
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route path='/admin/hacks/:hackId'>
                      <Pages.AdminHack
                        user={this.state.user}
                        userIsAdmin={this.state.userIsAdmin}
                      />
                    </Route>

                    <Route path='/admin/new-hack'>
                      <Pages.AdminNewHack
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

export default withCookies(withRouter(App));
