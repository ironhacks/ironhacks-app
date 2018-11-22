// IronHacks Platform
// createThread.js - Editor to create a new Thread 
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
//Custom components
import ForumSelector from './forumSelector.js'
import MarkdownEditor from '../markdownEditor/markdownEditor.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  overflow: auto;
`;
//Title controls
const TitleRow = styled('div')`
  width: 100%;
  margin-top: 10px;
`;
const Header = styled('div')`
  width 100%;
  min-height: 20vh;
`;
const EditorContainer = styled('div')`
  width 100%;
  min-height: 60vh;
`;
const AdminSection = styled('div')`
  display: flex;
  flex-direction: column;
  width 100%;
  padding: 10px 15px;
  margin: 15px 0;
  background-color: #FEF8ED;
  border-radius: ${Constants.universalBorderRadius};
  border-top: solid 1px ${Constants.mainBgColor};
  border-bottom: solid 1px ${Constants.mainBgColor};

  .hackSelector {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;

    span {
      margin-left: 20px;

      &:first-child{
        margin: 0;
      }
    }

    input {
      margin-left: 20px;
    }
  }
`;
//Publish controls row
const PublishControlsRow = styled('div')`
  width 100%;
  min-height: 70px;
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
    const { cookies } = props;
    this.state = {
      submit: false,
      titleValue: "",
      mustNavigate: false,
      selectedHack: 0,
      selectedForum: 0,
      currentHack: cookies.get('currentHack') || null,
      forum: cookies.get('currentForum') || null,
      user: this.props.user
    };    
    this.firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    this.firestore.settings(settings);
  };

  componentDidMount(){
    if(this.props.user.isAdmin){
      this.getHacks();
    };
  }
  
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
    console.log(this.state)
    event.preventDefault();
    let hackId, forumId;
    if(this.props.user.isAdmin){
      hackId = this.state.hacks[this.state.selectedHack].id;
      forumId = this.state.hacks[this.state.selectedHack].forums[this.state.selectedForum].id
    }else{
      hackId = this.state.currentHack;
      forumId = this.state.forum;
    }


    const currentDate = Date.now(); //We use the same date in both the thread and the comment, so on the db the stats show that they were created at the same time.
    const _this = this;
    const codedBody = this.utoa(this.state.markdown);
    //TODO: add forum id
    this.firestore.collection("threads").add({
      title: this.state.titleValue,
      author: this.props.user.uid,
      authorName: this.props.user.displayName,
      createdAt: currentDate,
      hackId: hackId,
      forumId: forumId,
    })
    .then(function(docRef) {
      const threadRef = docRef.id;
      _this.firestore.collection("comments").add({
        author: _this.props.user.uid,
        authorName: _this.props.user.displayName,
        body: codedBody,
        createdAt: currentDate,
        threadId: docRef.id,
        forumId: forumId,  
      }) // Adding double reference on the thread.
      .then(function(docRef) {
        _this.firestore.collection("threads").doc(threadRef).update({
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

  //---------------------------------------- Admin features ------------------------------------------

  //Query all the hacks objects from the db.
  getHacks = () => {
    const _this = this;
    var hacks = [];
    this.firestore.collection("hacks")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const hackData = doc.data()
        hackData.id = doc.id;  
        hacks.push(hackData);
        _this.firestore.collection('adminHackData').doc(doc.id)
      });
      _this.setState({hacks: hacks});
      _this.getForums();
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  };

  getForums = (hackIndex) => {
    const _this = this;
    const forums = [];
    const index = hackIndex ? hackIndex : 0;
    this.firestore.collection('forums')
    .where('hack', '==', this.state.hacks[index].id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const forum = doc.data();
        forum.id = doc.id;
        forums.push(forum);
      });
      _this.setState((prevState, props) => {
        prevState.hacks[index].forums = forums;
        return prevState;
      })
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  };

  onHackSelection = (hackIndex) => {
    if(this.state.hacks[hackIndex].forums){
      this.setState({selectedHack: hackIndex});
    }else{
      this.setState({selectedHack: hackIndex});
      this.getForums(hackIndex);
    };
  };

  onForumSelection = (forumIndex) => {
    this.setState({selectedForum: forumIndex})
  }

//---------------------------------------- Admin features ------------------------------------------

  render() {
    if (this.state.mustNavigate) return <Redirect to={{ pathname: '/forum/thread/' + this.state.threadRef, state: { title: this.state.titleValue}}}/>;
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer className='container-fluid'>
          <Header className='row'>
            <TitleRow className='col-md-10 offset-md-1'>
              <h1>New Thread</h1>
              <p> Bellow you will find a <strong><i>Markdown Editor</i></strong>, so you can style your Thread using Markdown syntax (If you don't know Markdown, please check <a target="_blank" rel="noopener noreferrer" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">this!</a>). Write on the left, you will see the preview on the right.</p>
              <TitleInput type='text' placeholder='Thread Title..' onChange={this.titleEventHandler}/>
              {this.props.user.isAdmin && 
              <AdminSection>
                <div>
                  <h3>Admin Tools</h3>
                  <p> Here you can pick on which hack and forum you will post your thread. You can also pin a post from here. (A pinned post will appear at the top of the forum, as a good practice, try to avoid having more than 3 pinned posts.)</p>
                </div>
                <div className='hackSelector'>
                <span>Hack:</span>
                {this.props.user.isAdmin 
                && this.state.hacks 
                && <ForumSelector onSelection={this.onHackSelection} selector={this.state.hacks}/>}
                <span>Forum:</span>
                {this.props.user.isAdmin 
                  && this.state.hacks 
                  && this.state.hacks[this.state.selectedHack].forums
                  && <ForumSelector onSelection={this.onForumSelection} selector={this.state.hacks[this.state.selectedHack].forums}/>}
                <input type='checkbox'/>
                <span>Pin this thread.</span>
                </div>
              </AdminSection>
              }
            </TitleRow>
          </Header>
          <EditorContainer className='row'>
            <div className='col-md-10 offset-md-1'>
              <MarkdownEditor editorLayout='tabbed' onEditorChange={this.onEditorChange}/>
            </div>
          </EditorContainer>
          <PublishControlsRow className='row'>
            <div className='col-md-10 offset-md-1'>
              <button disabled={!this.state.submit} onClick={this.handleSubmit}>Submit</button>
            </div>
          </PublishControlsRow>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(NewThread);