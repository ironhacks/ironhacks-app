import React from 'react';
import styled from 'styled-components';
import { Redirect, Link, Switch, Route, withRouter } from 'react-router-dom';
import { Theme } from '../../theme';
import { Loader } from '../../components/loader/index';
import { Page, Section, Row, Col } from '../../components/layout';
import {
  AdminHackForum,
  AdminHackSettings,
  AdminHackSurveys,
  AdminHackTutorial,
  AdminHackTask,
} from '../admin';

const colors = Theme.COLORS;

const ControlPanel = styled('div')`
  height 100%;
  margin-top: 1em;
  max-height: 100%;
  border-right: 1px solid black;
  overflow: auto;
`;

const ControlPanelItem = styled('div')`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,.5);
  padding-left: 15px;
  transition: color 0.5s, background-color 0.5s;

  &:hover {
    background-color: gray;
    color: ${colors.mainBgColor};
  }

  img {
    width: 25px;
    height: 25px;

    &:first-child {
      margin-right: 10px;
    }

    &:last-child {
      margin-left: 10px;
    }
  }
`;

const SectionHeader = styled('div')`
  padding: 1em 1em 1em 1em;
  border-bottom: 1px solid black;
`;

const SectionBody = styled('div')`
  overflow: auto;
`;

class AdminHackNav extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `/admin/hacks/${this.props.hackId}`;
  }

  render() {
    return (
      <ControlPanel className='admin-sidebar col-md-2'>

        <Link to={`${this.baseUrl}/settings`} className="nav-item">
          <ControlPanelItem>
              Settings
          </ControlPanelItem>
        </Link>

        <Link to={`${this.baseUrl}/forums`} className="nav-item">
          <ControlPanelItem>
            Forums
          </ControlPanelItem>
        </Link>

        <Link to={`${this.baseUrl}/qualtrics-integration`} className="nav-item">
          <ControlPanelItem>
            Surveys
          </ControlPanelItem>
        </Link>

        <Link to={`${this.baseUrl}/tutorial`} className="nav-item">
          <ControlPanelItem>
            Tutorial
          </ControlPanelItem>
        </Link>

        <Link to={`${this.baseUrl}/task`} className="nav-item">
          <ControlPanelItem>
            Task
          </ControlPanelItem>
        </Link>
      </ControlPanel>
    )
  }
}

class AdminHackPage extends React.Component {
  constructor(props) {
    super(props);

    const _hackId = this.props.match.params.hackId;

    this.hackId = _hackId;

    this.state = {
      hack: null,
      hackData: null,
      hackId: _hackId,
      loading: false,
    }

    this.onTaskMarkdownUpdate = this.onTaskMarkdownUpdate.bind(this)
    this.onTutorialMarkdownUpdate = this.onTutorialMarkdownUpdate.bind(this)
    this.updateTutorialDocument = this.updateTutorialDocument.bind(this)
    this.updateTaskDocument = this.updateTaskDocument.bind(this)
    this.getHack = this.getHack.bind(this);
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.getHack(this.hackId);
    } else {
      // this.setState({
      //    hack: this.props.location.state.hack,
      // })
    }
  }

  async getHack(_hackId) {
    let hackData = await window.firebase.firestore()
      .collection('hacks')
      .doc(_hackId)
      .get();

    let adminHackData = await window.firebase.firestore()
      .collection('adminHackData')
      .doc(_hackId)
      .get()

    console.log('hackData', hackData.data());

    const result = Object.assign({},
      { hackId: _hackId },
      hackData.data(),
      adminHackData.data()
    )

    console.log('result', result);

    this.setState({
      hack: result,
      hackData: result,
      hackTask: result.task.doc,
    })
  }


  onTutorialMarkdownUpdate(markdown) {
    this.setState({
      tutorialMarkdown: markdown
    })
  }

  updateTutorialDocument() {
    this.setState({
      loading: true
    })

    const hackRef = window.firebase.firestore()
      .collection('hacks')
      .doc(this.state.hackId)

    const hackTutorial = this.state.hack.tutorial;

    hackTutorial.doc = this.utoa(this.state.tutorialMarkdown);

    hackRef.update({
        tutorial: hackTutorial,
      })
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }

  onTaskMarkdownUpdate(markdown) {
    this.setState({
      taskMd: markdown
    })
  }

  // async getHackTask(hackId) {
  //   const getTask = window.firebase.functions().httpsCallable('getTaskDoc');
  //   let hackTaskPromise = await getTask({
  //     hackId: hackId,
  //   })
  //
  //   Promise.resolve(hackTaskPromise).then((hackTask) => {
  //     if (hackTask.length > 0) {
  //       this.setState({
  //         hackTask: hackTask,
  //         loading: false,
  //       })
  //     }
  //   })
  // }

  updateTaskDocument() {
    this.setState({
      loading: true
    })

    const hackRef = window.firebase.firestore()
      .collection('hacks')
      .doc(this.state.hackId)


    console.log('update task', this.state.taskMd);
    let encodedTask = this.encodeTask(this.state.taskMd);
    let timeUpdated = new Date();

    hackRef.update({
        task: {
          updated: timeUpdated.toISOString(),
          doc: encodedTask,
        }
      })
      .then(() => {
        this.setState({
          loading: false,
          hackTask: encodedTask,
        })
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }

  updateQualtricsLinks(updatedHackData) {
    this.setState({ loading: true })

    const hackRef = window.firebase.firestore()
      .collection('hacks')
      .doc(this.hackId)

    hackRef.update({
        phases: updatedHackData.phases,
        registrationSurvey: updatedHackData.registrationSurvey || '',
        postHackSurvey: updatedHackData.postHackSurvey || '',
        quizzes: updatedHackData.quizzes || null,
      })
      .then(() => {
        this.setState({
          loading: false
        })
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      })
  }

  encodeTask(str) {
    console.log('encodeTask', str);
    let safeString = unescape(encodeURIComponent(str));
    return window.btoa(safeString);
  }


  decodeTask(enc) {
    console.log('decodeTask', enc);
    let decoded = window.atob(enc);
    return decodeURIComponent(escape(decoded));
  }

  render() {
    if (!this.props.userIsAdmin) {
      return (<Redirect push to='/hacks'/>)
    } else {
      return (
        <Page
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
        >

        <Section sectionClass='container-fluid' containerClass="flex">
          <AdminHackNav
            hackId={this.hackId}
          />

          <Row rowClass='row no-gutters full-height flex-row'>
            <Col className='col-md-10 full-height'>
              <div className='d-flex flex-column full-height'>

                <SectionHeader className='row no-gutters'>
                  <div className='col-md-12'>
                    <h2 className="h2">
                      Hack: {this.state.hack ? this.state.hack.name : 'Loading'}
                    </h2>
                  </div>
                </SectionHeader>

                <div className='row no-gutters flex-grow-1 overflow'>
                  <SectionBody className='col-md-12'>
                    {this.state.hack && !this.state.loading ? (
                      <Switch>

                        <Route path={this.props.match.url + '/settings'}>
                          <AdminHackSettings
                            hackId={this.hackId}
                            hackData={this.state.hackData}
                            hack={this.state.hack}
                            onSaveSettings={this.onSaveSettings}
                          />
                        </Route>

                        <Route path={this.props.match.url + '/task'}>
                            <AdminHackTask
                              previousDocument={
                                this.state.hackTask
                                  ? this.decodeTask(this.state.hackTask)
                                  : ''
                              }
                              onTaskMarkdownUpdate={this.onTaskMarkdownUpdate}
                              updateTaskDocument={this.updateTaskDocument}
                            />
                        </Route>

                        <Route
                          path={this.props.match.url + '/tutorial'}
                          render={() => (
                            <AdminHackTutorial
                              previousDocument={
                                this.state.hack.tutorial
                                  ? this.decodeTask(this.state.hack.tutorial.doc)
                                  : ''
                              }
                              onTutorialMarkdownUpdate={this.onTutorialMarkdownUpdate}
                              updateTutorialDocument={this.updateTutorialDocument}
                              />
                            )}
                          />

                        <Route path={this.props.match.url + '/forums'}>
                          <AdminHackForum
                            hackId={this.hackId}
                            forumIndex={0}
                            onNameChange={()=>{console.log('test')}}
                            treatment={1}
                            onTreatmentChange={()=>{console.log('test2')}}
                          />
                        </Route>

                        <Route
                          path={this.props.match.url + '/qualtrics-integration'}
                          render={() => (
                            <AdminHackSurveys
                              hack={this.state.hack}
                              onUpdate={this.updateQualtricsLinks}
                            />
                          )}
                        />
                      </Switch>
                    ) : (
                      <Loader />
                    )}
                  </SectionBody>
                </div>
              </div>
            </Col>
          </Row>
        </Section>
      </Page>
    )
  }
  }
}

export default withRouter(AdminHackPage)
