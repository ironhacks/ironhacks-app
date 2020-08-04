import React from 'react';
import Separator from '../../util/separator';
import { Loader } from '../../components/loader';
import { HackCardList, HackSignupCardList } from '../../components/hacks';
import { Page, Section, Row, Col } from '../../components/layout';

class HackSelectPage extends React.Component {
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
    this.getHacks = this.getHacks.bind(this);
  }

  componentDidMount() {
    try {
      this.getHacks();
    } catch (e) {
      console.log('get hacks failed', e);
    }
  }

  async getHacks() {
    const hacks = await window.firebase.firestore()
        .collection('hacks')
        .where('hackPublished', '==', true)
        .get()
        .then((result)=>{
          let hackList = [];
          result.docs.forEach((hack)=>{
            let hackData = hack.data();
            let hackId = hack.id;
            let hackName = hackData.name;
            hackList.push(Object.assign(
              {available: true},
              hackData,
              {hackId},
              {hackName}
            ))
          })
          return hackList;
        })

    const userHacks = await window.firebase.firestore()
      .collection('users')
      .doc(this.props.userId)
      .get()
      .then((result)=>{
        if (result.exists) {
          let userHackList = [];
          let data = result.data()
          if (data.hacks) {
            data.hacks.forEach((hack)=>{
              userHackList.push(hack);
            })
          }
          return userHackList;
        }
      });

    // ALL REGISTERED HACKS
    const registeredHacks = hacks.filter((hack)=>{
      return userHacks.includes(hack.hackId)
    })

    this.setState({ registeredHacks: registeredHacks })

    // HACKS NOT REGISTERED
    const unregisteredHacks = hacks.filter((hack)=>{
      return !userHacks.includes(hack.hackId)
    })

    // NOT REGISTERED - OPEN FOR REGISTRATION
    const availableHacks = unregisteredHacks.filter((hack)=>{
      return hack.registrationOpen;
    })

    this.setState({ availableHacks: availableHacks })

    // NOT REGISTERED - NOT OPEN FOR REGISTRATION
    const unavailableHacks = unregisteredHacks.filter((hack)=>{
      return !hack.registrationOpen;
    })

    // NOT REGISTERED - NOT OPEN FOR REGISTRATION - FUTURE DATE
    const upcomingHacks = unavailableHacks.filter((hack)=>{
      return Date.parse(hack.startDate) > Date.now()
    })

    // NOT REGISTERED - NOT OPEN FOR REGISTRATION - PAST DATE
    const previousHacks = unavailableHacks.filter((hack)=>{
      return Date.parse(hack.startDate) <= Date.now()
    })

    this.setState({
      upcomingHacks: upcomingHacks,
      previousHacks: previousHacks,
    })
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
          pageFooter={false}
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
        >
          <Section sectionClass="py-2 mb-10">
            <Row>
              <Col colClass="">
                <h1 className="h1 page-title">
                  <strong>Welcome to IronHacks</strong>
                </h1>

                <h2 className="h2 py-2">Your Registered Hacks</h2>

                <Separator primary />

                <HackCardList
                  emptyText={'You are not registered for any hacks.'}
                  hacks={this.state.registeredHacks}
                />

                <Separator />

                <h2 className="h2 py-2">
                  Hacks Open for Registration
                </h2>

                <Separator primary />

                <HackSignupCardList
                  emptyText={'There are no hacks currently available.'}
                  hacks={this.state.availableHacks}
                />


                <h2 className="h2 py-2">
                  Upcoming Hacks
                </h2>

                <Separator primary />

                <HackCardList
                  emptyText={'No upcoming hacks.'}
                  hacks={this.state.upcomingHacks}
                />


                <h2 className="h2 py-2">
                  Past Hacks
                </h2>

                <Separator primary />

                <HackCardList
                  emptyText={'No previous hacks.'}
                  hacks={this.state.previousHacks}
                />
              </Col>
            </Row>
          </Section>
        </Page>
      )
    }
  }
}

export default HackSelectPage;
