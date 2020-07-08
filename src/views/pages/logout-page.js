import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  // Cookies,
  withCookies
} from 'react-cookie';
import styled from 'styled-components';
import { Loader } from '../../components/loader';
// import { BlankPage, Section, Row, Col } from '../../components/layout';

const LoaderContainer = styled('div')`
  width: 100vw;
  height: 100vh;
`;

class LogoutPage extends React.Component {
  constructor(props) {


    super(props);
    this.state = {
      loading: true,
    }

    this._logout = this._logout.bind(this);
  }

  componentDidMount() {
    console.log('%c LogoutPage is mounted', 'color:red;font-weight:bold');
    this._logout();
  }

  _logout() {
    const { cookies } = this.props;

    console.log('%c LOGGING OUT', 'color:red;font-weight:bold');
    window.firebase.auth()
      .signOut()
      .then(()=>{
        if (cookies.get('currentHack')) {
          cookies.remove('currentHack');
        }
        if (cookies.get('ironhack_user')) {
          cookies.remove('ironhack_user');
        }
        if (cookies.get('currentForum')) {
          cookies.remove('currentForum');
        }

        window.localStorage.clear();
        this.setState({
          loading: false,
          // navigateTo: '/',
          // mustNavigate: true,
        })
      },
      function(error) {
        console.error('Sign Out Error', error);
      }
      )
  }

  render() {
    if (this.state.loading) {
      return (
        <LoaderContainer>
          <Loader status={'Logging Out'} />
        </LoaderContainer>
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
