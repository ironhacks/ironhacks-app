// IronHacks Platform
// landing.js - Landing page
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from 'react-router-dom';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
//Customs svg
import bulbImg from './img/bulb.svg';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: 100vh;
  background-color: ${Constants.mainBgColor};
`;
const HomeTitle = styled('div')`
  width: 100%;
  height: 20%;
  position: relative;
  display: flex;
  top: 30%;

  img { 
    width: 100%;
    height: auto;
  }
`;
const HomeText = styled('div')`
  width: 60%;
  height 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  h1 {  
    font-size: 60px;
    font-weight: 900;
    line-height: 40px;
  }

  h1 span {
    font-weight: 300;
  }

  h2 {
    font-weight: 300;
  }

  @media (max-width: 1312px) {
    h1 {
      line-height: 50px;
    }
  }
`;
//Sign up / signin buttons
const LoginButton = styled(Link)`
  padding: 10px 10px;
  margin-right: 4px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  color: black;
  background-color: none;
  border: 2px solid black;
  trasition: color: 0.5s;

  &:hover {
    background-color: ${props => props.theme.hoverTextColor};
    color: ${Constants.invertedHighlightedTextColor};
    text-decoration: none;
  }
`;

class Landing extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <HomeTitle className='row'>
            <HomeText className='col-md-6 offset-md-2 col-sm-12'>
              <h1><span>PURDUE </span>IRONHACKS</h1>
              <h2>Hack for innovation and join the open data movement.</h2>
              <div>
                <LoginButton to='/login?mode=select'>Sign up here now</LoginButton>
                <LoginButton to='/login'>Sign in</LoginButton>
              </div>
            </HomeText>
            <div className='col-md-2 col-sm-12'>
              <img src={bulbImg} alt='searchIcon'/>
            </div>
          </HomeTitle>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default Landing;