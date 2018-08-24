  // IronHacks Platform
// header.js - Navigation bar
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.HeaderTheme;

const HeaderContainer = styled('div')`
  height: ${props => props.theme.containerHeight};
  background-color: ${Constants.mainBgColor}
`;
// Left buttons
const NavButton = styled(Link)`
  color: ${props => props.theme.textColor};
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: color 0.5s, font-size 0.5s;

  &:hover {
    color: ${props => props.theme.hoverTextColor};
    font-size:18px;
  }
`;
// User menu (right menu)
const UserMenuDropper = styled('button')`
  border: none;
  background-color: transparent;
  color: black;
  font-weight: 700;
`;
const UserMenu = styled('div')`
  display: ${props => props.display};
  flex-direction: column;
  align-items: left;
  position: absolute;
  top: 45px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
`;
const UserMenuButton = styled('button')`
  border: none;
  background-color: transparent;
  color: black;
  font-weight: 600;
  text-align: left;
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
    margin-botton: 5px;
  }
`;
// Right section
const RightAlignDiv = styled('div')`
  display: flex;
  justify-content: flex-end;
`;
class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showMenu: 'none',
    }

    this.getUserName()
  }

  getUserName = () => {
    return window.firebase.auth().currentUser.displayName
  };

  showMenu = () => {
    if(this.state.showMenu === 'none'){
      this.setState({showMenu: 'flex'})
    }else{
      this.setState({showMenu: 'none'})
    }
  }

  logout(){
    window.firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  };

  render() {
    if(this.state.signOut === true){
      return(
        <Redirect to='/'/>
      );
    };

    return (
      <ThemeProvider theme={theme}>
        <div className="container-fluid">
          <HeaderContainer className="row">
            <div className="col-5">
              <NavButton to="/forum">Forum</NavButton>
              <span> | </span>
              <NavButton to="/tutorial">Tutorial</NavButton>
              <span> | </span>
              <NavButton to="/quizzes">Quizzes</NavButton>
              <span> | </span>
              <NavButton to="/task">Task</NavButton>
              <span> | </span>
              <NavButton to="/results">Results</NavButton>
            </div>
            <div className="col-2">
              <IronHacksCenterLogo>
                <label>IronHacks</label>
              </IronHacksCenterLogo>
            </div>
            <RightAlignDiv className='col-5'>
              <UserMenuDropper onClick={this.showMenu}>{this.getUserName()}</UserMenuDropper>
              <UserMenu display={this.state.showMenu}>
                <UserMenuButton>Profile</UserMenuButton>
                <UserMenuButton onClick={this.logout}>Sign Out</UserMenuButton>
              </UserMenu>
            </RightAlignDiv>
          </HeaderContainer>
        </div>
      </ThemeProvider>
    );
  }
}

export default Header;