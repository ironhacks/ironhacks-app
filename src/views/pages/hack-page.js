import React from 'react';
import Separator from '../../util/separator';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Breadcrumb } from 'react-bootstrap'
import { upperCaseWord } from '../../util/string-utils';
import { Page, Section, Row, Col } from '../../components/layout';
import { ProjectEditor } from '../../components/project';
import { HackNav } from '../../components/hacks';
import {
  ForumView,
  OverviewView,
  ProjectSelectView,
  QuizView,
  RegistrationView,
  ResultsView,
  TaskView,
  TutorialView,
} from '../hacks';
import ThreadViewWithRouter from '../forum/forum-thread-view';
import NewThread from '../forum/newThread.js';

class HackTitle extends React.Component {
  render() {
    return (
      <Row>
        <Col>
          <h2 className="pt-3">
            <span>{ this.props.hackName } </span>
            <span className="small">({ this.props.hackId })</span>
          </h2>
        </Col>
      </Row>
    )
  }
}

class HackNavSection extends React.Component {
  render() {
    return (
        <Row>
          <Col>
            <HackNav
              action={this.props.updateHackView}
              hackId={this.props.hackId}
            />
            <Separator primary />
          </Col>
        </Row>
      )
  }
}


function HackPageBreadCrumbs({props, hackId, hackName}) {
  let location = useLocation();
  const path = location.pathname.split('/');
  let currentPath = path.length >= 4 ? path.pop() : false;


  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/hacks">Hacks</Breadcrumb.Item>

      <Breadcrumb.Item href={`/hacks/${hackId}`}>
        {hackName}
      </Breadcrumb.Item>

      {currentPath && (
        <Breadcrumb.Item active>
          {upperCaseWord(currentPath)}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}


class HackPage extends React.Component {
  constructor(props) {
    super(props);

    this.hackId = this.props.match.params.hackId;
    this.hackName = this.props.match.params.hackName;

    console.log('hack id', this.hackId);

    this.state = {
      hackId: this.hackId,
      activeView: 'task',
      loading: true,
      hackPhases: [],
      hackTask: null,
    };

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
           hackOverview: hackData.overview ? hackData.overview.doc : '',
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
    this.props.history.push(`/hacks/${this.hackId}/${target}`);
    this.props.history.go(`/hacks/${this.hackId}/${target}`);
  }

  render() {
      return (
       <Page
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
          >

        <HackPageBreadCrumbs
          hackId={this.hackId}
          hackName={this.state.hackName}
        />

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

            <Route exact path="/hacks/:hackId">
              <Section>
                <HackNavSection
                  hackId ={this.hackId}
                  hackName={this.state.hackName}
                  updateHackView={this.updateHackView}
                />
              </Section>
            </Route>

            <Route path="/hacks/:hackId/*">
              <Section>
                <HackNavSection
                  hackId ={this.hackId}
                  hackName={this.state.hackName}
                  updateHackView={this.updateHackView}
                />
              </Section>
            </Route>
          </Switch>
        </Router>

        <Router>
          <Switch>
            <Route exact path="/hacks/:hackId">
              <Section>
                <OverviewView
                  hackId={this.hackId}
                  userId={this.props.userId}
                  document={this.state.hackOverview}
                />
              </Section>
            </Route>

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

            <Route exact path="/hacks/:hackId/quiz">
              <Section>
                <QuizView
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
              <Section sectionClass="results-section">
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
