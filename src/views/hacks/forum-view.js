import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Theme } from '../../theme';
import PostPreview from '../../components/forum/post-preview';

import searchIcon from '../../assets/svg/searchIcon.svg';
const colors = Theme.COLORS;
const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
  width: 100%;
  padding: 0 10%;
  height: ${(props) => props.theme.containerHeight};
  background-color: var(--light);
  overflow-y: auto;
`;

const MainHeader = styled('h1')`
  width: 100%;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 1em;
  font-weight: 800;
`;

const Control = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const NewThreadButton = styled('button')`
  height: 45px;
  font-weight: 700;
  padding: 0 15px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-primary);
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
    border-radius: 5px 0px 0px 5px;
    padding-left: 10px;
  }

  button {
    height: 100%;
    background-color: #f2f2f2;
    border: 1px solid #999999;
    border-left: none;
    border-radius: 0px 5px 5px 0px;
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
    this.state = {
      forum: null,
      selectedForum: 0,
      hackForums: {},
      posts: [],
      selectedHack: 0,
    };

    this.newThread = this.newThread.bind(this);
    this.getPosts = this.getPosts.bind(this)
    this.sortThreads = this.sortThreads.bind(this)
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    let posts = [];
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('forums')
      .doc('general')
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        })
        this.setState({ posts: posts })
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  }

  sortThreads(posts, order='asc') {
    if (order === 'asc') {
      return posts.sort((a, b) => {
        return a.data.createdAt.toMillis() - b.data.createdAt.toMillis()
      })
    } else {
      return posts.sort((a, b) => {
        return b.data.createdAt.toMillis() - a.data.createdAt.toMillis()
      })
    }
  }

  newThread(event) {
    this.setState({ startNewThreadFlow: true });
  };

  render() {
    if (this.state.startNewThreadFlow) {
      return <Redirect push to='./forum/new' />;
    }

    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>
          <MainHeader>
            IronHacks User Forum
          </MainHeader>

          <Control>
            {this.props.userIsAdmin && (
              <NewThreadButton onClick={this.newThread}>
                New Post
              </NewThreadButton>
            )}

            <SearchBar>
              <input type='text' placeholder='Search...' />
              <button>
                <img src={searchIcon} alt='searchIcon' />
              </button>
            </SearchBar>
          </Control>

          {this.state.posts.map((thread, index) => {
            return (
              <PostPreview
                key={thread.id}
                postId={thread.id}
                postTitle={thread.data.title}
                postAuthor={thread.data.authorName}
                postDate={thread.data.createdAt.toDate().toLocaleDateString()}
                thread={thread.data}
                user={this.props.user}
              />
            )
          })}

        </SectionContainer>
      </ThemeProvider>
    )
  }
}

export default ForumView;
