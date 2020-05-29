import React from 'react';
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import { HackNav } from './hack-nav';
import Separator from '../../util/separator';
import { Loader } from '../../components/loader';
import { withRouter } from 'react-router';
// import ThreadViewWithRouter from '../forum/threadView/threadView';
import TutorialScreen from '../tutorial';
import ExamplesPage from '../examples';
import Forum from '../forum/forum.js';
// import NewThread from '../forum/newThread.js';
import ProjectsPage from  '../projects';
import TaskView from '../task';
import { ResultsView } from '../results';
import QuizListView from '../quiz/quiz-list-view';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useParams,
  // useRouteMatch
} from 'react-router-dom';
import { Theme } from '../../theme';

// const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;
// const units = Theme.UNITS;

const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};

  h1 {
    margin-bottom: 20px;

    &:first-child {
      margin-top: 100px;
    }
  }

  .empty-list {
    color: gray;
    font-style: italic;
  }

  overflow: auto;
`;

class HackPage extends React.Component {
  constructor(props) {
    super(props);

    this.hackId = this.props.match.params.hackId;

    const hackDataPromise = this.getHack(this.hackId);

    this.state = {
      hackUserId: null,
      hackId: this.hackId,
      activeView: 'task',
      user: this.props.user,
      loading: false,
      hackPhases: [],
      hackTask: null,
    };


    Promise.resolve(hackDataPromise).then((hackData) => {
       this.hackData = hackData;
       this.hackName = hackData.name;
       this.state.hackPhases = hackData.phases
       this.state.hackTutorial = hackData.tutorial.doc;
       this.state.hackData =  hackData;
    });
  }

  componentDidMount() {
    this.setHackTask();
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  // }

  // componentWillUnmount() {
  // }


  // Query all the hacks objects from the db.
  async getHack(hackId) {
    let hack = await window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .get();

    if (hack.exists) {
      var hackData = hack.data();
      return hackData;
    }

    return false;
  }

  setHack(hackData) {
    if (hackData) {
      this.setState({
        hackData: hackData,
        loading: false,
      });
    }
  }

  async getHackTask(hackId) {
    const getTask = window.firebase.functions().httpsCallable('getTaskDoc');
    let task = await getTask({
      hackId: hackId,
    })
    return task.data.task;
  }

  setHackTask() {
    const hackTaskPromise = this.getHackTask(this.hackId);
    Promise.resolve(hackTaskPromise).then((hackTask) => {
      if (hackTask.length > 0) {
        this.setState({
          hackTask: hackTask,
          loading: false,
        });
      }
    });
  }

  setCurrentHack(_hack_id) {
    // const { cookies } = this.props;
    // cookies.set('currentHack', _hack_id);
  };

  updateHackView(target) {
    console.log('update view', this, target);
    // this.setState({'activeView': target})

  }

  render() {
    return (
        <ThemeProvider theme={styles}>
        <SectionContainer className='container-fluid'>
          {this.state.loading ? (
            <Loader status={this.state.status} />
          ) : (
            <div className='row'>
              <div className='col-md-8 offset-md-2'>
                <Separator primary />
                <h2>
                   <strong>Hack: </strong>
                   <span>{ this.hackName } </span>
                   <span className="small">({ this.hackId })</span>
                  </h2>
                  <Separator />

                  <HackNav action={this.updateHackView}/>

                  <Separator primary />
                  <Router>
                    <div>
                    <Switch>
                      <Route exact path="/hacks/:hackId/task">
                        <h3>About</h3>
                        <TaskView hackid={this.hackId} task={this.state.hackTask}  />
                      </Route>

                      <Route exact path="/hacks/:hackId/forum">
                        <h3>Forum</h3>
                        <Forum/>
                      </Route>

                      <Route exact path="/hacks/:hackId/tutorial">
                        <h3>Tutorial</h3>
                        <TutorialScreen
                          hackid={this.hackId}
                          tutorial={this.state.hackTutorial} />
                      </Route>

                      <Route exact path="/hacks/:hackId/examples">
                        <h3>Examples</h3>
                        <ExamplesPage />
                      </Route>

                      <Route exact path="/hacks/:hackId/quiz">
                        <h3>Quiz</h3>
                        <QuizListView />
                      </Route>

                      <Route exact path="/hacks/:hackId/projects">
                        <h3>Projects</h3>
                        <ProjectsPage
                          hackId={this.hackId}
                          user={this.props.user}
                          hackData={this.state.hackData}
                        />
                      </Route>

                      <Route exact path="/hacks/:hackId/results">
                        <h3>Results</h3>
                        <ResultsView
                          hackData={this.state.hackData}
                          hackPhases={this.state.hackPhases}
                          hackUser={this.props.user}
                          hackUserId={this.props.userId}
                          hackId={this.hackId}
                        />
                      </Route>
                    </Switch>
                    </div>
                  </Router>
                </div>
              </div>
            )
          }
        </SectionContainer>
      </ThemeProvider>
    )
  }
}

export default withCookies(withRouter(HackPage))
