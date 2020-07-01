import React from 'react';
import { Redirect, Link, Switch, Route, withRouter, useLocation } from 'react-router-dom';
import { Loader } from '../../components/loader/index';
import { Page, Section, Row, Col } from '../../components/layout';
import { Breadcrumb } from 'react-bootstrap'
import {
  AdminHackForum,
  AdminHackSettings,
  AdminHackSurveys,
  AdminHackTutorial,
  AdminHackTask,
} from '../admin';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../styles/css/admin.css';


class AdminHackNav extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = `/admin/hacks/${this.props.hackId}`;
  }

  render() {
    return (
      <div className='admin-sidebar col-md-2'>
        {this.props.items.map((item, index)=>(
          <Link
            key={index}
            to={`${this.baseUrl}/${item.path}`}
            className="nav-item"
            >

            <div className="admin-sidebar__item">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

AdminHackNav.defaultProps = {
  items: [],
}

function upperCaseWord(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function AdminPageBreadCrumbs({props, hackId, hackName}) {
  let location = useLocation();
  const path = location.pathname.split('/');
  let currentPath = path.length >= 5 ? path.pop() : false;


  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>

      <Breadcrumb.Item href={`/admin/hacks/${hackId}`}>
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
          pageClass="admin-page"
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
        >

      {this.state.hack && !this.state.loading && (
        <AdminPageBreadCrumbs
          hackId={this.hackId}
          hackName={this.state.hack.name}
        />
      )}

        <Section sectionClass='container-fluid' containerClass="flex">
          <AdminHackNav
            hackId={this.hackId}
            items={[
              {name: 'Settings', path: 'settings'},
              {name: 'Forums', path: 'forums'},
              {name: 'Surveys', path: 'surveys'},
              {name: 'Tutorials', path: 'tutorials'},
              {name: 'Task', path: 'task'},
              {name: 'Overview', path: 'overview'},
            ]}
          />

          <div className="admin-hack-content">
            <Row rowClass='no-gutters py-2'>
              <Col colClass="">
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

                  <Route path={this.props.match.url + '/overview'}>
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

                  <Route path={this.props.match.url + '/tutorials'}>
                    <AdminHackTutorial
                      previousDocument={
                        this.state.hack.tutorial
                          ? this.decodeTask(this.state.hack.tutorial.doc)
                          : ''
                      }
                      onTutorialMarkdownUpdate={this.onTutorialMarkdownUpdate}
                      updateTutorialDocument={this.updateTutorialDocument}
                    />
                  </Route>

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
                      path={this.props.match.url + '/surveys'}
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
              </Col>
            </Row>
          </div>
        </Section>
      </Page>
    )
  }
  }
}

export default withRouter(AdminHackPage)
