import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Button from '../../util/button.js';
import CommentView from './forum-comment-view';
import MarkdownEditor from '../../components/markdownEditor/markdownEditor.js';
import { Theme } from '../../theme';
const styles = Theme.STYLES.AppSectionTheme;
// const units = Theme.UNITS;
const colors = Theme.COLORS;


// Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 0 10%;
  overflow: auto;

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

const ThreadSection = styled('div')`
  margin-top: 20px;
  overflow: auto;
`;

const SectionSeparator = styled('div')`
  background-color: ${colors.mainBgColor}
  height: 1px;
  width 100%;
  margin-top: calc(${colors.threadPreviewBottomMargin} + 10px);
  margin-bottom: calc(${colors.threadPreviewBottomMargin} + 10px);
`;

class ThreadView extends React.Component {
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
      user,
    };


    this.firestore = window.firebase.firestore();

    this.getComments = this.getComments.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getThreadData = this.getThreadData.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  componentDidMount() {
    if (!this.state.thread) {
      this.getThreadData();
    } else {
      this.getComments();
    }
  }

  getThreadData() {
    const threadId = this.threadId;

    window.firebase.firestore()
      .collection('threads')
      .doc(threadId)
      .get()
      .then((doc) => {
        const thread = doc.data();
        thread.id = doc.id;

        this.setState(
          { thread },
          this.getComments()
        )
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      })
  };

  getComments() {
    window.firebase.firestore()
      .collection('comments')
      .where('threadId', '==', this.threadId)
      .orderBy('createdAt', 'asc')
      .get()
      .then((querySnapshot) => {
        const comments = [];
        let head;

        querySnapshot.forEach((doc) => {
          const comment = doc.data();
          comment.id = doc.id;
          if (comment.forumId) {
            head = comment;
          } else {
            comments.push(comment);
          }
        })

        this.setState((prevState, props) => {
          return { head, comments }
        })
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  };

  onEditorChange(markdown) {
    this.setState({
      markdown: markdown
    })
  }

  handleSubmit() {
    const currentUser = window.firebase.auth().currentUser
    const userId = currentUser.uid;
    const userName = currentUser.displayName;

    const codedBody = this.utoa(this.state.markdown);

    const comment = {
      author: userId,
      authorName: userName,
      body: codedBody,
      createdAt: new Date(),
      threadId: this.threadId,
    }

    window.firebase.firestore()
      .collection('comments')
      .add(comment)
      .then((docRef) => {

        const commentId = docRef.id;

        window.firebase.firestore()
          .collection('threads')
          .doc(this.threadId)
          .update({
            comments: window.firebase.firestore.FieldValue.arrayUnion(commentId),
          })
          .then((result) => {
            console.log('thread update result', result);
            this.getComments();
          })
          .catch(function(error) {
            console.error('Error adding threads document: ', error)
          })

      })
      .catch(function(error) {
        console.error('Error adding commends document: ', error)
      })
  }


  utoa(str) {
    if (!str){
      return false;
    }
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  render() {
    return (
      <ThemeProvider theme={styles}>
        <SectionContainer>

          <ThreadSection>
            {this.state.head && (
              <CommentView
                commentData={this.state.head}
                title={this.state.thread.title}
                user={this.state.user}
                reloadComments={this.getComments}
              />
            )}

            <SectionSeparator />

            {this.state.comments.map((comment, index) => (
              <CommentView
                key={comment.id}
                commentData={comment}
                user={this.state.user}
                reloadComments={this.getComments}
              />
            ))}
          </ThreadSection>

          <MarkdownEditor
            editorLayout='tabbed'
            onEditorChange={this.onEditorChange}
          />

          <div className='control'>
            <Button primary width='150px' onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

const ThreadViewWithRouter = withRouter(ThreadView);

export default ThreadViewWithRouter;
