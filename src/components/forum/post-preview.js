import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactionsView from './reaction-view';
import ReactionPicker from './reaction-picker';

const PreviewContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: rgba(0,0,0,0.02);
  margin-bottom: 5px;
  padding: 10px 15px;
  border: 1px solid #dadada;
  transition: background-color 0.2s;

  h2 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 4px 0;
    line-height: 1;

    a {
      color: black;
    }
  }


  .post-author {
    font-size: 15px;
    margin: 0 .4em 0 0;
  }

  .post-date {
    font-size: 15px;
    margin-bottom: 10px;
  }

  .stats {
    display: flex;
  }
`;


function ThreadLink({threadId, threadTitle, threadData}){
  return (
    <Link
      to={{
        pathname: `forum/thread/${threadId}`,
        state: { thread: threadData },
      }}>
      {threadTitle}
    </Link>
  )
}


function PostPreviewAuthorImg({author}){
  const name = author.split(' ');
  const initials = name[0].slice(0, 1) + name[1].slice(0, 1);
  const authorImgStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    fontSize: '15px',
    marginRight: '15px',
    fontWeight: '800',
    fontStyle: 'normal',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '20px',
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={authorImgStyle}>
        {initials}
      </div>
    </div>
  )
}

class PostPreview extends React.Component {
  constructor(props) {
    super(props);
    const { authorName } = props.thread;
    const splitedName = authorName.split(' ');
    const profileLetters = splitedName[0].slice(0, 1) + splitedName[1].slice(0, 1);
    this.state = {
      profileLetters,
      navigate: false,
      referrer: null,
    };

    this.getComment = this.getComment.bind(this);
  }

  componentDidMount() {
    // this.getComment();
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  getComment() {
    window.firebase.firestore()
      .collection('comments')
      .doc(this.props.thread.comments[0])
      .get()
      .then((doc) => {
        if (doc.exists) {
          const commentData = doc.data();
          this.setState({ commentData })
        }
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  };

  render() {
    return (
        <PreviewContainer>
          <div style={{
            display: 'flex',

          }}>
          <PostPreviewAuthorImg
            author={this.props.postAuthor}
          />
            <div>
              <div>
                <h2>
                  <ThreadLink
                    threadId={this.props.postId}
                    threadTitle={this.props.postTitle}
                    threadData={this.props.thread}
                  />
                </h2>
              </div>

              <div>
                <span className='post-author'>
                  by <em>{this.props.postAuthor}</em>
                </span>

                <span className='post-date'>
                  on <em>{this.props.postDate}</em>
                </span>
              </div>
            </div>
          </div>

          <div className='stats'>
            {this.state.commentData && (
              <ReactionsView
                commentId={this.props.thread.comments[0]}
                totalComments={this.props.thread.comments.length}
                commentData={this.state.commentData}
              />
            )}

            {this.state.commentData && (
              <ReactionPicker
                commentData={this.state.commentData}
                commentId={this.props.thread.comments[0]}
                user={this.props.user}
              />
            )}
          </div>
        </PreviewContainer>
    )
  }
}

export default PostPreview;
