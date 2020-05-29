import React from 'react';
import Header from '../layouts/header';
import { Footer } from '../layouts/footer';
import {
  Switch,
  Route,
  // Redirect
} from 'react-router-dom';
import {
  HackSelectPage,
  HackPage,
} from '../hacks';
import UserProfile from '../profile';


class DashboardPage extends React.Component {
  render(){
    return (
      <main>
      <Header
        user={this.props.user}
        displayName={this.props.user.displayName}
        isAdmin={this.props.userIsAdmin}
      />

      <Switch>
        <Route exact path='/hacks'>
          <HackSelectPage
            user={this.props.user}
          />
        </Route>
        <Route path='/hacks/:hackId'>
          <HackPage
            user={this.props.user}
            userId={this.props.user.uid}
          />
        </Route>
        <Route exact path='/hacks'>
          <HackSelectPage user={this.props.user} />
        </Route>

        <Route exact path='/profile'>
          <UserProfile user={this.props.user} />
        </Route>

      </Switch>

      <Footer />
      </main>
    )
  }
}

//   <>
// <Route exact path='/hacks' render={(props) => (<HackSelectPage user={this.state.user} {...props}/>)}/>
//     <Route path='/profile' render={(props) => (<UserProfile user={this.state.user} {...props}/>)}/>
//     <Route path='/profile/:userId' render={(props) => (<UserProfile user={this.state.user} {...props}/>)}/>
//     <Route path='/admin/dashboard/:hackId' component={AdminDashboard} user={this.state.user} />
//     <Route path='/hack-settings/:hackId' component={AdminDashboard} user={this.state.user} />
//     <Route exact path='/admin/newHack' component={NewHack} user={this.state.user} />
//     <Route path='/admin' component={Admin} user={this.state.user} />
//   </>

DashboardPage.defaultProps = {
    isAdmin: false,
    user: {},
}

export { DashboardPage }
