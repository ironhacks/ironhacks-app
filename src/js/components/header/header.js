// IronHacks Platform
// header.js - Navigation bar
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from 'react-router-dom';
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

// Center Logo
const IronHacksCenterLogo = styled('div')`
  padding: 10px 10px;
  font-weight: 900;
  text-align: center;
`;

// Right section
const RightAlignDiv = styled('div')`
  display: flex;
  justify-content: flex-end;
`;


class Header extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <HeaderContainer className="container-fluid">
          <div className="row">
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
                <span>IronHacks</span>
              </IronHacksCenterLogo>
            </div>
            <RightAlignDiv className='col-5'>
              <NavButton to="/login">User name</NavButton>
            </RightAlignDiv>
          </div>
        </HeaderContainer>
      </ThemeProvider>
    );
  }
}

export default Header;