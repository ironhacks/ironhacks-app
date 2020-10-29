import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PostView from '../../components/forum/post-view';
import { CommentView } from '../../components/forum/comment-view';
import { CommentEditor } from '../../components/forum/comment-editor';
import { userMetrics } from '../../util/user-metrics'

// Section container
const SectionContainer = styled('div')`
  width: 100%;
  padding: 0 10%;

  .editor {
    margin: 20px 0;
  }

  .control {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

const SectionSeparator = styled('div')`
  height: 1px;
  width: 100%;
  margin-top: 15p;
  margin-bottom: 15px;
`;

class ThreadView extends Component {
  constructor(props) {
    super(props);
    const { user } = props;

    this.hackId = this.props.match.params.hackId;
    this.threadId = this.props.match.params.threadId;
    this.state = {
      loadingComments: true,
      thread: this.threadId,
      head: null,
      comments: [],
      markdown: '',
      user,
      postData: null,
      postRef: null,
    };

    // RECEIVE POST DATA FROM PREVIOUS ROUTE
    if (this.props.location.state){
      // console.log(this.props.location.state);
    }
  }

  componentDidMount() {
    userMetrics({event: 'view_post'})
    this.getPostData();
  }

  getPostData = () => {
    const threadId = this.threadId;
    const postRef = window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('forums')
      .doc('general')
      .collection('posts')
      .doc(threadId);

    this.setState({postRef: postRef});

    postRef
      .get()
      .then((doc) => {
        const post = doc.data();
        post.postId = doc.id;
        post.postRef = doc.ref;
        this.setState({postData: post});
        this.getComments()
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      })
  };

  getComments = () => {
    if (this.state.postRef) {
      this.state.postRef
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .get()
      .then((docs) => {
        const comments = [];
        docs.forEach((doc) => {
          const data = doc.data();
          data.commentId = doc.id;
          data.commentRef = doc.ref;
          comments.push(data);
        })
        this.setState({ comments: comments })
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      })
    }
  };


  render() {
    return (
        <SectionContainer>

          <div className="mt-2">
            {this.state.postData && (
              <PostView
                postId={this.state.postData.postId}
                postRef={this.state.postData.postRef}
                title={this.state.postData.title}
                body={this.state.postData.body}
                data={this.state.postData}
                user={this.state.user}
                reloadComments={this.getComments}
              />
            )}

            <SectionSeparator />

            {this.state.comments.map((comment, index) => (
              <CommentView
                key={comment.commentId}
                commentId={comment.commentId}
                commentRef={comment.commentRef}
                body={comment.body}
                data={comment}
                user={this.state.user}
                reloadComments={this.getComments}
              />
            ))}
          </div>

          {this.state.postData && (
            <CommentEditor
              userIsAdmin={this.props.userIsAdmin}
              postId={this.state.postData.postId}
              postRef={this.state.postRef}
              hackId={this.props.hackId}
              refreshComments={this.getComments}
              user={this.state.user}
            />
          )}
        </SectionContainer>
    )
  }
}

export default withRouter(ThreadView)
