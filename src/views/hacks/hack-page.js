import React from 'react';
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import { HackNav } from './hack-nav';
import Separator from '../../util/separator';
import { Loader } from '../../components/loader';
import { withRouter } from 'react-router';

import ThreadViewWithRouter from '../forum/threadView/threadView';
import TutorialScreen from '../tutorial';
import ExamplesPage from '../examples';
import Forum from '../forum/forum.js';
import NewThread from '../forum/newThread.js';
import ProjectsPage from  '../projects';
import Task from '../task';
import Results from '../results';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from 'react-router-dom';

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

    // let { slug } = useParams();
    // this.hackId = slug;

    this.hackId = this.props.match.params.hackId;

    this.state = {
      currentView: 'task',
      user: this.props.user,
      startNewHackNav: true,
      startDashboardNav: true,
      registeredHacks: [],
      availableHacks: [],
      loading: false,
    };

    const hackDataPromise = this.getHack(this.hackId);

    Promise.resolve(hackDataPromise).then((hackData) => {
       if (hackData.length > 0) {
         this.setCurrentHack(this.hackId);
       }
       this.hackData = hackData;
       this.hackName = hackData.name;
    });

    this.firestore = window.firebase.firestore();
  }

  componentDidMount() {
    // try {
      // let hackData = this.getHack(this.hackId)
      // if (!this.state.user){
      //   console.log('user not set');
      // }
      // const hackPromise = this.getHacks(this.state.user);
      // Promise.resolve(hackPromise).then((hackData) => {
      //   if (hackData.length > 0) {
      //     this.setHacks(hackData)
      //   }
      // });
    // } catch (e) {
    //   console.log('get hacks failed', e);
    // }
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  // }

  // componentWillUnmount() {
  // }

  // Query all the hacks objects from the db.
  async getHack(hackId) {
    let hack = await window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .get();

    if (hack.exists) {
      console.log('hack result', hack.data());
      return hack.data();
    }

    return false;
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

  updateHackView(target) {
    console.log(this, target);
  }

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

              <h2>
               <strong>Hack: </strong>
               <span>{ this.hackName } </span>
               <span className="small">({ this.hackId })</span>
              </h2>
              <Separator />

              <HackNav action={this.updateHackView}/>

              <Separator primary />
              <Router>
                <div>
                <Switch>

                  <Route path="/hacks/:hackId/task">
                    <h3>Task</h3>
                    <Task/>
                  </Route>

                  <Route path="/hacks/:hackId/forum">
                    <h3>Forum</h3>
                    <Forum/>
                  </Route>

                  <Route path="/hacks/:hackId/tutorial">
                    <h3>Tutorial</h3>
                    <TutorialScreen/>
                  </Route>

                  <Route path="/hacks/:hackId/examples">
                    <h3>Examples</h3>
                    <ExamplesPage/>
                  </Route>

                  <Route path="/hacks/:hackId/projects">
                    <h3>Projects</h3>
                    <ProjectsPage/>
                  </Route>

                  <Route path="/hacks/:hackId/results">
                    <h3>Results</h3>
                    <Results/>
                  </Route>
                </Switch>
                </div>
              </Router>


            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(withRouter(HackPage))
