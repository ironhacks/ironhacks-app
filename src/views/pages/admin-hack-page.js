import { Component } from 'react';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import { Loader } from '../../components/loader/index';
import { AdminPageNavBreadcrumbs, AdminHackNav } from '../../components/admin';
import { Page, Section, Row, Col } from '../../components/layout';
import { AdminHack } from '../admin';

class AdminHackPage extends Component {
  constructor(props) {
    super(props);

    const _hackId = this.props.match.params.hackId;
    this.baseUrl = this.props.match.url
    this.hackId = _hackId;

    this.state = {
      hack: null,
      hackData: null,
      overview: '',
      hackTutorial: '',
      rules: '',
      hackId: _hackId,
      loading: false,
    }
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.getHack(this.hackId);
    }
  }

  getHack = async _hackId => {
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
      rules: result.rules || '',
      overview: result.overview || '',
      hackExtensions: result.extensions ? result.extensions : {},
    })
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

        <Section
          sectionClass='container-fluid px-0'
          containerClass="flex px-0 mx-0 section_full"
        >
          <AdminHackNav
            hackId={this.hackId}
            items={[
              {name: 'Settings', path: 'settings'},
              {name: 'Cohorts', path: 'cohorts'},
              {name: 'Registration', path: 'registration'},
              {name: 'Forums', path: 'forums'},
              {name: 'Overview', path: 'overview'},
              {name: 'Results', path: 'results'},
              {name: 'Rules', path: 'rules'},
              {name: 'Submissions', path: 'submissions'},
              {name: 'Tasks', path: 'tasks'},
              {name: 'Tutorials', path: 'tutorials'},
              {name: 'Extensions', path: 'extensions'},
            ]}
          />

          <div className="admin-hack-content">
            {this.state.hack && (
              <AdminPageNavBreadcrumbs
                hackId={this.hackId}
                hackName={this.state.hack.name}
              />
            )}

            <Row rowClass='no-gutters py-2'>
              <Col colClass="">
              {this.state.hack && !this.state.loading ? (
                <Switch>
                  <Route path={`${this.baseUrl}/settings`}>
                    <AdminHack.Settings
                      hackId={this.hackId}
                      hackData={this.state.hackData}
                      hack={this.state.hack}
                      onSaveSettings={this.onSaveSettings}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/cohorts`}>
                    <AdminHack.Cohorts
                      hackId={this.hackId}
                      hackData={this.state.hackData}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/extensions`}>
                    <AdminHack.Extensions
                      hack={this.state.hack}
                      data={this.state.hackExtensions}
                      hackId={this.hackId}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/forums`}>
                    <AdminHack.Forum
                      hackId={this.hackId}
                      forumIndex={0}
                      onNameChange={()=>{console.log('test')}}
                      treatment={1}
                      onTreatmentChange={()=>{console.log('test2')}}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/overview`}>
                    <AdminHack.Overview
                      previousDocument={this.state.overview}
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/registration`}>
                    <AdminHack.Registration
                      hackId={this.hackId}
                      hackData={this.state.hackData}
                    />
                  </Route>

                  <Route exact path={`${this.baseUrl}/results`}>
                    <AdminHack.Results
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/results/:submissionId`}>
                    <AdminHack.ResultsEditor
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/rules`}>
                    <AdminHack.Rules
                      previousDocument={this.state.rules}
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Route exact path={`${this.baseUrl}/submissions`}>
                    <AdminHack.Submissions
                      hackData={this.state.hack}
                      hackId={this.state.hackId}
                    />
                  </Route>

                  <Route exact path={`${this.baseUrl}/submissions/new`}>
                    <AdminHack.SubmissionNew
                      hackData={this.state.hack}
                      hackId={this.state.hackId}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/submissions/edit/:submissionId`}>
                    <AdminHack.SubmissionEdit
                      hackData={this.state.hack}
                      hackId={this.state.hackId}
                    />
                  </Route>
                  <Route exact path={`${this.baseUrl}/tasks`}>
                    <AdminHack.Tasks
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                      defaultTask={this.state.hackData.defaultTask}
                      displayOptions={this.state.hackData.displayOptions || false}
                    />
                  </Route>

                  <Route exact path={`${this.baseUrl}/tasks/new`}>
                    <AdminHack.TaskNew
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/tasks/:taskId/edit`}>
                    <AdminHack.TaskEdit
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Route exact path={`${this.baseUrl}/tutorials`}>
                    <AdminHack.Tutorials
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/tutorials/new`}>
                    <AdminHack.TutorialNew
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Route path={`${this.baseUrl}/tutorials/:tutorialId/edit`}>
                    <AdminHack.TutorialEdit
                      hackId={this.state.hackId}
                      hackSlug={this.state.hackData.hackSlug}
                    />
                  </Route>

                  <Redirect push to={`/admin/hacks/${this.hackId}/settings`} />

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
