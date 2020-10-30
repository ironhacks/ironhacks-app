import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../util/button.js';
import MarkdownEditor from '../../components/markdown-editor';
import { userMetrics } from '../../util/user-metrics'

const AvailableActionsDiv = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  height: 50px;
`;

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


class ThreadEditView extends Component {
  constructor(props) {
    super(props);
    const { user } = props;

    this.hackId = this.props.match.params.hackId;
    this.threadId = this.props.match.params.threadId;
    this.state = {
      content: '',
      thread: this.threadId,
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
        post.body = this.decodeDocument(post.body);
        this.setState({
          postData: post,
          content: post.body,
        });
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      })
  };

  onEditorChange = markdown => {
    this.setState({
      content: markdown
    })
  };

  cancelSubmit() {
    let path = window.location.pathname.split('/').slice(0,-1).join('/');
    window.location = path;
  }

  utoa(str) {
    if (!str){
      return false;
    }
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  updatePost = () => {
    userMetrics({event: 'edit_forum_post'})
    const encodedBody = this.encodeDocument(this.state.content);

    if (this.state.postRef) {
      this.state.postRef
        .update({
          body: encodedBody,
          updatedAt: new Date(),
        })
        .then((docRef) => {
          window.location = window.location.pathname.split('/').slice(0,-1).join('/');
        })
        .catch(function(error) {
          console.error('Error adding commends document: ', error)
        })
    }
  };

  encodeDocument(str) {
    let safeString = unescape(encodeURIComponent(str));
    return window.btoa(safeString);
  }

  decodeDocument(enc) {
    let decoded = window.atob(enc);
    return decodeURIComponent(escape(decoded));
  }

  render() {
    return (
        <SectionContainer>
          <div className="mt-2">
            {this.state.postData && (
              <>

              <h2 className="h2">
                {this.state.postData.title}
              </h2>

              <MarkdownEditor
                editorLayout='tabbed'
                height={450}
                value={this.state.content}
                onEditorChange={this.onEditorChange}
              />
              </>
            )}
          </div>

          <AvailableActionsDiv>
            <Button primary width='150px' onClick={this.updatePost}>
              Update
            </Button>

            <Button width='150px' onClick={this.cancelSubmit}>
              Cancel
            </Button>
          </AvailableActionsDiv>
        </SectionContainer>
    )
  }
}

export default withRouter(ThreadEditView)
