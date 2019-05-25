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
    border: none;
  }

  button {
    display: ${(props) => props.showReturnButton};
    margin-top: 30px;
  }
`;

const quizzesURLS = {
  bootstrap: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_ai47Laj9EM1n433',
  html_css: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_0l9UUOmgB2TCZ1P',
  javascript_jquery: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_1Xkpq23Qu5j7P01',
  d3: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_0ep4CDeW4BYTckR',
  google_maps: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_eEe3JnzCkS2ppnn',
}

class QuizFrom extends React.Component {
  constructor(props){ 
    super(props);
    this.state = {
      showReturnButton: 'none',
      mustNavigate: false,
      user: this.props.user,
      quiz: quizzesURLS[props.match.params.quizName],
    }
  }
  
  componentDidMount() {
    window.addEventListener("message", this.recieveMessage)
  }

  recieveMessage = (event) => {
    if(event.data === 'quizDone'){
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
          <iframe title='quizForm' src={`${this.state.quiz}?user_email=${this.state.user.email}`}/>
          <Button width='30%' onClick={this.goToMenu} primary>Return to quizzes menu</Button>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default QuizFrom;
