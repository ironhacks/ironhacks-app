// IronHacks Platform
// admin.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom components
import HackCard from './hackCard.js';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};

  h1 {
  margin-bottom: 20px;

    &:first-child {
      margin-top: 150px;
    }
  }
`;
const Separator = styled('div')`
  width: 100%;
  height: 1px;
  background-color: ${Constants.mainBgColor};
  margin: 5px 0 5px 0;
`;
const CardsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  margin-top: 70px;
`;

class Admin extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
      <SectionContainer className="container-fluid">
        <div className="row">
          <div className='col-md-8 offset-md-2'>
          	<h1>Welcome to IronHacks Platform!</h1>
            <span>Belllow you will find all the availabe hacks, click on one of them to see more details.</span>
            <Separator/>
            <CardsContainer>
              <HackCard newHack={true}/>
              <HackCard/>
              <HackCard/>
              <HackCard/>
            </CardsContainer>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default Admin;