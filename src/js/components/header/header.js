// IronHacks Platform
// header.js - Navigation bar
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from 'react-router-dom';

import styled, {ThemeProvider} from 'styled-components';

import * as Constants from '../../../constants.js'

// Define our button, but with the use of props.theme this time
/*
const Button = styled.button`
  color: ${props => props.theme.fg};
  border: 2px solid ${props => props.theme.fg};
  background: ${props => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

// This theme swaps `fg` and `bg`
const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg
});
*/


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
  display: inline-block;
  transition: color 0.5s, font-size 0.5s;

  &:hover{
    color: ${props => props.theme.hoverTextColor};
    font-size:18px;
  }
`;

// Center Logo
const IronHacksCenterLogo = styled('div')`

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
              <span>IronHacks</span>
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