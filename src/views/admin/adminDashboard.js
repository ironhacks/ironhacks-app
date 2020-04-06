import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link, Switch, Route } from 'react-router-dom';
import QualtricsIntegrationSection from './sections/qualtricsIntegration/qualtricsIntegrationSection.js';
import SettingsSection from './sections/settings/admSettingsSection.js';
import TutorialSection from './sections/tutorial/admTutorialSection.js';
import { Loader } from '../../components/loader/index';
import { Theme } from '../../theme';
import TaskSection from './sections/task/admTaskSection.js';
import SettingsIcon from '../../assets/svg/settings-icon.svg';
import HouseIcon from '../../assets/svg/home-icon.svg';

const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};

  .full-height {
    height: 100%;
  }

  .overflow {
    overflow: auto;
  }
`;

const ControlPanel = styled('div')`
  height 100%;
  max-height: 100%;
  border-right: 1px solid black;
  overflow: auto;
`;

const ControlPanelItem = styled('div')`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  padding-left: 15px;
  transition: color 0.5s, background-color 0.5s;

  &:hover {
    background-color: gray;
    color: ${colors.mainBgColor};
  }

  &:first-child {
    margin-top: 70px;
    border-top: 1px solid black;
    justify-content: space-around;
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

const VerticalSeparator = styled('div')`
  width: 2px;
  height: 25px;
  background-color: black;
`;

const SectionHeader = styled('div')`
  min-height: 140px;
  padding: 25px 50px 50px 50px;
  border-bottom: 1px solid black;
`;

const SectionBody = styled('div')`
  overflow: auto;
`;

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hack: null,
      hackId: '',
      loading: false,
    };
  }

  componentDidMount() {
    // Check if there is a hack instance on the component state, if not, ask for it.
    if (!this.props.location.state) {
      this.getHack();
    } else {
      this.setState({
        hack: this.props.location.state.hack,
        hackId: this.props.location.state.hackId,
      });
    }
  }

  getHack = async () => {
    // db Reference
    const firestore = window.firebase.firestore();
    const _this = this;
    // Updating the current hack:
    firestore
      .collection('hacks')
      .where('name', '==', this.props.match.params.hackId)
      .limit(1)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const hackData = doc.data();
          const hackId = doc.id;
          firestore
            .collection('adminHackData')
            .doc(hackId)
            .get()
            .then(function(doc) {
              hackData.whiteList = doc.data().whiteList;
              hackData.task = doc.data().task;
              _this.setState({ hack: hackData, hackId: hackId });
            });
        });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };
  // --------------------------- SETTINGS SECTION ----------------------------//
  // This function handle the whitelist update.
  onSaveSettings = (whiteList) => {
    this.updateHackSettings(whiteList);
  };

  updateHackSettings = (whiteList) => {
    this.setState({ loading: true });
    // db Reference
    const firestore = window.firebase.firestore();
    const _this = this;
    // Updating the whiteList collection:
    const batch = firestore.batch();
    whiteList.forEach((email) => {
      const data = {
        whiteList: window.firebase.firestore.FieldValue.arrayUnion(
          _this.state.hackId
        ),
      };
      const whiteListDoc = firestore.collection('whitelists').doc(email);
      batch.set(whiteListDoc, data, { merge: true });
    });
    // Adding whiteList cross reference to the hack object on firebase:
    const hackWhiteListObject = {
      whiteList: whiteList,
    };
    const hackRef = firestore
      .collection('adminHackData')
      .doc(this.state.hackId);
    batch.set(hackRef, hackWhiteListObject, { merge: true });
    batch
      .commit()
      .then(() => {
        this.setState((prevState, props) => {
          prevState.hack.whiteList = whiteList;
          return { hack: prevState.hack, loading: false };
        });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };
  // --------------------------- SETTIGS SECTION ----------------------------//
  // --------------------------- TUTORIAL SECTION ----------------------------//
  // This function handle the tutorial docuement update.
  onTutorialMarkdownUpdate = (markdown) => {
    this.setState({ tutorialMarkdown: markdown });
  };

  updateTutorialDocument = () => {
    this.setState({ loading: true });
    // db Reference
    const firestore = window.firebase.firestore();
    // Updating the current hack:
    const hackRef = firestore.collection('hacks').doc(this.state.hackId);
    const hackTutorial = this.state.hack.tutorial;
    hackTutorial.doc = this.utoa(this.state.tutorialMarkdown);
    hackRef
      .update({
        tutorial: hackTutorial,
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };
  // --------------------------- TUTORIAL SECTION ----------------------------//
  // --------------------------- TASK SECTION ----------------------------//
  // This function handle the tutorial docuement update.
  onTaskMarkdownUpdate = (markdown) => {
    this.setState({ taskMarkdown: markdown });
  };

  updateTaskDocument = () => {
    this.setState({ loading: true });
    // db Reference
    const firestore = window.firebase.firestore();
    // Updating the current hack:
    const hackRef = firestore
      .collection('adminHackData')
      .doc(this.state.hackId);
    const hackTask = this.state.hack.task;
    hackTask.doc = this.utoa(this.state.taskMarkdown);
    hackRef
      .update({
        task: hackTask,
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };
  // --------------------------- TASK SECTION ----------------------------//
  // --------------------------- QUALTRICS SECTION ----------------------------//
  updateQualtricsLinks = (updatedHackData) => {
    this.setState({ loading: true });
    // db Reference
    const firestore = window.firebase.firestore();
    // Updating the current hack:
    const hackRef = firestore.collection('hacks').doc(this.state.hackId);
    hackRef
      .update({
        phases: updatedHackData.phases,
        registrationSurvey: updatedHackData.registrationSurvey || '',
        postHackSurvey: updatedHackData.postHackSurvey || '',
        quizzes: updatedHackData.quizzes || null,
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };
  // --------------------------- QUALTRICS SECTION ----------------------------//
  // --------------------------- MARKDOWN UTILITIES --------------------------//
  // ucs-2 string to base64 encoded ascii
  utoa = (str) => {
    return window.btoa(unescape(encodeURIComponent(str)));
  };
  // base64 encoded ascii to ucs-2 string
  atou = (str) => {
    return decodeURIComponent(escape(window.atob(str)));
  };
  // --------------------------- MARKDOWN UTILITIES --------------------------//

  render() {
    return (
      <ThemeProvider theme={styles}>
        <SectionContainer className='container-fuild'>
          <div className='row no-gutters full-height'>
            <ControlPanel className='col-md-2'>
              <ControlPanelItem>
                <img src={HouseIcon} alt='Home' />
                <span>Project Overview </span>
                <VerticalSeparator />
                <Link
                  to={
                    '/admin/dashboard/' +
                    this.props.match.params.hackId +
                    '/settings/'
                  }
                >
                  <img src={SettingsIcon} alt='Settings' />
                </Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link
                  to={
                    '/admin/dashboard/' +
                    this.props.match.params.hackId +
                    '/settings/'
                  }
                >
                  Whitelist
                </Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link
                  to={
                    '/admin/dashboard/' +
                    this.props.match.params.hackId +
                    '/forums/'
                  }
                >
                  Forums
                </Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link
                  to={
                    '/admin/dashboard/' +
                    this.props.match.params.hackId +
                    '/qualtrics-integration/'
                  }
                >
                  Qualtrics Integration
                </Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link
                  to={
                    '/admin/dashboard/' +
                    this.props.match.params.hackId +
                    '/tutorial/'
                  }
                >
                  Tutorial
                </Link>
              </ControlPanelItem>
              <ControlPanelItem>
                <Link
                  to={
                    '/admin/dashboard/' +
                    this.props.match.params.hackId +
                    '/task/'
                  }
                >
                  Task
                </Link>
              </ControlPanelItem>
            </ControlPanel>
            <div className='col-md-10 full-height'>
              <div className='d-flex flex-column full-height'>
                <SectionHeader className='row no-gutters'>
                  <div className='col-md-12'>
                    <h2>
                      {this.state.hack ? this.state.hack.name : 'Loading'}
                    </h2>
                    <span>Hack Dashboard</span>
                  </div>
                </SectionHeader>
                <div className='row no-gutters flex-grow-1 overflow'>
                  <SectionBody className='col-md-12'>
                    {this.state.hack && !this.state.loading ? (
                      <Switch>
                        <Route
                          path={this.props.match.url + '/settings'}
                          render={() => (
                            <SettingsSection
                              hack={this.state.hack}
                              onSaveSettings={this.onSaveSettings}
                            />
                          )}
                        />
                        <Route
                          path={this.props.match.url + '/tutorial'}
                          render={() => (
                            <TutorialSection
                              previousDocument={
                                this.state.hack.tutorial
                                  ? this.atou(this.state.hack.tutorial.doc)
                                  : ''
                              }
                              onTutorialMarkdownUpdate={
                                this.onTutorialMarkdownUpdate
                              }
                              updateTutorialDocument={
                                this.updateTutorialDocument
                              }
                            />
                          )}
                        />
                        <Route
                          path={this.props.match.url + '/task'}
                          render={() => (
                            <TaskSection
                              previousDocument={
                                this.state.hack.task
                                  ? this.atou(this.state.hack.task.doc)
                                  : ''
                              }
                              onTaskMarkdownUpdate={this.onTaskMarkdownUpdate}
                              updateTaskDocument={this.updateTaskDocument}
                            />
                          )}
                        />
                        <Route
                          path={this.props.match.url + '/qualtrics-integration'}
                          render={() => (
                            <QualtricsIntegrationSection
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
            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdminDashboard;
