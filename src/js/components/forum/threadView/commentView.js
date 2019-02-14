// IronHacks Platform
// commentView.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Router
import { Redirect } from 'react-router-dom';
//Showdown (markdown converter)
import Showdown from 'showdown';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Components
import ReactionsView from '../reactionsView.js';
import ReactionPicker from '../reactionPicker.js';
import TrashIcon from '..//img/trash.svg';
//Custom Constants
import * as Constants from '../../../../constants.js';

const theme = Constants.CommentViewTheme;

const CommentContainer = styled('div')`
  position: relative;
  height: ${props => props.theme.containerHeight};
  border-radius: ${Constants.universalBorderRadius};
  background-color: ${props => props.theme.backgroundColor};
  margin-bottom: ${Constants.commentViewBottomMargin};
  padding: 10px 15px 10px 15px;

  .comment-content {
    overflow: hidden;

    img {
      width: 100%;
    }
  }
`;
const Separator = styled('div')`
  height: 1px;
  background-color: ${props => props.theme.separatorBgColor};
  margin-top: 10px;
  margin-bottom: 10px;
`;

const UserName = styled('div')`
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
    line-height: 15px;
    margin: 0
  }
`;
const UserImage = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  margin-right: 15px;
  font-weight: 800;
  font-style: normal;
  background-color: #FFCE35;
  border-radius: 20px;
`;

const ConverterConfig = {
  tables: true,
  simplifiedAutoLink: true,
  prefixHeaderId: true, //Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section' prefix.
  strikethrough: true, //Enable support for strikethrough syntax. ~~strikethrough~~ as <del>strikethrough</del>
  headerLevelStart: 3, // #foo parse to <h3>foo</h3>
  tasklists: true,
};


const DeleteButton = styled('button')`
  position: absolute;
  top: 0;
  right: 70px;
  height: 30px;
  display: flex;
  align-items: center;
  margin-top: 5px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-radius: ${Constants.universalBorderRadius};
  transition: background-color 0.3s;

  img {
    height: 25px;
    width 25px;
    object-fit: contain;
  }

  &:hover {
    background-color: #ffe085;
  }
`;

//Comment view Props (inside commentData):
/*
* authorName : String = The name of the autor.
* body : String = The content of the comment.
* date : TimeStamp = The date when the comment was done.
* reaction : [Reaction] = An array with all the reactions made.
*/
class CommentView extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;
    const { authorName } = props.commentData;
    const splitedName = authorName.split(' ')
    const profileLetters = splitedName[0].slice(0, 1) + splitedName[1].slice(0, 1)
    this.state = {
      user,
      profileLetters,
    };


    this.firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    this.firestore.settings(settings);
  }
  
  decodeBody = (markdown) => {
    const converter = new Showdown.Converter(ConverterConfig);
    return converter.makeHtml(markdown)
  };
  // base64 encoded ascii to ucs-2 string
  atou = (str) => {
    return decodeURIComponent(escape(window.atob(str)));
  };

  deleteComment = () => {
    console.log(this.props)
    if(this.props.title) {
      //Is the head, must delete the whole thread.
      this.deleteThread()
    } else {
      this.deleteSingleComment()
    }
  }

  deleteThread = () => {
    const threadRef = this.firestore.collection("threads").doc(this.props.commentData.threadId);
    threadRef.get()
    .then((doc) => {
      const threadData = doc.data();
      const comments = threadData.comments;
      Promise.all(
        // Array of Promises
        comments.map(commentId => this.deleteSingleComment(commentId))
      )
      .then(() => {
        threadRef.delete()
        .then(() => {
          this.setState({navigateToForum: true});
        });
      })
      .catch((error) => {
        console.log(`Something failed: `, error.message)
      });
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });

  }

  deleteSingleComment = (comment) => {
    const _this = this;
    const commentId = comment || this.props.commentData.id
    const threadRef = this.firestore.collection("threads").doc(this.props.commentData.threadId);
    return threadRef.get()
    .then((doc) => {
      const threadData = doc.data();
      threadData.comments = threadData.comments.filter((comment) => (comment !== commentId));
      threadRef.update(threadData);
      return _this.firestore.collection("comments")
      .doc(commentId)
      .delete()
      .then(() => {
        if ( !comment )
          _this.props.reloadComments();
      }).catch(function(error) {
        console.error("Error adding document: ", error);
      });
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };

  render() {
    if (this.state.navigateToForum) return <Redirect push to='/forum'/>;

    return (
      <ThemeProvider theme={theme}>
        <CommentContainer>
          <UserName>
            <UserImage>{this.state.profileLetters}</UserImage>
            <span>{this.props.commentData.authorName}</span>
          </UserName>
          <Separator/>
          <h2>{this.props.title}</h2>
          <div className='comment-content' dangerouslySetInnerHTML={{__html:this.decodeBody(this.atou(this.props.commentData.body))}}/>
          <Separator/>
          <ReactionsView 
            commentData={this.props.commentData}
          />
          <ReactionPicker/>
          {this.props.commentData.author === this.state.user.uid && 
            <DeleteButton><img src={TrashIcon} alt="trash-icon" onClick={this.deleteComment}/></DeleteButton>
          }
        </CommentContainer>
      </ThemeProvider>
    );
  }
}

export default CommentView;