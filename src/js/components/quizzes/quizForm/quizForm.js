// IronHacks Platform
// quizzes.js - Quiz picker and visualizer
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';

import { Redirect } from 'react-router-dom';
//Custom Constants
import * as Constants from '../../../../constants.js';
import Button from '../../../utilities/button.js';

const theme = Constants.AppSectionTheme;
//Section container
const SectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  overflow: auto;

  iframe {
    width: 100%;
    height: 80%;
  }

  button {
    display: ${(props) => props.showReturnButton};
    margin-top: 30px;
  }
`;

class QuizFrom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showReturnButton: 'none',
      mustNavigate: false,
    }
  }
  
  componentDidMount() {
    window.addEventListener("message", this.recieveMessage)
  }

  recieveMessage = (event) => {
    console.log(event)
    if(event.data == 'quizDone'){
      this.setState({showReturnButton: 'block'});
    }
  }

  goToMenu = () => {
    this.setState({mustNavigate: true});
  }

  render() {
    if(this.state.mustNavigate){
      return(
        <Redirect push to='/quizzes'/>
      )
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer showReturnButton={this.state.showReturnButton}>
          <iframe src='https://purdue.ca1.qualtrics.com/jfe/form/SV_ai47Laj9EM1n433?user_email=pepito'/>
          <Button width='30%' onClick={this.goToMenu} primary>Return to quizzes menu</Button>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default QuizFrom;