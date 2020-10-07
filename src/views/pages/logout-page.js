import React from 'react';
import { Redirect } from 'react-router-dom';
import { Loader } from '../../components/loader';
import { userMetrics } from '../../util/user-metrics'

class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true }
    this._logout = this._logout.bind(this);
  }

  componentDidMount() {
    this._logout();
  }

  _logout() {
    window.firebase.analytics().logEvent('user_logout');
    userMetrics({event: 'user_logout'})

    window.firebase.auth()
      .signOut()
      .then(()=>{
        window.localStorage.clear();
        this.setState({ loading: false })
      },
      function(error) {
        console.error('Sign Out Error', error);
      }
      )
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ width: '100vw', height: '100vh' }}>
          <Loader status={'Logging Out'} />
        </div>
      )
    } else {
      return (
        <Redirect to={{
            pathname: '/',
          }}
        />
      )
    }
  }
}

export default LogoutPage;
