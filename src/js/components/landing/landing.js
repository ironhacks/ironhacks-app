// IronHacks Platform
// landing.js - Landing page
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
`;

class Landing extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <h1>Imagine this is a Lading Page</h1>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default Landing;