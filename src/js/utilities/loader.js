// IronHacks Platform
// loader.js - This is just a css loader. Can be used on any container.
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';

const theme = Constants.LoaderTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.sectionBackgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled('div')`
  border: 16px solid ${props => props.theme.loaderBackgroundColor};
  border-radius: 50%;
  border-top: 16px solid ${props => props.theme.loaderFrontColor};
  width: 120px;
  height: 120px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;

  /* Safari */
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
class Loader extends React.Component {

  render() {
    return(
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <Spinner/>
        </SectionContainer>
      </ThemeProvider>
    )
  }
}

export default Loader;