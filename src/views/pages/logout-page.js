import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Loader } from '../../components/loader';

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
    const { cookies } = this.props;
    window.firebase.auth()
      .signOut()
      .then(()=>{
        if (cookies.get('ironhack_user')) {
          cookies.remove('ironhack_user');
        }
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

export default withCookies(LogoutPage);
