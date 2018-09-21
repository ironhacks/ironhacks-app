// IronHacks Platform
// createThread.js - Editor to create a new Thread 
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
//Custom components
import MarkdownEditor from '../markdownEditor/markdownEditor.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
`;
//Title controls
const TitleRow = styled('div')`
  width: 100%;
  margin-top: 10px;
`;
//Publish controls row
const PublishControlsRow = styled('div')`
  width 100%;
  height: 70px;
  padding: 15px 0 15px 0;
  display: flex;
  flex-direction: row-reverse;

  button {
    height: 100%;
  }
`;
//Title intpu
const TitleInput = styled('input')`
  width: 50%;
  height: 30px;
  background-color: #F2F2F2;
  border: 1px solid #999999;
  border-radius: ${Constants.universalBorderRadius};
  padding-left: 10px;
  margin-bottom: 10px;

`;

class NewThread extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      submit: false,
      titleValue: "",
      mustNavigate: false,
    };
  };
  
  //This callback report if the title input state change
  titleEventHandler = (event) => {
    this.setState({titleValue: event.target.value});
    this.enableSubmitButton();
  };
  //This function enable or disable the submit button based on the fields content.
  enableSubmitButton = () => {
    this.setState((prevState, props) => {
      if(prevState.titleValue !== ""){
        return {submit: true};
      }else{
        return {submit: false};
      }
    })
  };

  onEditorChange = (markdown) => {
    this.setState({markdown: markdown});
  };

  //This function handle the sumbit process
  handleSubmit = (event) => {
    event.preventDefault();
    //Getting the current user referece:
    const userId = window.firebase.auth().currentUser.uid;
    const userName = window.firebase.auth().currentUser.displayName;
    const currentDate = Date.now(); //We use the same date in both the thread and the comment, so on the db the stats show that they were created at the same time.
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    const codedBody = this.utoa(this.state.markdown);
    //TODO: add forum id
    firestore.collection("threads").add({
      title: this.state.titleValue,
      author: userId,
      authorName: userName,
      createdAt: currentDate,
    })
    .then(function(docRef) {
      const threadRef = docRef.id;
      firestore.collection("comments").add({
        author: userId,
        authorName: userName,
        body: codedBody,
        createdAt: currentDate,
        threadId: docRef.id,  
      }) // Adding double reference on the thread.
      .then(function(docRef) {
        console.log(threadRef)
        firestore.collection("threads").doc(threadRef).update({
          comments: [docRef.id],
        })
        _this.setState({mustNavigate: true, threadRef: threadRef});
      })
    })  
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };
  // ucs-2 string to base64 encoded ascii
  utoa = (str) => {
      return window.btoa(unescape(encodeURIComponent(str)));
  };

  render() {
    if (this.state.mustNavigate) return <Redirect to={{ pathname: '/forum/thread/' + this.state.threadRef, state: { title: this.state.titleValue}}}/>;
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer className='container-fluid d-flex flex-column'>
          <div className='row'>
            <TitleRow className='col-md-10 offset-md-1'>
              <h1>New Thread</h1>
              <p> Bellow you will find a <strong><i>Markdown Editor</i></strong>, so you can style your Thread using Markdown syntax (If you don't know Markdown, please check <a target="_blank" rel="noopener noreferrer" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">this!</a>). Write on the left, you will see the preview on the right.</p>
              <TitleInput type='text' placeholder='Thread Title..' onChange={this.titleEventHandler}/>
            </TitleRow>
          </div>
          <div className='row flex-grow-1'>
            <div className='col-md-10 offset-md-1'>
              <MarkdownEditor editorLayout='horizontal' onEditorChange={this.onEditorChange}/>
            </div>
          </div>
          <div className='row'>
            <PublishControlsRow className='col-md-10 offset-md-1'>
              <button disabled={!this.state.submit} onClick={this.handleSubmit}>Submit</button>
            </PublishControlsRow>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default NewThread;