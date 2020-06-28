import React from 'react';
import Separator from '../../util/separator';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Page, Section, Row, Col } from '../../components/layout';
import { ProjectEditor } from '../../components/project';
import { HackNav } from '../../components/hacks';
import {
  ForumView,
  ProjectSelectView,
  QuizListView,
  RegistrationView,
  ResultsView,
  TaskView,
  TutorialView,
} from '../hacks';
import ThreadViewWithRouter from '../forum/forum-thread-view';
import NewThread from '../forum/newThread.js';

// import { Loader } from '../../components/loader';

class HackNavSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section>
        <Row>
          <Col>
            <h2 className="pt-3">
              <strong>Hack: </strong>
              <span>{ this.props.hackName } </span>
              <span className="small">({ this.props.hackId })</span>
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <HackNav
              action={this.props.updateHackView}
              hackId={this.props.hackId}
            />
            <Separator primary />
          </Col>
        </Row>
      </Section>
    )
  }
}

class HackPage extends React.Component {
  constructor(props) {
    super(props);

    this.hackId = this.props.match.params.hackId;
    this.hackName = this.props.match.params.hackName;

    this.state = {
      hackId: this.hackId,
      activeView: 'task',
      loading: true,
      hackPhases: [],
      hackTask: null,
    };

    // Promise.resolve(hackDataPromise).then((hackData) => {
    //    this.hackData = hackData;
    //    this.hackName = hackData.name;
    //    this.state.hackPhases = hackData.phases
    //    this.state.hackTutorial = hackData.tutorial.doc;
    //    this.state.hackName = hackData.name;
    //    this.state.hackData =  hackData;
    // })
    this.getHack(this.hackId);

    this.updateHackView = this.updateHackView.bind(this);
    this.getHack = this.getHack.bind(this);
  }

  componentDidMount() {
    console.log('%c HackPage is mounted', 'color:red;font-weight:bold');
  }

  async getHack(hackId) {
    let hack = await window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .get();

    Promise.resolve(hack).then((result) => {
      if (result.exists) {
        const hackData = result.data();
        this.setState({
           hackData: hackData,
           hackName: hackData.name,
           hackPhases: hackData.phases,
           hackResults: hackData.results,
           hackRegistration: hackData.registrationSurvey ? hackData.registrationSurvey : '',
           hackTask: hackData.task ? hackData.task.doc : '',
           hackTutorial: hackData.tutorial ? hackData.tutorial.doc : '',
        })
      } else {
        return false;
      }
    })
  }

  setHack(hackData) {
    if (hackData) {
      this.setState({
        hackData: hackData,
        loading: false,
      })
    }
  }

  async getHackTask(hackId) {
    console.log('get hack task', hackId);
    // window.firebase.functions().useFunctionsEmulator('http://localhost:5001')
    const getTask = window.firebase.functions().httpsCallable('getTaskDoc');

    let hackTaskPromise = await getTask({
      hackId: hackId,
    })

    Promise.resolve(hackTaskPromise).then((hackTask) => {
      if (hackTask.length > 0) {
        this.setState({
          hackTask: hackTask,
          loading: false,
        })
      }
    })
  }

  updateHackView(target) {
    this.setState({
      activeView: target
    });
    this.props.history.push(`./${target}`);
    this.props.history.go(`./${target}`);
  }

  render() {
      return (
       <Page
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
          >

        <Router>
          <Switch>
            <Route exact path="/hacks/:hackId/register">
              <Section sectionClass="py-3">
                <RegistrationView
                  hackId ={this.hackId}
                  hackName={this.state.hackName}
                  hackRegistration={this.state.hackRegistration}
                />
              </Section>
            </Route>
            <Route path="/hacks/:hackId/*">
              <HackNavSection
                hackName={this.state.hackName}
                updateHackView={this.updateHackView}
                hackId ={this.hackId}
              />
            </Route>
          </Switch>
        </Router>

        <Router>
          <Switch>
            <Route exact path="/hacks/:hackId/task">
            <Section>
              <TaskView
                hackId={this.hackId}
                userId={this.props.userId}
                task={this.state.hackTask}
              />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/tutorial">
              <Section>
                <TutorialView
                  hackid={this.hackId}
                  userId={this.props.userId}
                  hackTutorial={this.state.hackTutorial}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/forum">
              <Section>
                <ForumView
                  isAdmin={this.props.userIsAdmin}
                  hackId={this.hackId}
                  userId={this.props.userId}
                  user={this.props.user}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/forum/new">
              <Section>
                <NewThread
                  isAdmin={this.props.userIsAdmin}
                  hackId={this.hackId}
                  userId={this.props.userId}
                  user={this.props.user}
                />
              </Section>
            </Route>

            <Route path="/hacks/:hackId/forum/thread/:threadId">
              <Section>
                <ThreadViewWithRouter
                  isAdmin={this.props.userIsAdmin}
                  hackId={this.hackId}
                  userId={this.props.userId}
                  user={this.props.user}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/quizzes">
              <Section>
                <QuizListView
                  hackId={this.hackId}
                  userId={this.props.userId}
                  user={this.props.user}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/projects">
              <Section>
                <ProjectSelectView
                  hackId={this.hackId}
                  user={this.props.user}
                  userId={this.props.userId}
                  hackData={this.state.hackData}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/projects/:projectName">
              <Section
                sectionClass="section_full"
                containerClass="w-full max-w-none"
              >
                <ProjectEditor
                  hackId={this.hackId}
                  hackData={this.state.hackData}
                  user={this.props.user}
                  userId={this.props.userId}
                  userIsAdmin={this.props.userIsAdmin}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/results">
              <Section>
                <ResultsView
                  hackData={this.state.hackData}
                  hackPhases={this.state.hackPhases}
                  hackResults={this.state.hackResults}
                  hackUser={this.props.user}
                  hackUserId={this.props.userId}
                  hackId={this.hackId}
                />
              </Section>
            </Route>
          </Switch>
        </Router>
      </Page>
      )
    }
}

export default withRouter(HackPage)
