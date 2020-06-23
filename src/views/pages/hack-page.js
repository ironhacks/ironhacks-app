import React from 'react';
import Separator from '../../util/separator';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Page, Section, Row, Col } from '../../components/layout';
import { ProjectEditor } from '../../components/project';
import { HackNav } from '../../components/hacks';
import {
  TutorialView,
  TaskView,
  ProjectSelectView,
  QuizListView,
  ResultsView,
  ForumView,
} from '../hacks';
import ThreadViewWithRouter from '../forum/forum-thread-view';
import NewThread from '../forum/newThread.js';

// import { Loader } from '../../components/loader';



class HackPage extends React.Component {
  constructor(props) {
    super(props);

    this.hackId = this.props.match.params.hackId;
    this.hackName = this.props.match.params.hackName;
    const hackDataPromise = this.getHack(this.hackId);

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

    this.updateHackView = this.updateHackView.bind(this);
    this.getHack = this.getHack.bind(this);
  }

  componentDidMount() {
    console.log('%c HackPage is mounted', 'color:red;font-weight:bold');
    this.setHackTask();
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
    window.firebase.functions().useFunctionsEmulator('http://localhost:5001')
    const getTask = window.firebase.functions().httpsCallable('getTaskDoc');
    let task = await getTask({
      hackId: hackId,
    })

    return task.data;
  }

  setHackTask() {
    const hackTaskPromise = this.getHackTask(this.hackId);
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
    console.log('update view', this, this.context, target);
    this.setState({
      activeView: target
    })
    this.props.history.push(`./${target}`)
    this.props.history.go(`./${target}`)
  }

  // if (this.state.loading) {
  //   return (
  //     <Section>
  //     <Loader status={this.state.status} />
  //     </Section>
  //   )
  // } else {
  render() {
      return (
       <Page
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
          >
        <Section>
          <Row>
            <Col>
              <h2 className="pt-3">
                <strong>Hack: </strong>
                <span>{ this.state.hackName } </span>
                <span className="small">({ this.hackId })</span>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <HackNav
                action={this.updateHackView}
                hackId={this.hackId}
              />
              <Separator primary />
            </Col>
          </Row>
        </Section>

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
