import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
// import registerStat from '../../../util/register-stat';
import { NavButton } from '../navigation/nav-button'
import { HeaderNav } from '../navigation/header-nav'
import { HeaderLogo } from '../navigation/header-logo'

import { Theme } from '../../../theme';

const colors = Theme.COLORS;
const styles = Theme.STYLES;
// const units = Theme.UNITS;
const themes = Theme.THEMES;

const HeaderContainer = styled('div')`
  height: ${(props) => props.theme.containerHeight};
  background-color: ${colors.mainBgColor}

  .menu {
    display: flex;
    align-items: center;
  }
`;


const UserMenu = styled('div')`
  display: ${(props) => props.display};
  flex-direction: column;
  align-items: left;
  position: absolute;
  top: 45px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  a {
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
    text-align: left;

    &:hover {
      background-color: lightgray;
    }
  }
`;

const UserMenuButton = styled('button')`
  border: none;
  background-color: transparent;
  color: black;
  font-weight: 600;
  text-align: left;
  padding: 10px;

  &:hover {
    background-color: lightgray;
  }
`;



const RightAlignDiv = styled('div')`
  display: flex;
  justify-content: flex-end;
`;


const UserMenuDropper = styled('button')`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: black;
  font-weight: 700;
`;

class UserMenuDropdownButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UserMenuDropper onClick={this.props.onClick} >
        {this.props.text}
      </UserMenuDropper>
    )
  }

}

class Header extends React.Component {
  constructor(props) {
    super(props);

    let user = {};

    if (this.props.user) {
      user = this.props.user
    }

    this.state = {
      showUserMenu: 'none',
      showMenu: 'none',
      user: user,
    };

    this.displayName = this.props.user.displayName;
    this.userMenuRef = React.createRef();
    this.navMenuref = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    const userMenuRef = this.userMenuRef.current;
    if (userMenuRef && !userMenuRef.contains(event.target)) {
      this.setState({
        showUserMenu: 'none',
      });
    }
  };

  getUserName() {
    var user = window.firebase.auth().currentUser
    console.log('user', user);
    console.log('state user', this.state.user);

    if (user) {
      return user.displayName;
    }
    return 'unset';
  };

  showUserMenu = () => {
    if (this.state.showUserMenu === 'none') {
      this.setState({ showUserMenu: 'flex' });
    } else {
      this.setState({ showUserMenu: 'none' });
    }
  };

  hideMenus = (event) => {
    this.setState({
      showUserMenu: 'none',
    });
  };

  logout = () => {
    this.removeCookies();
    window.firebase
      .auth()
      .signOut()
      .then(
        function() {},
        function(error) {
          console.error('Sign Out Error', error);
        }
      );
  };

  removeCookies = () => {
    const { cookies } = this.props;
    if (cookies.get('currentHack')) {
      cookies.remove('currentHack');
    }
    if (cookies.get('currentForum')) {
      cookies.remove('currentForum');
    }
  };

  render() {
    if (this.state.signOut === true) {
      return <Redirect to='/' />;
    }
    return (
      <ThemeProvider theme={themes.HeaderTheme}>
        <div className='container-fluid' style={styles.HeaderStyle}>
          <HeaderContainer className='row' style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: '1em',
            paddingTop: '.4em',
          }}>

            <div className='col-2'>
              <HeaderLogo />
            </div>

            {/* SHOW MENU AFTER HACK SELECTION PAGE */}
            <div className='col-5 menu' >
            {this.props.location.pathname !== '/hacks' && (
              <HeaderNav navMenuref={this.navMenuref} />
            )}
            </div>

            <RightAlignDiv className='col-5'>

              <UserMenuDropdownButton
                onClick={this.showUserMenu}
                text={this.props.user.displayName}
              />

              <UserMenu
                display={this.state.showUserMenu}
                innerRef={this.userMenuRef}
              >

              {this.props.location.pathname !== '/hacks' && (
                <NavButton
                  to='/profile'
                  onClick={this.hideMenus}
                >
                  Profile
                </NavButton>
              )}

              {this.props.user.isAdmin && (
                <NavButton to='/admin' onClick={this.hideMenus}>
                  Admin
                </NavButton>
              )}

                <UserMenuButton onClick={this.logout}>
                  Sign Out
                </UserMenuButton>
              </UserMenu>
            </RightAlignDiv>
          </HeaderContainer>
        </div>
      </ThemeProvider>
    )
  }
}

export default withCookies(Header);
