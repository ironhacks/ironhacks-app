import React from 'react';
import styled from 'styled-components';
import {
  Link,
  // useLocation
} from 'react-router-dom';
import QuizView from '../quiz/quiz-view';
import { Section, Row, Col } from '../../components/layout';

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// let query = useQuery();
// let quizId = query.get('quizId');

const ButtonContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justifyContent: flex-start;
`;

const QuizButton = styled(Link)`
  text-decoration: none;
  justify-content: center;
  background-color: var(--color-primary);
  border-radius: 4px;
  color: black;
  min-height: 2em;
  margin-bottom: 15px;
  min-width: 180px;
  text-align: center;
  line-height: 1;
  padding: 0.6em;
`;

class QuizListView extends React.Component {
  constructor(props) {
    super(props);
    // this.hackId = this.props.match.params.quid;
    // this.hackId = this.props.match.params.hackId;
    let  { email: userEmail } = this.props.user;
    let quizId = this.getUrlQuizId();

    this.state = {
      quizId: quizId ? quizId : null,
      quizActive: false,
      userEmail: userEmail,
    }
    this.setQuizActive = this.setQuizActive.bind(this);
  }

  setQuizActive(event) {
    let _quizid = event.target.dataset.quizid;
    this.setState({
      quizId: _quizid
    })
  }

  getUrlQuizId() {
    let params = (new URL(document.location)).searchParams;
    return params.get('quizId');

  }
  render() {
    return (
      <Section>
        <Row flex={true}>
          <Col colClass="flex-10p">
            <ButtonContainer>
              <QuizButton onClick={this.setQuizActive} data-quizid="html_css" to='?quizId=html_css'>HTML & Css</QuizButton>
              <QuizButton onClick={this.setQuizActive} data-quizid="bootstrap" to='?quizId=bootstrap'>Bootstrap</QuizButton>
              <QuizButton onClick={this.setQuizActive} data-quizid="javascript_jquery" to='?quizId=javascript_jquery'>Javascript & Jquery</QuizButton>
              <QuizButton onClick={this.setQuizActive} data-quizid="google_maps" to='?quizId=google_maps'>Google Maps API</QuizButton>
              <QuizButton onClick={this.setQuizActive} data-quizid="d3" to='?quizId=d3'>D3.js</QuizButton>
            </ButtonContainer>
          </Col>

          <Col colClass="flex-90p">
            <QuizView
              quizId={this.state.quizId}
              userEmail={this.state.userEmail}
              />
          </Col>
        </Row>
      </Section>
    );
  }
}

export default QuizListView;
