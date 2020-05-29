import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Redirect, useLocation } from 'react-router-dom';
import { Theme } from '../../theme';
import Button from '../../util/button.js';

const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
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
};

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function QueryParamsDemo() {
  let query = useQuery();

  return (
    <div>
      <div>
        <Child name={query.get("quizId")} />
      </div>
    </div>
  );
}


function Child({ name }) {
  return (
    <div>
      {name ? (
        <h3>
          The <code>quizId</code> in the query string is &quot;{name}
          &quot;
        </h3>
      ) : (
        <h3>There is no name in the query string</h3>
      )}
    </div>
  );
}


class QuizView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReturnButton: 'flex',
      mustNavigate: false,

      // user: this.props.user,
      quizId: this.props.quizId || null,
      quiz: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_ai47Laj9EM1n433',
      user: {
        email: 'test',
      },
    };
  }
  //
  // componentDidMount() {
  //   window.addEventListener('message', this.recieveMessage);
  // }
  //
  // recieveMessage(event) {
  //   if (event.data === 'quizDone') {
  //     this.setState({ showReturnButton: 'block' })
  //   }
  // };

  goToMenu() {
    this.setState({ mustNavigate: true })
  }

  render() {
    if (this.state.mustNavigate) {
      return <Redirect push to='/quiz' />
    }

    return (
      <ThemeProvider theme={styles}>
        <SectionContainer showReturnButton={this.state.showReturnButton}>

          <QueryParamsDemo />

          <Button width='30%' onClick={this.goToMenu} primary>
            Return to quizzes menu
          </Button>

          <iframe
            title='quizForm'
            src={`${this.state.quiz}?user_email=${this.state.user.email}`}
          />

        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default QuizView;
