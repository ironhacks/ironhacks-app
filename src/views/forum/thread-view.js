import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PostView from '../../components/forum/post-view';
import { CommentView } from '../../components/forum/comment-view';
import { CommentEditor } from '../../components/forum/comment-editor';
import { userMetrics } from '../../util/user-metrics'
import { Row } from '../../components/layout';

class ThreadView extends Component {
  constructor(props) {
    super(props);
    const { user } = props;

    this.hackId = this.props.match.params.hackId;
    this.threadId = this.props.match.params.threadId;

    let postData = null

    if (this.props.location.state) {
      postData = this.props.location.state.postData
    }

    this.postRef = window.firebase.firestore()
      .collection('hacks')
      .doc(`${this.props.hackId}/forums/general/posts/${this.threadId}`)

    this.state = {
      loadingComments: true,
      thread: this.threadId,
      head: null,
      comments: [],
      markdown: '',
      user,
      postData: postData,
    }
  }

  componentDidMount() {
    userMetrics({event: 'view_post'})

    if (!this.state.postData) {
      this.getPostData()
    } else {
      this.getComments()
    }
  }

  getPostData = () => {
    this.postRef
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
    this.postRef
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .get()
      .then((docs) => {
        const comments = [];
        docs.forEach((doc) => {
          const data = doc.data();
          console.log('comment', data);
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



  render() {
    return (
        <Row>
          <div className="mt-2">
            {this.state.postData && (
              <PostView
                postId={this.threadId}
                postRef={this.postRef}
                title={this.state.postData.title}
                body={this.state.postData.body}
                data={this.state.postData}
                user={this.state.user}
                reloadComments={this.getComments}
              />
            )}

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
              postId={this.threadId}
              postRef={this.postRef}
              hackId={this.props.hackId}
              refreshComments={this.getComments}
              user={this.state.user}
            />
          )}
      </Row>
    )
  }
}

export default withRouter(ThreadView)
