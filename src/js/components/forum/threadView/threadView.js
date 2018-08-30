// IronHacks Platform
// threadView.js - Here is where a user is directed when he clicks on a thread from the forum. 
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom constants
import * as Constants from '../../../../constants.js';
//Custom components
import CommentView from './commentView.js';
import MarkdownEditor from '../../markdownEditor/markdownEditor.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
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
  height: 255px;
  padding: 0px;
`;

class ThreadView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loadingComments: true,
      threadHead: null,
      comments: [],
    }

  }
  //Route props
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount(){
    this.getComments()
  }
  //This functions get all the comments from a specific thread.
  //TODO: We are asking for the thread twice, one on the main forum and second here, we must reduce that to one query.
  //TODO:  This query is not efficient when the db has a good amount of comments, we must find a way to make it scalable.
  getComments = () => {
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;

    firestore.collection('comments').where('threadId', '==', this.props.match.params.threadId).orderBy('createdAt', 'asc').get()
    .then(function(querySnapshot) {
        var comments = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          comments.push(doc);
        });
        //Setting the head
        _this.setState({threadHead: comments.shift()});
        //updating the rest of the comments:
        _this.setState((prevState, props) => {
          return({comments: comments})
        });

    })
    .catch(function(error) {
        console.log('Error getting documents: ', error);
    });
  };
  //Saving the current content of the editor on the component state.
  onEditorChange = (markdown) => {
    this.setState({markdown: markdown});
  }
  //This function handle the sumbit process
  handleSubmit = () => {
    //Getting the current user referece:
    const userId = window.firebase.auth().currentUser.uid;
    const userName = window.firebase.auth().currentUser.displayName;
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    firestore.collection("comments").add({
      author: userId,
      authorName: userName,
      body: _this.state.markdown,
      createdAt: Date.now(),
      threadId: this.props.match.params.threadId,  
    }) // Adding double reference on the thread.
    .then(function(docRef) {
      firestore.collection("threads").doc(_this.props.match.params.threadId).update({
        comments: window.firebase.firestore.FieldValue.arrayUnion(docRef.id),
      })
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
      <SectionContainer className="container-fluid d-flex flex-column">
          <div className="row flex-grow-1">
            <ThreadSection className='col-md-8 offset-md-2'>
              {this.state.threadHead && <CommentView commentData={this.state.threadHead.data()}/>}
              <SectionSeparator/>
              {this.state.comments.map((comment, index) => (
                <CommentView commentData={comment.data()} key={comment.id} /> 
              ))}
            </ThreadSection>
          </div>     
          <div className='row'>
            <CommentEditor className='col-md-7 offset-md-2'>
              <MarkdownEditor editorLayout='tabbed' onEditorChange={this.onEditorChange}/>
            </CommentEditor>
          <div className='col-md-1'>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

const ThreadViewWithRouter = withRouter(ThreadView);

export default ThreadViewWithRouter;