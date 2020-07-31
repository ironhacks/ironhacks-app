import React from 'react';
import { Redirect, Link, Switch, Route, withRouter, useLocation } from 'react-router-dom';
import { Loader } from '../../components/loader/index';
import { upperCaseWord } from '../../util/string-utils';
import { Page, Section, Row, Col } from '../../components/layout';
import { Breadcrumb } from 'react-bootstrap'
import { AdminHack } from '../admin';
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
      rules_md: '',
      hackId: _hackId,
      loading: false,
    }

    this.updateQualtricsLinks = this.updateQualtricsLinks.bind(this)
    this.getHack = this.getHack.bind(this)
  }

  componentDidMount() {
    if (!this.props.location.state) {
      console.log('getting hack');
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

    this.setState({
      hack: result,
      hackData: result,
      hackRules: result.rules ? this.decodeDocument(result.rules.doc) : '',
      hackTutorial: result.tutorial ? this.decodeDocument(result.tutorial.doc) : '',
      hackTask: result.task ? this.decodeDocument(result.task.doc) : '',
      hackOverview: result.overview ? this.decodeDocument(result.overview.doc) : '',
      hackExtensions: result.extensions ? result.extensions : {},
    })
  }

  // HACK SURVEYS
  // --------------------------------------------
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
              {name: 'Registration', path: 'registration'},
              {name: 'Forums', path: 'forums'},
              {name: 'Overview', path: 'overview'},
              {name: 'Rules', path: 'rules'},
              {name: 'Submissions', path: 'submissions'},
              {name: 'Surveys', path: 'surveys'},
              {name: 'Task', path: 'task'},
              {name: 'Tutorials', path: 'tutorials'},
              {name: 'Extensions', path: 'extensions'},
            ]}
          />

          <div className="admin-hack-content">
            <Row rowClass='no-gutters py-2'>
              <Col colClass="">
              {this.state.hack && !this.state.loading ? (
                <Switch>
                  <Route path={this.props.match.url + '/settings'}>
                    <AdminHack.Settings
                      hackId={this.hackId}
                      hackData={this.state.hackData}
                      hack={this.state.hack}
                      onSaveSettings={this.onSaveSettings}
                    />
                  </Route>

                  <Route path={this.props.match.url + '/registration'}>
                    <AdminHack.Registration
                      hackId={this.hackId}
                      hackData={this.state.hackData}
                    />
                  </Route>

                  <Route path={this.props.match.url + '/forums'}>
                    <AdminHack.Forum
                      hackId={this.hackId}
                      forumIndex={0}
                      onNameChange={()=>{console.log('test')}}
                      treatment={1}
                      onTreatmentChange={()=>{console.log('test2')}}
                    />
                  </Route>

                  <Route path={this.props.match.url + '/overview'}>
                    <AdminHack.Overview
                      previousDocument={this.state.hackOverview}
                      hackId={this.state.hackId}
                    />
                  </Route>

                  <Route path={this.props.match.url + '/task'}>
                    <AdminHack.Task
                      previousDocument={this.state.hackTask}
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>


                  <Route path={this.props.match.url + '/tutorials'}>
                    <AdminHack.Tutorial
                      previousDocument={this.state.hackTutorial}
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Route path={this.props.match.url + '/rules'}>
                    <AdminHack.Rules
                      previousDocument={this.state.hackRules}
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Route path={this.props.match.url + '/surveys'}>
                    <AdminHack.Surveys
                      hack={this.state.hack}
                      onUpdate={this.updateQualtricsLinks}
                    />
                  </Route>

                  <Route path={this.props.match.url + '/submissions'}>
                    <AdminHack.Submissions
                      hackData={this.state.hack}
                      hackId={this.state.hackId}
                    />
                  </Route>

                  <Route path={this.props.match.url + '/extensions'}>
                    <AdminHack.Extensions
                      hack={this.state.hack}
                      data={this.state.hackExtensions}
                      hackId={this.hackId}
                    />
                  </Route>

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
