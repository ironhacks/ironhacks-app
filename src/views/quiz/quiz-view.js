import React from 'react';
import styled from 'styled-components';
// import Button from '../../util/button.js';

const StyledQuizContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
  overflow: auto;

  iframe {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    padding: 0;
    margin: 0;
  }
`;


function QuizContainer({quizId, userEmail }) {
  const quizUrls = {
    bootstrap: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_ai47Laj9EM1n433',
    html_css: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_0l9UUOmgB2TCZ1P',
    javascript_jquery: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_1Xkpq23Qu5j7P01',
    d3: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_0ep4CDeW4BYTckR',
    google_maps: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_eEe3JnzCkS2ppnn',
  };

  let quizUrl = '';
  if (Object.keys(quizUrls).indexOf(quizId) >= 0){
    quizUrl = quizUrls[`${quizId}`]
  }

  if (!quizUrl){
    return (
      <div>
        <h3>Select a quiz from the menu</h3>
      </div>
    )
  }

  return (
    <StyledQuizContainer>
      <iframe
        title='quizForm'
        src={`${quizUrl}?user_email=${userEmail}`}
      />
    </StyledQuizContainer>

  )
}


class QuizView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mustNavigate: false,
      quizId: this.props.quizId || null,
      userEmail: 'test',
    }
  }

  // componentDidMount() {
  //   window.addEventListener('message', this.recieveMessage);
  // }

  // recieveMessage(event) {
  //   if (event.data === 'quizDone') {
  //     this.setState({ showReturnButton: 'block' })
  //   }
  // }

  goToMenu() {
    this.setState({ mustNavigate: true })
  }

  render() {
    return (
      <QuizContainer
        quizId={this.props.quizId}
        userEmail={this.props.userEmail}
      />
    )
  }
}

export default QuizView;
