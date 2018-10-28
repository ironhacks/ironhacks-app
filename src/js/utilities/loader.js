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
  height: ${props => props.small ? '50%' : '100%'};
  background-color: ${props => {
    if(props.backgroundColor){
      return props.backgroundColor;
    }else{
      return props.theme.sectionBackgroundColor;
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled('div')`
  border: ${props => props.small ? '8px' : '16px'} solid ${props => props.theme.loaderBackgroundColor};
  border-radius: 50%;
  border-top: ${props => props.small ? '8px' : '16px'} solid ${props => props.dark ? props.theme.loaderFrontColorDark : props.theme.loaderFrontColor };
  width: ${props => props.small ? '40px' : '120px'};
  height: ${props => props.small ? '40px' : '120px'};
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
        <SectionContainer backgroundColor={this.props.backgroundColor ? this.props.backgroundColor : null} small={this.props.small}>
          <Spinner
            dark={this.props.dark}
            small={this.props.small}/>
        </SectionContainer>
      </ThemeProvider>
    )
  }
}

export default Loader;