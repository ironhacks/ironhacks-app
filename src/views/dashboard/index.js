import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HackSelectPage, HackPage } from '../hacks';
import UserProfile from '../profile';
import { Page } from '../../components/layout';


class DashboardPage extends React.Component {
  render(){
    return (
     <Page
        user={this.props.user}
        displayName={this.props.user.displayName}
        isAdmin={this.props.userIsAdmin}
        >
      <main>
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

          <Route exact path='/profile'>
            <UserProfile user={this.props.user} />
          </Route>
        </Switch>
      </main>
      </Page>
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
