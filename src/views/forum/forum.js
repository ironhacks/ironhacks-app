// forum.js - forum main Component
import React from 'react';
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import { Redirect } from 'react-router-dom';
import { registerStats } from '../../util/register-stat';
import { Theme } from '../../theme';
import * as DateFormater from '../../util/dateFormater.js';
import ForumSelector from './forumSelector.js';
import searchIcon from '../../assets/svg/searchIcon.svg';
import SponsorsBanner from '../../components/sponsorsBanner';
import ThreadPreview from './threadPreview.js';
const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;
const units = Theme.UNITS;
const SectionContainer = styled('div')`
  width: 100%;
  padding: 0 10%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
  overflow-y: scroll;
`;
const MainHeader = styled('h1')`
  width: 100%;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 40px;
  font-weight: 800;
`;
const Control = styled('div')`
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 15px;
`;
const NewThreadButton = styled('button')`
  height: 45px;
  font-weight: 700;
  padding: 0 15px;
  border: none;
  border-radius: ${units.universalBorderRadius}
  background-color: ${colors.mainBgColor};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.buttonHighlightedBgColor};
  }

  a {
    color: black;

    &:hover {
      text-decoration: none;
      color: black;
    }
  }

  @media (max-width: 1300px) {
    font-size: 12px;
  }
`;
const SearchBar = styled('form')`
  height: 45px;
  display: flex;
  min-witdh: 300px;
  margin-left: auto;
  justify-content: flex-end;

  input {
    width: 60%;
    height: 100%;
    background-color: #f2f2f2;
    border: 1px solid #999999;
    border-right: none;
    border-radius: ${units.universalBorderRadius} 0px 0px
      ${units.universalBorderRadius};
    padding-left: 10px;
  }

  button {
    height: 100%;
    background-color: #f2f2f2;
    border: 1px solid #999999;
    border-left: none;
    border-radius: 0px ${units.universalBorderRadius}
      ${units.universalBorderRadius} 0px;
    padding-left: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

class ForumView extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      currentHack: cookies.get('currentHack') || null,
      forum: cookies.get('currentForum') || null,
      threads: [],
      selectedHack: 0,
    };
    this.firestore = window.firebase.firestore();
  }

  componentDidMount() {
    if (this.props.user.isAdmin) {
      this.getHacks();
    } else {
      this.getThreads();
    }
  }

  getThreads = () => {
    const _this = this;
    let threads = [];
    this.firestore
      .collection('threads')
      .where('forumId', '==', this.state.forum)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const thread = doc.data();
          thread.id = doc.id;
          threads.push(thread);
        });
        threads = _this.sortThreads(threads);
        _this.setState({ threads: threads });
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  };

  sortThreads = (threads) => {
    const sortedThreads = threads;
    sortedThreads.sort((a, b) => {
      const aDate = DateFormater.getFirebaseDate(a.createdAt);
      const bDate = DateFormater.getFirebaseDate(b.createdAt);
      return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
    });
    return sortedThreads;
  };

  // ---------------------------------------- Admin features ------------------------------------------

  // Query all the hacks objects from the db.
  getHacks = () => {
    const _this = this;
    const hacks = [];
    this.firestore
      .collection('hacks')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const hackData = doc.data();
          hackData.id = doc.id;
          hacks.push(hackData);
        });
        _this.setState({ hacks: hacks, selectedHack: 0 });
        console.log(hacks);
        _this.getForums();
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  };

  getForums = (hackIndex) => {
    const _this = this;
    const forums = [];
    const index = hackIndex ? hackIndex : 0;
    this.firestore
      .collection('forums')
      .where('hack', '==', this.state.hacks[index].id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          forums.push(data);
        });
        _this.setState((prevState, props) => {
          prevState.hacks[index].forums = forums;
          return prevState;
        });
        _this.getThreadsAdmin(0);
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  };

  getThreadsAdmin = (forumIndex) => {
    const hackId = this.state.hacks[this.state.selectedHack].id;
    const forumId = this.state.hacks[this.state.selectedHack].forums
      ? this.state.hacks[this.state.selectedHack].forums[forumIndex].id
      : 0;
    const _this = this;
    let threads = [];
    this.firestore
      .collection('threads')
      .where('hackId', '==', hackId)
      .where('forumId', '==', forumId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const thread = doc.data();
          thread.id = doc.id;
          threads.push(thread);
        });
        threads = _this.sortThreads(threads);
        _this.setState({ threads: threads });
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  };

  onhackSelector = (hackIndex) => {
    this.setState({ selectedHack: hackIndex, forum: 0 });
    this.getForums(hackIndex);
  };

  onForumSelection = (forumIndex) => {
    this.setState({ forum: forumIndex });
    this.getThreadsAdmin(forumIndex);
  };

  // ---------------------------------------- Admin features ------------------------------------------

  saveStat = (event) => {
    const statData = {
      userId: this.props.user.uid,
      event: 'click',
      metadata: {
        on: 'create-new-thread',
        location: 'forum',
      },
    };
    registerStats(statData);
    this.setState({ startNewThreadFlow: true });
  };

  render() {
    if (this.state.startNewThreadFlow) {
      return <Redirect push to='/forum/new' />;
    }

    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <MainHeader>Ironhacks Platform Demo</MainHeader>
          <h2>General discussion</h2>
          <p>
            Welcome to the Ironhacks forum! Feel free to talk about anything
            related with the task. You can also share code here.
          </p>
          <Control>
            <NewThreadButton onClick={this.saveStat}>
              START A NEW TOPIC
            </NewThreadButton>
            {this.props.user.isAdmin && this.state.hacks && (
              <ForumSelector
                onSelection={this.onhackSelector}
                selector={this.state.hacks}
              />
            )}
            {this.props.user.isAdmin &&
              this.state.hacks &&
              this.state.hacks[this.state.selectedHack].forums && (
                <ForumSelector
                  onSelection={this.onForumSelection}
                  selector={this.state.hacks[this.state.selectedHack].forums}
                />
              )}
            <SearchBar>
              <input type='text' placeholder='Search...' />
              <button>
                <img src={searchIcon} alt='searchIcon' />
              </button>
            </SearchBar>
          </Control>
          {this.state.threads.map((thread, index) => {
            return (
              <ThreadPreview
                key={thread.id}
                thread={thread}
                user={this.props.user}
              />
            );
          })}
          <SponsorsBanner />
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(ForumView);
