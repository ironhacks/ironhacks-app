import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import BreadCrumbs from '../../util/breadCrumbs.js';
import ForumSelector from './forum-selector';
import MarkdownEditor from '../../components/markdownEditor/markdownEditor.js';
import {Loader} from '../../components/loader';
import { Theme } from '../../theme';
const colors = Theme.COLORS;
const units = Theme.UNITS;

const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 10%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
  overflow: auto;
`;

const Header = styled('div')`
  width 100%;
  margin-top: 25px;

  label {
    font-weight: 700;
    font-size: 18px;

    span {
      font-weight: 500;
      font-style: italic;
      font-size: 12px;
      color: #c02222;
    }
  }
`;

const AdminSection = styled('div')`
  display: flex;
  flex-direction: column;
  width 100%;
  padding: 10px 15px;
  margin: 15px 0;
  background-color: #FEF8ED;
  border-radius: ${units.universalBorderRadius};
  border-top: solid 1px ${colors.mainBgColor};
  border-bottom: solid 1px ${colors.mainBgColor};

  .hackSelector {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;

    span {
      margin-left: 20px;

      &:first-child{
        margin: 0;
      }
    }

    input {
      margin-left: 20px;
    }
  }
`;
// Publish controls row
const PublishControlsRow = styled('div')`
  display: flex;
  flex-direction: row-reverse;
  width 100%;
  min-height: 60px;
  padding: 15px 0 15px 0;

  button {
    padding: 0 10px;
    background-color: ${colors.mainBgColor};
    border-radius: ${units.universalBorderRadius};
    border: none;
    cursor: pointer;
    border: none;
    height: 100%;

    &:disabled {
      cursor: inherit;
      background-color: lightgray;
      color: white;
    }
  }
`;
// Title intpu
const TitleInput = styled('input')`
  width: 50%;
  height: 30px;
  background-color: #f2f2f2;
  border: 1px solid #999999;
  border-radius: ${units.universalBorderRadius};
  padding-left: 10px;
  margin-bottom: 10px;
`;

class NewThread extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      currentHack: this.props.hackId,
      forum: cookies.get('currentForum') || null,
      user: this.props.user,
      title: '',
      markdown: '',
      mustNavigate: false,
      selectedHack: 0,
      selectedForum: 0,
    }

    this.firestore = window.firebase.firestore();
  }

  componentDidMount() {
    if (this.props.user.isAdmin) {
      this.getHacks();
    }
  }

  onEditorChange(markdown) {
    this.setState({
      markdown: markdown
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let hackId;
    let forumId;

    if (this.props.user.isAdmin) {
      hackId = this.state.hacks[this.state.selectedHack].id;
      forumId = this.state.hacks[this.state.selectedHack].forums[this.state.selectedForum].id;
    } else {
      hackId = this.state.currentHack;
      forumId = this.state.forum;
    }

    const currentDate = new Date();
    const codedBody = this.utoa(this.state.markdown);

    let threadData = {
      title: this.state.title,
      author: this.props.user.uid,
      authorName: this.props.user.displayName,
      createdAt: currentDate,
      hackId: hackId,
      forumId: forumId,
    };

    this.firestore
      .collection('threads')
      .add(threadData)
      .then((docRef) => {
        const threadRef = docRef.id;

        this.firestore
          .collection('comments')
          .add({
            author: this.props.user.uid,
            authorName: this.props.user.displayName,
            body: codedBody,
            createdAt: currentDate,
            threadId: docRef.id,
            forumId: forumId,
          }) // Adding double reference on the thread.
          .then((docRef) => {

            this.firestore
              .collection('threads')
              .doc(threadRef)
              .update({
                comments: [threadRef],
              })

            this.setState({
              mustNavigate: true,
              threadRef: threadRef
            })

          });
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };


  utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  };

  // ---------------------------------------- Admin features ------------------------------------------

  // Query all the hacks objects from the db.
  getHacks() {
    this.setState({
      loading: true
    })

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
        _this.setState({ hacks: hacks });
        _this.getForums();
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      })
  }

  getForums(hackIndex) {
    const _this = this;
    const forums = [];
    const index = hackIndex || 0;
    this.firestore
      .collection('forums')
      .where('hack', '==', this.state.hacks[index].id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const forum = doc.data();
          forum.id = doc.id;
          forums.push(forum);
        });
        _this.setState((prevState, props) => {
          const hacks = prevState.hacks;
          hacks[index].forums = forums;
          return { hacks, loading: false };
        });
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      })
  }

  onhackSelector(hackIndex) {
    if (this.state.hacks[hackIndex].forums) {
      this.setState({ selectedHack: hackIndex });
    } else {
      this.setState({ selectedHack: hackIndex });
      this.getForums(hackIndex);
    }
  }

  onForumSelection(forumIndex) {
    this.setState({
      selectedForum: forumIndex
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <ThemeProvider theme={styles}>
          <SectionContainer>
            <Loader />
          </SectionContainer>
        </ThemeProvider>
      );
    }
    if (this.state.mustNavigate) {
      return (
        <Redirect
          to={{
            pathname: '/forum/thread/' + this.state.threadRef,
            state: { title: this.state.titleValue },
          }}
        />
      );
    }
    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <BreadCrumbs sections={[]} current='newThread' />
          <Header>
            <h1>New Topic</h1>
            <p>
              {' '}
              Below you will find a{' '}
              <strong>
                <i>Markdown Editor</i>
              </strong>
              , so you can style your Thread using Markdown syntax{' '}
              <strong>
                (If you don't know Markdown, please check{' '}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet'
                >
                  this!
                </a>
                )
              </strong>
              . Write on the left, you will see the preview on the right.
            </p>
            <label>
              Title <span>REQUIRED</span>
            </label>
            <br />
            <TitleInput
              type='text'
              placeholder='Thread Title..'
              onChange={this.handleInputChange}
              name='title'
            />
            {this.props.user.isAdmin && (
              <AdminSection>
                <div>
                  <h3>Admin Tools</h3>
                  <p>
                    {' '}
                    Here you can pick on which hack and forum you will post your
                    thread. You can also pin a post from here. (A pinned post
                    will appear at the top of the forum, as a good practice, try
                    to avoid having more than 3 pinned posts.)
                  </p>
                </div>
                <div className='hackSelector'>
                  <span>Hack:</span>
                  {this.props.user.isAdmin && this.state.hacks && (
                    <ForumSelector
                      onSelection={this.onhackSelector}
                      selector={this.state.hacks}
                    />
                  )}
                  <span>Forum:</span>
                  {this.props.user.isAdmin &&
                    this.state.hacks &&
                    this.state.hacks[this.state.selectedHack].forums && (
                      <ForumSelector
                        onSelection={this.onForumSelection}
                        selector={
                          this.state.hacks[this.state.selectedHack].forums
                        }
                      />
                    )}
                  <input
                    type='checkbox'
                    onChange={this.handleInputChange}
                    name='pinned'
                  />
                  <span>Pin this thread.</span>
                </div>
              </AdminSection>
            )}
          </Header>
          <MarkdownEditor
            editorLayout='tabbed'
            onEditorChange={this.onEditorChange}
          />
          <PublishControlsRow>
            <button
              disabled={this.state.title === '' || this.state.markdown === ''}
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </PublishControlsRow>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(NewThread);
