// IronHacks Platform
// threadView.js - Here is where a user is directed when he clicks on a thread from the forum.
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import {withRouter} from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
// Custom constants
import * as Constants from '../../../../constants.js';
// Custom components
import Button from '../../../utilities/button.js';
import CommentView from './commentView.js';
import MarkdownEditor from '../../markdownEditor/markdownEditor.js';

const theme = Constants.AppSectionTheme;

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
// First comment view (this is the author's comment)
const ThreadSection = styled('div')`
margin-top: 20px;
  overflow: auto;
`;
const SectionSeparator = styled('div')`
  background-color: ${Constants.mainBgColor}
  height: 1px;
  width 100%;
  margin-top: calc(${Constants.threadPreviewBottomMargin} + 10px);
  margin-bottom: calc(${Constants.threadPreviewBottomMargin} + 10px);
`;

class ThreadView extends React.Component {
  constructor(props) {
    super(props);
    const {user} = props;
    this.state = {
      loadingComments: true,
      thread: this.props.location.state.thread || null,
      head: null,
      comments: [],
      user,
    };

    this.firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    this.firestore.settings(settings);
  };

  componentDidMount() {
    if (!this.state.thread) {
      this.getThreadData();
    } else {
      this.getComments();
    }
  };

  getThreadData = () => {
    const _this = this;
    this.firestore.collection('threads')
        .doc(this.props.match.params.threadId)
        .get()
        .then((doc) => {
          const thread = doc.data();
          thread.id = doc.id;
          _this.setState({thread}, _this.getComments());
        })
        .catch(function(error) {
          console.error('Error getting documents: ', error);
        });
  };
  // This functions get all the comments from a specific thread.
  getComments = () => {
    const _this = this;
    this.firestore.collection('comments')
        .where('threadId', '==', this.props.match.params.threadId)
        .orderBy('createdAt', 'asc')
        .get()
        .then(function(querySnapshot) {
          const comments = [];
          let head;
          querySnapshot.forEach(function(doc) {
            const comment = doc.data();
            comment.id = doc.id;
            if (comment.forumId) {
              head = comment;
            } else {
              comments.push(comment);
            }
          });
          // updating the rest of the comments:
          _this.setState((prevState, props) => {
            return ({
              head,
              comments,
            });
          });
        })
        .catch(function(error) {
          console.error('Error getting documents: ', error);
        });
  };
  // Saving the current content of the editor on the component state.
  onEditorChange = (markdown) => {
    this.setState({markdown: markdown});
  };
  // This function handle the sumbit process
  handleSubmit = () => {
    // Getting the current user referece:
    const userId = window.firebase.auth().currentUser.uid;
    const userName = window.firebase.auth().currentUser.displayName;
    const _this = this;
    const codedBody = this.utoa(this.state.markdown);
    const comment = {
      author: userId,
      authorName: userName,
      body: codedBody,
      createdAt: new Date(),
      threadId: this.props.match.params.threadId,
    };
    this.firestore.collection('comments')
        .add(comment)
        .then((docRef) => {
          _this.firestore.collection('threads')
              .doc(_this.props.match.params.threadId)
              .update({
                comments: window.firebase.firestore.FieldValue.arrayUnion(docRef.id),
              })
              .then((result) => {
                _this.getComments();
              })
              .catch(function(error) {
                console.error('Error adding document: ', error);
              });
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
  };
  // TODO: utoa and atou are defined on more than 1 component, we should put this in toher place, like an 'Utilities' in other to avoid this multiple definitions.
  // ucs-2 string to base64 encoded ascii
  utoa = (str) => {
    return window.btoa(unescape(encodeURIComponent(str)));
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <ThreadSection>
            {this.state.head &&
            <CommentView
              commentData={this.state.head}
              title={this.state.thread.title}
              user={this.state.user}
              reloadComments={this.getComments}/>}
            <SectionSeparator/>
            {this.state.comments.map((comment, index) => (
              <CommentView
                key={comment.id}
                commentData={comment}
                user={this.state.user}
                reloadComments={this.getComments}/>
            ))}
          </ThreadSection>
          <MarkdownEditor editorLayout='tabbed' onEditorChange={this.onEditorChange}/>
          <div className='control'>
            <Button primary width='150px' onClick={this.handleSubmit}>Submit</Button>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

const ThreadViewWithRouter = withRouter(ThreadView);

export default ThreadViewWithRouter;
