// forum.js - forum main Component
import React from 'react';
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import { Redirect } from 'react-router-dom';
// import { registerStats } from '../../util/register-stat';
import { Theme } from '../../theme';
import ForumSelector from '../forum/forumSelector';
import ThreadPreview from '../forum/threadPreview';
import * as DateFormater from '../../util/dateFormater';

import searchIcon from '../../assets/svg/searchIcon.svg';
// import SponsorsBanner from '../../components/sponsorsBanner';
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
    console.log(this.props.hackData);
    this.state = {
      currentHack: this.props.hackId || null,
      forum: cookies.get('currentForum') || null,
      selectedForum: 0,
      hackForums: {},
      threads: [],
      selectedHack: 0,
    };
    this.firestore = window.firebase.firestore();
    this.saveStat = this.saveStat.bind(this);
  }

  componentDidMount() {
    this.getForums();
    // this.getThreads();
    // if (this.props.user.isAdmin) {
      // this.getHacks();
    // } else {
    // }
  }

  getForums() {
    const forums = [];
    window.firebase.firestore()
      .collection('forums')
      .where('hack', '==', this.props.hackId)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          forums.push({
            id: doc.id,
            data: doc.data(),
          });
        })

        this.setState({
          hackForums: forums
        })

        this.getThreads();
        // _this.getThreadsAdmin(0);
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  }

  getThreads() {
    const _this = this;
    let threads = [];
    let forums = this.state.hackForums;
    let selectedForum = 0;

    console.log(forums, selectedForum, forums[selectedForum]);

    let forumId = this.state.hackForums[this.state.selectedForum].id;

    console.log('get threads from', forumId);

    this.firestore
      .collection('threads')
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
  }

  sortThreads(threads) {
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
  getHacks() {
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


  getThreadsAdmin(forumIndex) {
    const hackId = this.props.hackId;
    const forumId = this.props.hackForums[this.state.selectedHack][forumIndex].id || 0;
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

  onhackSelector(hackIndex) {
    this.setState({ selectedHack: hackIndex, forum: 0 });
    this.getForums(hackIndex);
  };

  onForumSelection(forumIndex) {
    this.setState({ forum: forumIndex });
    this.getThreadsAdmin(forumIndex);
  };

  // ---------------------------------------- Admin features ------------------------------------------

  saveStat(event) {
    // const statData = {
    //   userId: this.props.user.uid,
    //   event: 'click',
    //   metadata: {
    //     on: 'create-new-thread',
    //     location: 'forum',
    //   },
    // };
    // registerStats(statData);
    this.setState({ startNewThreadFlow: true });
  };

  render() {
    if (this.state.startNewThreadFlow) {
      return <Redirect push to='./forum/new' />;
    }

    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <MainHeader>IronHacks User Forum</MainHeader>
          <h2>General discussion</h2>
          <p>
            Welcome to the Ironhacks forum! Feel free to talk about anything
            related with the task. You can also share code here.
          </p>
          <Control>

            <NewThreadButton onClick={this.saveStat}>
              START A NEW TOPIC
            </NewThreadButton>

            {this.props.isAdmin && this.state.hacks && (
              <ForumSelector
                onSelection={this.onhackSelector}
                selector={this.state.hacks}
              />
            )}

            {this.props.isAdmin &&
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

        </SectionContainer>
      </ThemeProvider>
    )
  }
}

export default withCookies(ForumView);
