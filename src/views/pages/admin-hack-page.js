import React from 'react';
import { Redirect, Link, Switch, Route, withRouter, useLocation } from 'react-router-dom';
import { Loader } from '../../components/loader/index';
import { upperCaseWord } from '../../util/string-utils';
import { Page, Section, Row, Col } from '../../components/layout';
import { Breadcrumb } from 'react-bootstrap'
import {
  AdminHackForum,
  AdminHackSettings,
  AdminHackSurveys,
  AdminHackOverview,
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
      overview_md: '',
      hackTutorial: '',
      hackId: _hackId,
      loading: false,
    }

    this.updateOverviewState = this.updateOverviewState.bind(this)
    this.updateHackOverview = this.updateHackOverview.bind(this)
    this.onTaskMarkdownUpdate = this.onTaskMarkdownUpdate.bind(this)
    this.onTutorialChange = this.onTutorialChange.bind(this)
    this.updateTutorialDocument = this.updateTutorialDocument.bind(this)
    this.updateTaskDocument = this.updateTaskDocument.bind(this)
    this.updateQualtricsLinks = this.updateQualtricsLinks.bind(this)

    this.getHack = this.getHack.bind(this)
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

    const result = Object.assign({},
      { hackId: _hackId },
      hackData.data(),
      adminHackData.data()
    )

    console.log('result', result);

    this.setState({
      hack: result,
      hackData: result,
      hackTutorial: result.tutorial ? this.decodeDocument(result.tutorial.doc) : '',
      hackTask: result.task ? this.decodeDocument(result.task.doc) : '',
      hackOverview: result.overview ? this.decodeDocument(result.overview.doc) : '',
    })
  }


  // HACK TUTORIAL
  // --------------------------------------------
  onTutorialChange(md) {
    this.setState({hackTutorial: md})
  }

  updateTutorialDocument() {
    this.setState({loading: true})

    const hackRef = window.firebase.firestore()
      .collection('hacks')
      .doc(this.state.hackId)

    const hackTutorial = this.encodeDocument(this.state.hackTutorial);
    let timeUpdated = new Date();

    hackRef.update({
      tutorial: {
        doc: hackTutorial,
        updated: timeUpdated.toISOString(),
      }
    })
    .then(() => {
      this.setState({ loading: false});
    })
    .catch(function(error) {
        console.error('Error adding document: ', error);
    });
  }

  // HACK TASK
  // --------------------------------------------
  onTaskMarkdownUpdate(markdown) {
    this.setState({hackTask: markdown })
  }

  updateTaskDocument() {
    this.setState({
      loading: true
    })

    const hackRef = window.firebase.firestore()
      .collection('hacks')
      .doc(this.state.hackId)

    let encodedTask = this.encodeDocument(this.state.hackTask);
    let timeUpdated = new Date();

    hackRef.update({
        task: {
          updated: timeUpdated.toISOString(),
          doc: encodedTask,
        }
      })
      .then(() => {
        this.setState({loading: false})
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }

  // HACK OVERVIEW
  // --------------------------------------------
  updateOverviewState(markdown) {
    this.setState({overview_md: markdown})
  }

  updateHackOverview() {
    this.setState({
      loading: true
    })

    const hackRef = window.firebase.firestore()
      .collection('hacks')
      .doc(this.state.hackId)

    let encodedDoc = this.encodeDocument(this.state.overview_md);
    let timeUpdated = new Date();

    hackRef.update({
      overview: {
        doc: encodedDoc,
        updated: timeUpdated.toISOString(),
      }
    })
    .then(() => {
      this.setState({
        loading: false,
        hackOverview: this.state.overview_md,
      })
    })
    .catch((error)=>{
      console.error('Error adding document: ', error);
    })
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

  encodeDocument(str) {
    let safeString = unescape(encodeURIComponent(str));
    return window.btoa(safeString);
  }

  decodeDocument(enc) {
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
                    <AdminHackOverview
                      previousDocument={this.state.hackOverview}
                      onEditorUpdate={this.updateOverviewState}
                      updateDocument={this.updateHackOverview}
                    />
                  </Route>

                  <Route path={this.props.match.url + '/task'}>
                    <AdminHackTask
                      previousDocument={this.state.hackTask}
                      onTaskMarkdownUpdate={this.onTaskMarkdownUpdate}
                      updateTaskDocument={this.updateTaskDocument}
                    />
                  </Route>

                  <Route path={this.props.match.url + '/tutorials'}>
                    <AdminHackTutorial
                      previousDocument={this.state.hackTutorial}
                      onDocumentChange={this.onTutorialChange}
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
