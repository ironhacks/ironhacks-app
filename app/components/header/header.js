// IronHacks Platform
// header.js - Navigation bar
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {withCookies} from 'react-cookie';
// Styled components
import styled, {ThemeProvider} from 'styled-components';
// Custom Constants
import * as Constants from '../../../constants.js';
import {registerStats} from '../../utilities/registerStat.js';

import menuIcon from './img/menu-icon.svg';

const theme = Constants.HeaderTheme;

const HeaderContainer = styled('div')`
  height: ${(props) => props.theme.containerHeight};
  background-color: ${Constants.mainBgColor}

  .menu {
    display: flex;
    align-items: center;
  }
`;
const NavContainer = styled('nav')`
  display: flex;
  align-items: center;
  font-size: 14px;

  button {
    display: none;
  }

  .links-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 1200px) {
    position: absolute;
    flex-direction: column;
    align-items: start;
    width: 200px;
    top: 10px;
    left 15px;

    .links-container {
      display: ${(props) => props.display};
      flex-direction: column;
      align-items: start;
      border-radius: ${Constants.universalBorderRadius};
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
    }

    a {
      text-align: left;
      font-weight: 600;

      width: 100%;

      &:hover {
        color: black;
        background-color: lightgray;
      }

      &:last-child {
        border-bottom: none;
      }
    }

    span {
      display: none;
    }

    button {
      display: block;
      width: 30px;
      height: 30px;
      padding: 0;
      border: none;
      background-color: transparent;
      border-radius: ${Constants.universalBorderRadius};
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: lightgray;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
// Left buttons
const NavButton = styled(Link)`
  color: ${(props) => props.theme.textColor};
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  font-weight: 800;
  font-size: 15px;
  display: inline-block;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.hoverTextColor};
  }
`;
// User menu (right menu)
const UserMenuDropper = styled('button')`
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: black;
  font-weight: 700;
`;
const UserMenu = styled('div')`
  display: ${(props) => props.display};
  flex-direction: column;
  align-items: left;
  position: absolute;
  top: 45px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
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
// Center Logo
const IronHacksCenterLogo = styled('div')`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;

  label {
    margin: 0;;
  }
`;
// Right section
const RightAlignDiv = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

/**
 *
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserMenu: 'none',
      showMenu: 'none',
      user: props.user,
    };
    this.getUserName();
    this.userMenuRef = React.createRef();
    this.navMenuRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  handleClickOutside = (event) => { 
    const userMenuRef = this.userMenuRef.current;
    const navMenuRef = this.navMenuRef.current;
    if (userMenuRef && !userMenuRef.contains(event.target)
        && navMenuRef
        && !navMenuRef.contains(event.target)) {

      this.setState({
        showMenu: 'none',
        showUserMenu: 'none',
      });
    }
  }

  getUserName = () => {
    return window.firebase.auth().currentUser.displayName;
  };

  showUserMenu = () => {
    if (this.state.showUserMenu === 'none') {
      this.setState({showUserMenu: 'flex'});
    } else {
      this.setState({showUserMenu: 'none'});
    }
  };

  showMenu = () => {
    if (this.state.showMenu === 'none') {
      this.setState({showMenu: 'flex'});
    } else {
      this.setState({showMenu: 'none'});
    }
  };

  hideMenus = (event) => {
    const statData = {
      userId: this.state.user.uid,
      event: 'change-section',
      metadata: {
        location: 'header',
        target: event.target.innerHTML,
      },
    };
    registerStats(statData);
    this.setState({
      showMenu: 'none',
      showUserMenu: 'none',
    });
  }

  logout = () => {
    this.removeCookies();
    window.firebase.auth().signOut().then(function() {
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  };

  removeCookies = () => {
    const {cookies} = this.props;
    if (cookies.get('currentHack')) {
      cookies.remove('currentHack');
    }
    if (cookies.get('currentForum')) {
      cookies.remove('currentForum');
    }
  }

  render() {
    if (this.state.signOut === true) {
      return (
        <Redirect to='/'/>
      );
    };
    return (
      <ThemeProvider theme={theme}>
        <div className="container-fluid">
          <HeaderContainer className="row">
            {this.props.location.pathname === '/hackSelection' ?
              <div className="col-5"/> :
              <div className="col-5 menu">
                <NavContainer display={this.state.showMenu} innerRef={this.navMenuRef}>
                  <button onClick={this.showMenu}>
                    <img src={menuIcon} alt='menu_icon'/>
                  </button>
                  <div className='links-container'>
                    <NavButton to="/forum" onClick={this.hideMenus}>Forum</NavButton>
                    <span> | </span>
                    <NavButton to="/results" onClick={this.hideMenus}>Results</NavButton>
                    <span> | </span>
                    <NavButton to="/tutorial" onClick={this.hideMenus}>Tutorial</NavButton>
                    <span> | </span>
                    <NavButton to="/quizzes" onClick={this.hideMenus}>Quizzes</NavButton>
                    <span> | </span>
                    <NavButton to="/task" onClick={this.hideMenus}>Task</NavButton>
                    <span> | </span>
                    {this.state.user.isAdmin && <NavButton to="/admin" onClick={this.hideMenus}>Admin</NavButton>}
                  </div>
                </NavContainer>
              </div>
            }
            <div className="col-2">
              <IronHacksCenterLogo>
                <label>IronHacks</label>
              </IronHacksCenterLogo>
            </div>
            <RightAlignDiv className='col-5'>
              <UserMenuDropper onClick={this.showUserMenu} >{this.state.user.displayName}</UserMenuDropper>
              <UserMenu display={this.state.showUserMenu} innerRef={this.userMenuRef}>
                {this.props.location.pathname !== '/hackSelection' &&
                  <NavButton to="/profile" onClick={this.hideMenus}>Profile</NavButton>
                }
                <UserMenuButton onClick={this.logout}>Sign Out</UserMenuButton>
              </UserMenu>
            </RightAlignDiv>
          </HeaderContainer>
        </div>
      </ThemeProvider>
    );
  }
}


export default withCookies(Header);
