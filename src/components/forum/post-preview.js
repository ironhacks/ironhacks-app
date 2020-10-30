import { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactionsView from './reaction-view';
import ReactionPicker from './reaction-picker';


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


function PostPreviewAuthorImg({initials}){
  return (
    <div className="flex flex-align-center">
      <div className="author-img">
        {initials}
      </div>
    </div>
  )
}

class PostPreview extends Component {
  constructor(props) {
    super(props);
    const { authorName } = props.thread;
    const name = authorName.split(' ');
    const initials = name[0].slice(0, 1) + name[1].slice(0, 1);

    this.state = {
      navigate: false,
      referrer: null,
      authorInitials: initials,
      authorName: authorName,
      authorFirstName: name[0],
    };
  }

  getComment = () => {
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
      })
  };

  render() {
    return (
        <div className="post-preview">
          <div className="flex">
            <PostPreviewAuthorImg
              initials={this.state.authorInitials}
            />

            <div>
              <h2>
                <ThreadLink
                  threadId={this.props.postId}
                  threadTitle={this.props.postTitle}
                  threadData={this.props.thread}
                />
              </h2>
              <div>
                <span className='post-author'>
                  by <em>{this.state.authorFirstName}</em>
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
        </div>
    )
  }
}

export default PostPreview;
