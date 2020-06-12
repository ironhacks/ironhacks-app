import React from 'react';
import { withCookies } from 'react-cookie';
import swal from 'sweetalert2';
import Separator from '../../util/separator';
import { Loader } from '../../components/loader';
import { HackCardList } from '../../components/hacks';
import * as AlertsContent from '../../components/alert';
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
    };

    this.firestore = window.firebase.firestore();
  }

  componentDidMount() {
    try {
      if (!this.props.user){
        console.log('user not set');
      }
      const hackPromise = this.getHacks(this.state.user);
      Promise.resolve(hackPromise).then((hackData) => {
        if (hackData.length > 0) {
          this.setHacks(hackData)
        }
      });
    } catch (e) {
      console.log('get hacks failed', e);
    }
    window.addEventListener('message', this.recieveMessage);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.recieveMessage);
  }

  recieveMessage(event) {
    if (
      event.data.source !== 'react-devtools-content-script'
      && event.data.source !== 'react-devtools-bridge'
    ) {
      console.log('message incoming', event.data);
    }

    if (event.data === 'quizDone') {
      swal.clickConfirm();
    }
  }

  async getHack(hackId) {
    let hack = await this.firestore
      .collection('hacks')
      .doc(hackId);
    return hack;
  }

  setHacks(hacks) {
    this.setState({
      availableHacks: hacks.filter((hack) => { return !hack.registered }),
      registeredHacks: hacks.filter((hack) => { return hack.registered }),
    });
  }

  async getHacks(_user) {
    if (!_user){
      console.log('%c NO USER', 'color:red;font-weight:bold');
      return false;
    }

    const cachedHacks = JSON.parse(localStorage.getItem('userHacks'));

    if (cachedHacks) {
      return cachedHacks;
    }

    const fireuser = await window.firebase.firestore()
      .collection('users')
      .doc(_user.uid)
      .get();


    const userHacks = fireuser.data().hacks;

    const whitelistDoc = await window.firebase.firestore()
      .collection('whitelists')
      .doc(_user.email)
      .get();

    if (whitelistDoc.exists) {
      const { whitelist } = whitelistDoc.data();
      let hacks = [];

      if (whitelist && Array.isArray(whitelist)) {
        for (let hackId of whitelist) {
          let hackDoc = await window.firebase.firestore()
          .collection('hacks')
          .doc(hackId)
          .get();

          let hack = hackDoc.data();
          hack.hackId = hackId;
          if (userHacks.includes(hackId)) {
            hack.registered = true;
          }

          hacks.push(hack);
        }

        localStorage.setItem('userHacks', JSON.stringify(hacks));
      }

      return hacks;

    } else {
      return [];
    }
  }


  goToPresurvey(hackIndex, registrationSurvey) {
    if (registrationSurvey) {
      swal(
        AlertsContent.preSurveyAlertContent(
          registrationSurvey + '?user_email=' + this.props.user.email
        )
      ).then((result) => {
        if (!result.dismiss) {
          this.callRegistrationFuncion(hackIndex);
        }
      });
    } else {
      this.callRegistrationFuncion(hackIndex);
    }
  };

  callRegistrationFuncion(hackIndex) {
    this.setState({
      loading: true,
      status: 'Starting registration process...',
    });

    const _this = this;

    const hackId = _this.state.availableHacks[hackIndex].id;
    const registerUserFunc = window.firebase
      .functions()
      .httpsCallable('registerUser');

    registerUserFunc({
      hackId: hackId
    }).then((result) => {
      const projectName = _this.state.availableHacks[hackIndex]
         .data()
         .name.replace(/\s/g, '');
        _this.createNewProject(projectName, hackId, hackIndex);
    });
  };

  setCurrentHack(hackIndex) {
    this.setState({
      status: 'Creating participant profile...'
    })

    const hackId = this.state.registeredHacks[hackIndex]
      ? this.state.registeredHacks[hackIndex].id
      : this.state.availableHacks[hackIndex].id;

    this.firestore
      .collection('users')
      .doc(this.props.user.uid)
      .get()
      .then((doc) => {
        const { cookies } = this.props;
        cookies.set('currentHack', hackId);
        cookies.set('currentForum', doc.data().forums[hackId].id);
        this.setState({ mustNavigate: true });
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

                <h2 className="h2 py-2">Registerd Hacks</h2>

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

                <HackCardList
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
