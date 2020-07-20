import React from 'react';
import Separator from '../../util/separator';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Breadcrumb } from 'react-bootstrap'
import { upperCaseWord } from '../../util/string-utils';
import { Page, Section, Row, Col } from '../../components/layout';
import { ProjectEditor } from '../../components/project';
import { HackNav } from '../../components/hacks';
import { Hack } from '../hacks';
import ThreadViewWithRouter from '../forum/forum-thread-view';
import NewThread from '../forum/newThread.js';
import { CountdownTimer } from '../../components/timer';

class HackNavSection extends React.Component {
  render() {
    return (
        <Row>
          <Col>
            <HackNav
              hackDisplayOptions={this.props.hackDisplayOptions}
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

        let upcomingEvent = this.getUpcomingHackEvent(hackData)
        console.log('event', upcomingEvent);
        this.setState({
          hackData: hackData,
          hackName: hackData.name,
          hackDisplayOptions: hackData.displayOptions,
          hackExtensions: hackData.extensions ? hackData.extensions : false,
          hackPhases: hackData.phases,
          hackRules:  hackData.rules ? hackData.rules.doc : '',
          hackResults: hackData.results,
          hackBanner: hackData.hackBannerImg ? hackData.hackBannerImg : false,
          hackRegistration: hackData.registrationSurvey ? hackData.registrationSurvey : '',
          hackOverview: hackData.overview ? hackData.overview.doc : '',
          hackTask: hackData.task ? hackData.task.doc : '',
          hackTutorial: hackData.tutorial ? hackData.tutorial.doc : '',
          upcomingEvent: upcomingEvent,
        })
      } else {
        return false;
      }
    })
  }

  getUpcomingHackEvent(hackData) {
    let startDate = hackData.startDate;
    if (startDate && Date.parse(startDate) > Date.now()) {
      return {
        date: startDate,
        name: 'Opening Date',
      }
    } else {
      return false;
    }
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

        {this.state.upcomingEvent && (
          <div className="event-countdown">
            <span>Upcoming: {this.state.upcomingEvent.name}</span>
            <CountdownTimer
              endTime={this.state.upcomingEvent.date}
            />
          </div>
        )}

        <Router>
          <Switch>
            <Route exact path="/hacks/:hackId/register">
              <Section sectionClass="py-3">
                <Hack.Registration
                  hackId ={this.hackId}
                  hackName={this.state.hackName}
                  hackRegistration={this.state.hackRegistration}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId">
              {this.state.hackBanner && (
                <Section sectionClass="py-3">
                  <Row>
                    <img src={this.state.hackBanner} alt='Hack Banner Img'/>
                  </Row>
                </Section>
              )}

              {this.state.hackDisplayOptions && (
              <Section>
                <HackNavSection
                  hackId ={this.hackId}
                  hackDisplayOptions={this.state.hackDisplayOptions}
                  hackName={this.state.hackName}
                  updateHackView={this.updateHackView}
                />
              </Section>
              )}
            </Route>

            <Route path="/hacks/:hackId/*">
              <Section>
                <HackNavSection
                  hackId ={this.hackId}
                  hackDisplayOptions={this.state.hackDisplayOptions}
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
                <Hack.Overview
                  hackId={this.hackId}
                  userId={this.props.userId}
                  document={this.state.hackOverview}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/calendar">
              <Section>
                <Hack.Calendar
                  data={this.state.hackExtensions}
                  hackId={this.hackId}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/forum">
              <Section>
                <Hack.Forum
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
                <Hack.Quiz
                  hackId={this.hackId}
                  userId={this.props.userId}
                  user={this.props.user}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/projects">
              <Section>
                <Hack.ProjectSelect
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
                <Hack.Results
                  hackData={this.state.hackData}
                  hackPhases={this.state.hackPhases}
                  hackResults={this.state.hackResults}
                  hackUser={this.props.user}
                  hackUserId={this.props.userId}
                  hackId={this.hackId}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/rules">
              <Section sectionClass="rules-section">
                <Hack.Rules
                  hackId={this.hackId}
                  userId={this.props.userId}
                  content={this.state.hackRules}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/task">
              <Section>
                <Hack.Task
                  hackId={this.hackId}
                  userId={this.props.userId}
                  task={this.state.hackTask}
                />
                </Section>
              </Route>

            <Route exact path="/hacks/:hackId/tutorial">
              <Section>
                <Hack.Tutorial
                  hackid={this.hackId}
                  userId={this.props.userId}
                  hackTutorial={this.state.hackTutorial}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackId/submit">
              <Section>
                <Hack.Submit
                  hackId={this.hackId}
                  userId={this.props.userId}
                  hackData={this.state.hackData}
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
