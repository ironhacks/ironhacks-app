import React from 'react';
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import swal from 'sweetalert2';
import { HackCardList } from '../../components/hacks/hack-card-list';
import Separator from '../../util/separator';
import { Loader } from '../../components/loader';
import * as AlertsContent from '../../components/alert';
import { Theme } from '../../theme';

// const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;
// const units = Theme.UNITS;

const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};

  h1 {
    margin-bottom: 20px;

    &:first-child {
      margin-top: 100px;
    }
  }

  .empty-list {
    color: gray;
    font-style: italic;
  }

  overflow: auto;
`;

const CardsContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 35px;
  margin-bottom: 35px;
`;

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
      if (!this.state.user){
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('hackpage updated', {
    //   prevProps: prevProps,
    //   prevState: prevState,
    //   snapshot: snapshot
    // });

    if (!this.state.user.uid) {
      console.log('user UNSET');
      if (prevProps.user.uid) {
        console.log('user is NOW set');
        // let hackPromise = this.getHacks(prevProps.user);
        // Promise.resolve(hackPromise).then((hackData) => {
        //   console.log('update got hacks', hackData);
        // });
        //.then((result) => {
        // })
      }
    }
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

  // Query all the hacks objects from the db.
  async getHack(hackId) {
    console.log('get hack', hackId);

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

    const cachedHacks =  JSON.parse(localStorage.getItem('userHacks'));

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

    const hackIds = whitelistDoc.data().whitelist;

    let hacks = [];
    if (hackIds && Array.isArray(hackIds)) {
      for (let hackId of hackIds) {
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
      return hacks;

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
    console.log('register for hacquizzesk');
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
      console.log('register user function', result);
      // const projectName = _this.state.availableHacks[hackIndex]
      //   .data()
      //   .name.replace(/\s/g, '');
        console.log('CREATE NEW PROJECT');
      // _this.createNewProject(projectName, hackId, hackIndex);
    });
  };

  setCurrentHack(hackIndex) {
    this.setState({ status: 'Creating participant profile...' });

    const hackId = this.state.registeredHacks[hackIndex]
      ? this.state.registeredHacks[hackIndex].id
      : this.state.availableHacks[hackIndex].id;

    // const _this = this;

    this.firestore
      .collection('users')
      .doc(this.props.user.uid)
      .get()
      .then((doc) => {
        const { cookies } = this.props;
        cookies.set('currentHack', hackId);
        cookies.set('currentForum', doc.data().forums[hackId].id);
        this.setState({ mustNavigate: true });
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <ThemeProvider theme={styles}>
          <SectionContainer className='container-fluid'>
            <Loader status={this.state.status} />
          </SectionContainer>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider theme={styles}>
        <SectionContainer className='container-fluid'>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
              <h1>Welcome to IronHacks Platform!</h1>
              <h2>My Hacks</h2>
              <p>
                Below you will find the hacks you are currently participating
                in. Click in any of them to go to the contest.
              </p>

              <Separator primary />

              <HackCardList
                emptyText={'You are not registered for any hacks.'}
                hacks={this.state.registeredHacks}
              />

              <Separator />

              <h2 style={{
                paddingTop: '1em',
              }}>
                Available hacks for registration
              </h2>

              <p>
                Below you will find all the availabe hacks to register in.
                Click on one of them to start the registration process.
              </p>

              <Separator primary />

              <HackCardList
                emptyText={'There are no hacks currently availabe.'}
                hacks={this.state.availableHacks}
              />

            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(HackSelectPage);
