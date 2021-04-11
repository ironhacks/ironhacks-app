import { Component } from 'react'
import { Redirect, Switch, Route, withRouter } from 'react-router-dom'
import { Loader } from '../../components/loader/index'
import { AdminPageNavBreadcrumbs, AdminHackNav } from '../../components/admin'
import { Page, Section, Row, Col } from '../../components/layout'
import { AdminHack } from '../admin'

class AdminHackPage extends Component {
  constructor(props) {
    super(props)

    this.hackId = this.props.match.params.hackId
    this.baseUrl = this.props.match.url

    this.state = {
      hack: null,
      hackData: null,
      overview: '',
      hackTutorial: '',
      rules: '',
      hackName: '',
      hackId: this.hackId,
      loading: false,
    }
  }

  componentDidMount() {
    if (!this.props.location.state) {
      this.getHack(this.hackId)
    }
  }

  getHack = async (_hackId) => {
    let hackData = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(_hackId)
      .get()

    let adminHackData = await window.firebase
      .firestore()
      .collection('adminHackData')
      .doc(_hackId)
      .get()

    const result = Object.assign({}, { hackId: _hackId }, hackData.data(), adminHackData.data())

    this.setState({
      hack: result,
      hackData: result,
      hackName: result.name,
      rules: result.rules || '',
      overview: result.overview || '',
      hackExtensions: result.extensions ? result.extensions : {},
    })
  }

  render() {
    if (!this.props.userIsAdmin) {
      return <Redirect push to="/hacks" />
    } else {
      return (
        <Page pageClass="admin-page" user={this.props.user} userIsAdmin={this.props.userIsAdmin}>
          <Section sectionClass="container-fluid px-0" containerClass="flex px-0 mx-0 section_full">
            <AdminHackNav
              hackId={this.hackId}
              items={[
                { name: 'Settings', path: 'settings' },
                { name: 'Cohorts', path: 'cohorts' },
                { name: 'Registration', path: 'registration' },
                { name: 'Overview', path: 'overview' },
                { name: 'Results', path: 'results' },
                { name: 'Rules', path: 'rules' },
                { name: 'Submissions', path: 'submissions' },
                { name: 'Tasks', path: 'tasks' },
                { name: 'Tutorials', path: 'tutorials' },
                { name: 'Notes', path: 'notes' },
                { name: 'Banners', path: 'banners' },
                { name: 'Extensions', path: 'extensions' },
                // {name: 'Forums', path: 'forums'},
              ]}
            />

            <div className="admin-hack-content">
              {this.state.hack && (
                <AdminPageNavBreadcrumbs hackId={this.hackId} hackName={this.state.hack.name} />
              )}

              <Row rowClass="no-gutters py-2">
                <Col colClass="">
                  {this.state.hack && !this.state.loading ? (
                    <Switch>
                      {/* MAIN SETTINGS */}
                      <Route path={`${this.baseUrl}/settings`}>
                        <AdminHack.Settings
                          hackId={this.hackId}
                          hackData={this.state.hackData}
                          hackName={this.state.hackName}
                          hack={this.state.hack}
                          onSaveSettings={this.onSaveSettings}
                        />
                      </Route>

                      {/* BANNERS */}
                      <Route exact path={`${this.baseUrl}/banners`}>
                        <AdminHack.InfoBanners
                          hackId={this.hackId}
                          hackName={this.state.hackName}
                        />
                      </Route>
                      <Route path={`${this.baseUrl}/banners/:bannerId/edit`}>
                        <AdminHack.InfoBannersEdit
                          hackId={this.hackId}
                          hackName={this.state.hackName}
                        />
                      </Route>

                      {/* COHORTS */}
                      <Route path={`${this.baseUrl}/cohorts`}>
                        <AdminHack.Cohorts
                          hackId={this.hackId}
                          hackName={this.state.hackName}
                          hackData={this.state.hackData}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/extensions`}>
                        <AdminHack.Extensions
                          hackId={this.hackId}
                          hackName={this.state.hackName}
                          hack={this.state.hack}
                          data={this.state.hackExtensions}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/forums`}>
                        <AdminHack.Forum
                          hackId={this.hackId}
                          hackName={this.state.hackName}
                          forumIndex={0}
                          onNameChange={() => {
                            console.log('test')
                          }}
                          treatment={1}
                          onTreatmentChange={() => {
                            console.log('test2')
                          }}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/overview`}>
                        <AdminHack.Overview
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          previousDocument={this.state.overview}
                          hackSlug={this.state.hackData.hackSlug}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/registration`}>
                        <AdminHack.Registration
                          hackId={this.hackId}
                          hackName={this.state.hackName}
                          hackData={this.state.hackData}
                        />
                      </Route>

                      <Route exact path={`${this.baseUrl}/results`}>
                        <AdminHack.Results
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/results/:submissionId`}>
                        <AdminHack.ResultsEditor
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/rules`}>
                        <AdminHack.Rules
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                          previousDocument={this.state.rules}
                        />
                      </Route>

                      <Route exact path={`${this.baseUrl}/submissions`}>
                        <AdminHack.Submissions
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackData={this.state.hack}
                        />
                      </Route>

                      <Route exact path={`${this.baseUrl}/submissions/new`}>
                        <AdminHack.SubmissionNew
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackData={this.state.hack}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/submissions/edit/:submissionId`}>
                        <AdminHack.SubmissionEdit
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackData={this.state.hack}
                        />
                      </Route>
                      <Route exact path={`${this.baseUrl}/tasks`}>
                        <AdminHack.Tasks
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                          defaultTask={this.state.hackData.defaultTask}
                          displayOptions={this.state.hackData.displayOptions || false}
                        />
                      </Route>

                      <Route exact path={`${this.baseUrl}/tasks/new`}>
                        <AdminHack.TaskNew
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/tasks/:taskId/edit`}>
                        <AdminHack.TaskEdit
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                        />
                      </Route>

                      <Route exact path={`${this.baseUrl}/tutorials`}>
                        <AdminHack.Tutorials
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/tutorials/new`}>
                        <AdminHack.TutorialNew
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/tutorials/:tutorialId/edit`}>
                        <AdminHack.TutorialEdit
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                        />
                      </Route>

                      <Route exact path={`${this.baseUrl}/notes`}>
                        <AdminHack.Notes
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/notes/new`}>
                        <AdminHack.NotesNew
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
                          hackSlug={this.state.hackData.hackSlug}
                        />
                      </Route>

                      <Route path={`${this.baseUrl}/notes/:noteId/edit`}>
                        <AdminHack.NotesEdit
                          hackId={this.state.hackId}
                          hackName={this.state.hackName}
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
