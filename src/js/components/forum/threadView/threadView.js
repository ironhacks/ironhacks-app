// IronHacks Platform
// threadView.js - Here is where a user is directed when he clicks on a thread from the forum. 
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom constants
import * as Constants from '../../../../constants.js';
//Custom components
import Button from '../../../utilities/button.js';
import CommentView from './commentView.js';
import MarkdownEditor from '../../markdownEditor/markdownEditor.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  overflow: auto;

  .editor {
    margin: 20px 0;

    .control {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 10px;
    }
  }
`;
//First comment view (this is the author's comment)
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
const CommentEditor = styled('div')`
  height: 150px;
  padding: 0px;
`;

class ThreadView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loadingComments: true,
      thread: this.props.location.state.thread || null,
      threadHead: null,
      comments: [],
    };

    this.firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    this.firestore.settings(settings);
  };

  componentDidMount(){
    this.getComments();
  };
  //This functions get all the comments from a specific thread.
  //TODO: We are asking for the thread twice, one on the main forum and second here, we must reduce that to one query.
  //TODO:  This query is not efficient when the db has a good amount of comments, we must find a way to make it scalable.
  getComments = () => {
    const _this = this;
    this.firestore.collection('comments')
    .where('threadId', '==', this.props.match.params.threadId)
    .orderBy('createdAt', 'asc')
    .get()
    .then(function(querySnapshot) { 
        const comments = [];
        querySnapshot.forEach(function(doc) {
          const comment = doc.data();
          comment.id = doc.id;
          // doc.data() is never undefined for query doc snapshots
          comments.push(comment);
        });
        //Setting the head
        _this.setState({threadHead: comments.shift()});
        //updating the rest of the comments:
        _this.setState((prevState, props) => {
          return({comments: comments})
        });
      })
      .catch(function(error) {  
          console.error('Error getting documents: ', error);
      });
    };
  //Saving the current content of the editor on the component state.
  onEditorChange = (markdown) => {
    this.setState({markdown: markdown});
  };
  //This function handle the sumbit process
  handleSubmit = () => {
    //Getting the current user referece:
    const userId = window.firebase.auth().currentUser.uid;
    const userName = window.firebase.auth().currentUser.displayName;
    const _this = this;
    const codedBody = this.utoa(this.state.markdown);
    const comment = {
      author: userId,
      authorName: userName,
      body: codedBody,
      createdAt: Date.now(),
      threadId: this.props.match.params.threadId,  
    }
    this.firestore.collection("comments")
    .add(comment)
    .then((docRef) => {
      _this.firestore.collection("threads")
      .doc(_this.props.match.params.threadId)
      .update({
        comments: window.firebase.firestore.FieldValue.arrayUnion(docRef.id),
      })
      .then((result) => {
        _this.setState((prevState, props) => {
          prevState.comments.push(comment);
          return prevState;
        })
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };
  //TODO: utoa and atou are defined on more than 1 component, we should put this in toher place, like an 'Utilities' in other to avoid this multiple definitions.
  // ucs-2 string to base64 encoded ascii
  utoa = (str) => {
      return window.btoa(unescape(encodeURIComponent(str)));
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
      <SectionContainer className="container-fluid">
        <div className="row no-gutters">
          <ThreadSection className='col-md-8 offset-md-2'>
            {this.state.threadHead && <CommentView commentData={this.state.threadHead} title={this.props.location.state.title}/>}
            <SectionSeparator/>
            {this.state.comments.map((comment, index) => (
              <CommentView commentData={comment} key={comment.id} /> 
            ))}
          </ThreadSection>
        </div>     
        <div className='row editor no-gutters'>
          <CommentEditor className='col-md-8 offset-md-2'>
            <MarkdownEditor editorLayout='tabbed' onEditorChange={this.onEditorChange}/>
          </CommentEditor>
          <div className='col-md-8 offset-md-2 control'>
            <Button primary onClick={this.handleSubmit}>Submit</Button>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

const ThreadViewWithRouter = withRouter(ThreadView);

export default ThreadViewWithRouter;