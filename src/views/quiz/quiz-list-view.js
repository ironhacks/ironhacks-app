// quizzes.js - Quiz picker and visualizer

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { Theme } from '../../theme';

import QuizView from './quiz-view';


const styles = Theme.STYLES.QuizViewStyles;
const colors = Theme.COLORS;
const units = Theme.UNITS;

// Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
`;

const ButtonContainer = styled('div')`
  width: 100%
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  overflow: auto;
`;

const QuizButton = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.mainBgColor};
  border-radius: ${units.universalBorderRadius};
  color: black;
  width: 50%;
  height: 35px;
  margin-bottom: 15px;
`;

class QuizListView extends React.Component {
  constructor(props) {
    super(props);
    // this.hackId = this.props.match.params.quid;
    // this.hackId = this.props.match.params.hackId;
    this.state = {
      quizId: null,
      quizActive: false,
    }
    this.setQuizActive = this.setQuizActive.bind(this);
  }


  setQuizActive(event) {
    let _quizid = event.target.dataset.quizid;
    this.setState({
      quizId: _quizid
    })
  }

  render() {
    return (
      <ThemeProvider theme={styles}>
        <SectionContainer className='container-fluid'>
          <div className='row'>
            <ButtonContainer className='col-4 offset-4'>
              <QuizButton onClick={this.setQuizActive} data-quizid="html_css" to='?quizId=html_css'>HTML & Css</QuizButton>
              <QuizButton onClick={this.setQuizActive} data-quizid="bootstrap" to='?quizId=bootstrap'>Bootstrap</QuizButton>
              <QuizButton onClick={this.setQuizActive} data-quizid="javascript_jquery" to='?quizId=javascript_jquery'>Javascript & Jquery</QuizButton>
              <QuizButton onClick={this.setQuizActive} data-quizid="google_maps" to='?quizId=google_maps'>Google Maps API</QuizButton>
              <QuizButton onClick={this.setQuizActive} data-quizid="d3" to='?quizId=d3'>D3.js</QuizButton>
            </ButtonContainer>
          </div>

          <QuizView quizId={this.state.quizId} />

        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default QuizListView;
