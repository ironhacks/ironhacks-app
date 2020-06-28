import React from 'react';
import { withCookies } from 'react-cookie';
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
      availableHacks: [],
      loading: false,
    }

    // this.hackIdList = this.getHackIds()
    this.getHacks = this.getHacks.bind(this);
    // this.getOpenHacks = this.getOpenHacks.bind(this);
    // this.getUserHacks = this.getUserHacks.bind(this);
  }

  componentDidMount() {
    try {
      if (!this.props.user){
        console.log('user not set');
      }
      this.getHacks();
      // this.getUserHacks();
      // this.getOpenHacks();

    } catch (e) {
      console.log('get hacks failed', e);
    }
  }

  async getHacks() {
    const hacks = await window.firebase.firestore()
        .collection('hacks')
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
          result.data().hacks.forEach((hack)=>{
            // hacks.push({
            //   registered: true,
            //   hackId: hack,
            //   hackName: hack,
            //   hackData: hack,
            //   phases: ['']
            // })
            userHackList.push(hack);
          })
          return userHackList;
        }
      });

    console.log('user hacks', userHacks);

    const openHacks = await window.firebase.firestore()
      .collection('hacks')
      .where('registrationOpen', '==', true)
      .get()
      .then((result)=>{
        var openHackList = [];
        if (!result.empty) {
          result.docs.forEach((hack)=>{
            let hackId = hack.id;
            if (!userHacks.includes(hackId)){
              openHackList.push(hackId)
              // let hackData = hack.data();
              // let hackName = hackData.name;
              // openHackList.push(Object.assign(
              //   {available: true},
              //   hackData,
              //   {hackId},
              //   {hackName}
              // ))
            }
          })
          return openHackList;
        }
      })

    console.log('open hacks', openHacks);
    console.log('hacks', hacks);
    const availableHacks = hacks.filter((hack)=>{
      return openHacks.includes(hack.hackId)
    })

    const registeredHacks = hacks.filter((hack)=>{
      return userHacks.includes(hack.hackId)
    })

    this.setState({
      registeredHacks: registeredHacks,
      availableHacks: availableHacks,
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
          user={this.props.user}
          userIsAdmin={this.props.userIsAdmin}
        >
          <Section sectionClass="py-2">
            <Row>
              <Col colClass="">
                <h1 className="h1 page-title">
                  <strong>Welcome to IronHacks</strong>
                </h1>

                <h2 className="h2 py-2">Registered Hacks</h2>

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

                <p className="my-5 font-italic cl-lightblue-dk1">
                  <strong>
                    The IronHacks Summer 2020: A Global COVID-19 Data Science Challenge will be open for registration soon!
                  </strong>
                </p>

                <HackSignupCardList
                  emptyText={'There are no hacks currently available.'}
                  hacks={this.state.availableHacks}
                />
              </Col>
            </Row>
          </Section>
        </Page>
      )
    }
  }
}

export default withCookies(HackSelectPage);
