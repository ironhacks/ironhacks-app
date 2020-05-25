import React from 'react';
import { useParams } from "react-router-dom";
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import swal from 'sweetalert2';
import { HackCardList } from '../../components/hacks/hack-card-list';
import Separator from '../../util/separator';
import { Loader } from '../../components/loader';
import * as AlertsContent from '../../components/alert';

// import generateHackFileTemplate from '../../components/hacks/templates';
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

class HackPage extends React.Component {
  constructor(props) {
    super(props);

    let { slug } = useParams();
    this.hackId = slug;

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

  setCurrentHack(_hack_id) {
    const { cookies } = this.props;
    cookies.set('currentHack', _hack_id);
    // cookies.set('currentForum', doc.data().forums[_hack_id].id);
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

              <Separator primary />

              <h2>Hack: { this.hackId }</h2>

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

export default withCookies(HackPage);
