import { Component } from 'react'
import { Loader } from '../../components/loader'
import { HackCardList, PreviousHackCardList, HackSignupCardList } from '../../components/hacks'
import { Page, Section, Row, Col } from '../../components/layout'
import { TwitterButton, TwitterTimeline } from '../../components/twitter'

class HackSelectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      startNewHackNav: true,
      startDashboardNav: true,
      registeredHacks: [],
      previousHacks: [],
      availableHacks: [],
      loading: false,
    }
  }

  componentDidMount() {
    try {
      this.getHacks()
    } catch (e) {
      console.log('get hacks failed', e)
    }
  }

  getHacks = async () => {
    const hacksSnap = await window.firebase.firestore()
      .collection('hacks')
      .where('hackPublished', '==', true)
      .get()

    let hacks = []
    hacksSnap.docs.forEach((hack)=>{
      let hackData = hack.data()
      hacks.push({
        ...hackData,
        available: true,
        hackId: hack.id,
        hackName: hackData.name,
      })
    })

    let userHacks = []
    const userDoc = await window.firebase.firestore()
      .collection('users')
      .doc(this.props.userId)
      .get()

    if (userDoc.exists) {
      let userData = userDoc.data()
      if (userData.hacks) {
        userData.hacks.forEach((hack)=>{
          userHacks.push(hack)
        })
      }
    }

    // ALL REGISTERED HACKS
    const registeredHacks = hacks.filter((hack)=>{
      return userHacks.includes(hack.hackId)
    })

    this.setState({registeredHacks: registeredHacks})

    // HACKS NOT REGISTERED
    const unregisteredHacks = hacks.filter((hack)=>{
      return !userHacks.includes(hack.hackId)
    })

    // NOT REGISTERED - OPEN FOR REGISTRATION
    const availableHacks = unregisteredHacks.filter((hack)=>{
      return hack.registrationOpen
    })

    this.setState({ availableHacks: availableHacks })

    // NOT REGISTERED - NOT OPEN FOR REGISTRATION
    const unavailableHacks = unregisteredHacks.filter((hack)=>{
      return !hack.registrationOpen
    })

    // NOT REGISTERED - NOT OPEN FOR REGISTRATION - FUTURE DATE
    const upcomingHacks = unavailableHacks.filter((hack)=>{
      return Date.parse(hack.startDate) > Date.now()
    })

    this.setState({upcomingHacks: upcomingHacks})

    // NOT REGISTERED - NOT OPEN FOR REGISTRATION - PAST DATE
    const previousHacks = unavailableHacks.filter((hack)=>{
      return Date.parse(hack.startDate) <= Date.now()
    })

    this.setState({previousHacks: previousHacks})
  }

  render() {
    if (this.state.loading) {
      return (
        <Section>
          <Loader status={this.state.status} />
        </Section>
      )
    } else {
      return (
        <Page
          pageTitle="IronHacks | Hacks"
          pageUrl="https://ironhacks.com/hacks"
          pageClass="hack_select"
          showFooter={false}
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
        >
          <Section sectionClass="py-2" containerClass="flex">
            <Row rowClass="flex-2 mr-2 mb-10">
              <Col colClass="mt-1">
                <h2 className="h4 py-1 badge badge-dark">
                  Your Registered Hacks
                </h2>

                <HackCardList
                  emptyText={'You are not registered for any hacks.'}
                  hacks={this.state.registeredHacks}
                />

                <h2 className="h4 py-1 badge badge-dark">
                  Hacks Open for Registration
                </h2>

                <HackSignupCardList
                  emptyText={'There are no hacks currently available.'}
                  hacks={this.state.availableHacks}
                />

                <h2 className="h4 py-1 badge badge-dark">
                  Upcoming Hacks
                </h2>

                <HackCardList
                  emptyText={'No upcoming hacks.'}
                  hacks={this.state.upcomingHacks}
                />

                <h2 className="h4 py-1 badge bg-grey cl-white">
                  Past Hacks
                </h2>

                <PreviousHackCardList
                  emptyText={'No previous hacks.'}
                  hacks={this.state.previousHacks}
                />
              </Col>
            </Row>

          <div className="flex-1 mr-1 hide--med">
            <h2 className="h4 py-1 badge badge-dark">
              Social Feed
            </h2>

            <div className="social_feed">
              <TwitterTimeline
                src="https://twitter.com/__matt_harris__/lists/ironhacks-com-14752?ref_src=twsrc%5Etfw"
              />
            </div>
            <div className="social_actions">
              <TwitterButton
                hashtag="IronHacks"
              />
            </div>
          </div>
          </Section>

        </Page>
      )
    }
  }
}

export default HackSelectPage;
