import { Component } from 'react';
import { OverlayLoaderContainer, Loader } from '../../components/loader';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Page, Section, Row } from '../../components/layout';
import { HackNav, HackPageBreadCrumbs } from '../../components/hacks';
import { Hack } from '../hacks';
import ThreadView from '../forum/thread-view';
import ThreadEditView from '../forum/post-edit-view';
import NewThread from '../forum/new-thread';
import { CountdownTimer } from '../../components/timer';
import { fire2Ms } from '../../util/date-utils'
import { InfoBanner }  from '../../components/info-banner'

const HackNavSection = ({
    hackDisplayOptions,
    hackId,
    hackSlug,
  }) => {
  return (
    <Row>
      <HackNav
        hackDisplayOptions={hackDisplayOptions}
        hackId={hackId}
        hackSlug={hackSlug}
      />
    </Row>
  );
};


class HackPage extends Component {
  constructor(props) {
    super(props);

    this.hackSlug = this.props.match.params.hackSlug;

    this.state = {
      hackId: null,
      status: 'loading',
      activeView: 'task',
      loading: true,
      userCohort: null,
      hackBanner: null,
    }

  }

  componentDidMount(){
    this.getHack(this.hackSlug)
  }

  getHackBanners = async (hackId) => {
    let timeNow = new Date()
    let snap = await window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('banners')
      .where('active', '==', true)
      .where('ends_at', '>', timeNow)
      .get()

    let banners = []
    snap.docs.forEach((banner, index) => {
      banners.push({
        bannerId: banner.id,
        ...banner.data()
      })
    })

    banners.sort((a,b)=> {return fire2Ms(a.starts_at) - fire2Ms(b.starts_at)})

    if (banners.length > 0) {
      this.setState({hackBanner: banners[0]})
    }
  }

  getHack = async hackSlug => {
    let hacks = await window.firebase.firestore()
      .collection('hacks')
      .where('hackSlug', '==', hackSlug)
      .get()

    // GET HACK BY SLUG
    if (hacks.docs[0].exists) {
      let hackData = hacks.docs[0].data()
      let hackId = hacks.docs[0].id;

      this.getHackBanners(hackId)

      // GET USER COHORT
      let doc = await window.firebase.firestore()
        .collection('hacks')
        .doc(hackId)
        .collection('registration')
        .doc('cohorts')
        .get()

      let cohortList = doc.data()
      let cohortId = null
      if (cohortList) {
        for(let cohort of Object.keys(cohortList)) {
          if (cohortList[cohort].includes(this.props.userId)) {
            cohortId = cohort
          }
        }
      }

      this.setState({userCohort: cohortId})

      let upcomingEvent = this.getUpcomingHackEvent(hackData)

      let hackSettings  = {
        hackId: hackId,
        hackData: hackData,
        bannerImg: hackData.hackBannerImg ? hackData.hackBannerImg : false,
        displayOptions: hackData.displayOptions,
        extensions: hackData.extensions ? hackData.extensions : false,
        name: hackData.name,
        overview: hackData.overview || '',
        registration: hackData.registrationSurvey ? hackData.registrationSurvey : '',
        results: hackData.results,
        rules:  hackData.rules || '',
        task: hackData.defaultTask ? hackData.defaultTask.name : null,
        upcomingEvent: upcomingEvent,
      }

      if ('taskEnabled' in hackData.displayOptions) {
        hackSettings.taskPublished = hackData.displayOptions.taskEnabled
      } else {
        hackSettings.taskPublished = false
      }

      // GET COHORT OVERRIDE SETTINGS
      let cohortSettingsDoc = await window.firebase.firestore()
        .collection('hacks')
        .doc(hackId)
        .collection('registration')
        .doc('settings')
        .get()

      let cohortSettings = cohortSettingsDoc.data()
      let userCohortSettings = {}

      if (cohortSettings && cohortId in cohortSettings) {
        userCohortSettings = cohortSettings[cohortId].properties
          if ('task' in userCohortSettings) {
          hackSettings.task = userCohortSettings.task.name
        }
      }

      this.setState({
        hackId: hackSettings.hackId,
        hackData: hackSettings.hackData,
        bannerImg: hackSettings.bannerImg,
        displayOptions: hackSettings.displayOptions,
        extensions: hackSettings.extensions,
        name: hackSettings.name,
        overview: hackSettings.overview,
        registration: hackSettings.registration,
        results: hackSettings.results,
        rules:  hackSettings.rules,
        task: hackSettings.task,
        taskPublished: hackSettings.taskPublished,
        upcomingEvent: hackSettings.upcomingEvent,
      })
    }
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

  render() {
    if (!this.state.hackId) {
      return  (
        <OverlayLoaderContainer>
          <Loader status={this.state.status} />
        </OverlayLoaderContainer>
      )
    }

    return (
       <Page
          pageTitle={`IronHacks | ${this.state.name} Hack Page`}
          pageDescription="IronHacks Hack Event Page"
          pageUrl={`https://ironhacks.com/hacks/${this.hackSlug}`}
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
          >

        {/* PAGE BREADCRUMB NAVIGATION */}
        <Section sectionClass="mb-0 bg-grey-dk4 cl-white">
          <Row>
            <HackPageBreadCrumbs
              hackSlug={this.hackSlug}
              hackName={this.state.name}
            />
          </Row>
        </Section>

        {/* HACK INFO BANNER */}
        {this.state.hackBanner && (
          <InfoBanner
            content={this.state.hackBanner.content}
            color={this.state.hackBanner.color}
            bg_color={this.state.hackBanner.bg_color}
          />
        )}

        <div className="py-2"/>

        {this.state.upcomingEvent && (
          <div className="event-countdown" style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <span>Upcoming: <strong>{this.state.upcomingEvent.name}</strong></span>

            <div style={{
              margin: '0 .5em',
            }}>
              <CountdownTimer
                endTime={this.state.upcomingEvent.date}
              />
            </div>
          </div>
        )}

          {/* UNREGISTERED PATHS */}
          <Switch>
            {/* REGISTRATION PAGE */}
            <Route exact path="/hacks/:hackId/register">
              <Section sectionClass="py-3">
                <Hack.Registration
                  userEmail={this.props.user.email}
                  userId={this.props.userId}
                  hackSlug={this.hackSlug}
                  hackId={this.state.hackId}
                  hackName={this.state.name}
                  hackDocument={this.state.overview}
                  hackBannerImg={this.state.bannerImg}
                  hackRegistration={this.state.registration}
                />
              </Section>
            </Route>

            {/* OVERVIEW PAGE */}
            <Route exact path="/hacks/:hackId">
              {this.state.bannerImg && (
                <Section sectionClass="py-2">
                  <Row>
                    <img src={this.state.bannerImg} alt='Hack Banner Img'/>
                  </Row>
                </Section>
              )}

              {this.state.displayOptions && (
              <Section>
                <HackNavSection
                  hackSlug={this.hackSlug}
                  hackId ={this.state.hackId}
                  hackDisplayOptions={this.state.displayOptions}
                  hackName={this.state.name}
                />
              </Section>
              )}
            </Route>

            <Route path="/hacks/:hackId/*">
              <Section>
                <HackNavSection
                  hackId ={this.state.hackId}
                  hackSlug={this.hackSlug}
                  hackDisplayOptions={this.state.displayOptions}
                  hackName={this.state.name}
                />
              </Section>
            </Route>
          </Switch>

          {/* REGISTERED PATHS */}
          <Switch>
            {/* OVERVIEW */}
            <Route exact path="/hacks/:hackId">
              <Section>
                <Hack.Overview
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                  document={this.state.overview}
                />
              </Section>
            </Route>

            {/* CALENDAR */}
            <Route exact path="/hacks/:hackId/calendar">
              <Section>
                <Hack.Calendar
                  data={this.state.extensions}
                  hackId={this.state.hackId}
                />
              </Section>
            </Route>

            {/* FORUM */}
            <Route exact path="/hacks/:hackSlug/forum">
              <Section>
                <Hack.Forum
                  userIsAdmin={this.props.userIsAdmin}
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                  user={this.props.user}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackSlug/forum/:forumId/:threadId/edit">
              <Section>
                <ThreadEditView
                  userIsAdmin={this.props.userIsAdmin}
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                  user={this.props.user}
                />
              </Section>
            </Route>

            <Route path="/hacks/:hackSlug/forum/:forumId/:threadId">
              <Section>
                <ThreadView
                  userIsAdmin={this.props.userIsAdmin}
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                  user={this.props.user}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackSlug/forum/new">
              <Section>
                <NewThread
                  userIsAdmin={this.props.userIsAdmin}
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                  user={this.props.user}
                />
              </Section>
            </Route>

            {/* RESULTS DASHBOARD */}
            <Route exact path="/hacks/:hackSlug/results">
              <Section sectionClass="results-section">
                <Hack.Results
                  hackData={this.state.hackData}
                  user={this.props.user}
                  userId={this.props.userId}
                  hackId={this.state.hackId}
                />
              </Section>
            </Route>

            {/* RULES */}
            <Route exact path="/hacks/:hackSlug/rules">
              <Section sectionClass="rules-section">
                <Hack.Rules
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                  content={this.state.rules}
                />
              </Section>
            </Route>

            {/* TASK */}
            <Route exact path="/hacks/:hackSlug/task">
              <Section>
                <Hack.Task
                  userEmail={this.props.user.email}
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                  taskId={this.state.task}
                  taskPublished={this.state.taskPublished}
                />
                </Section>
              </Route>

            {/* TUTORIALS */}
            <Route exact path="/hacks/:hackSlug/tutorials">
              <Section>
                <Hack.TutorialList
                  hackSlug={this.hackSlug}
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                />
              </Section>
            </Route>

            <Route exact path="/hacks/:hackSlug/tutorials/:tutorialId">
              <Section>
                <Hack.Tutorial
                  hackSlug={this.hackSlug}
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                />
              </Section>
            </Route>

            {/* SUBMISSIONS */}
            <Route exact path="/hacks/:hackSlug/submissions">
              <Section>
                <Hack.Submissions
                  hackSlug={this.hackSlug}
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                  hackData={this.state.hackData}
                />
              </Section>
            </Route>

            <Route path="/hacks/:hackSlug/submit/:submissionId">
              <Section>
                <Hack.Submit
                  hackSlug={this.hackSlug}
                  hackId={this.state.hackId}
                  userId={this.props.userId}
                  hackData={this.state.hackData}
                />
              </Section>
            </Route>
          </Switch>
      </Page>
      )
    }
}

export default withRouter(HackPage)
