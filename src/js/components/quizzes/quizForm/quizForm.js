// IronHacks Platform
// quizzes.js - Quiz picker and visualizer
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../../constants.js';

const theme = Constants.AppSectionTheme;
//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};

  iframe {
    width: 100%;
    height: 100%;
  }
`;

class QuizFrom extends React.Component {
  
  componentDidMount() {
    window.addEventListener("message", this.recieveMessage)
  }

  recieveMessage = (event) => {
    console.log(event)
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <iframe src='https://purdue.ca1.qualtrics.com/jfe/form/SV_ai47Laj9EM1n433?user_email=pepito'/>
        </SectionContainer> 
      </ThemeProvider>
    );
  }
}

export default QuizFrom;