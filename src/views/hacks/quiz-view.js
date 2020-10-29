import React from 'react';
import { QuizContainer } from '../../components/quiz/quiz-container';
import  { QuizNav } from '../../components/quiz/quiz-nav';
import { Section, Row, Col } from '../../components/layout';

class QuizView extends React.Component {
  constructor(props) {
    super(props);
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
            <QuizNav onNavItemClick={this.setQuizActive} />
          </Col>

          <Col colClass="flex-90p">
            <QuizContainer
              quizId={this.state.quizId}
              userEmail={this.state.userEmail}
              />
          </Col>
        </Row>
      </Section>
    );
  }
}

export default QuizView;
