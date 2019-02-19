  // IronHacks Platform
// threadPreview.js - Preview that will be displayed on the Forum section
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
import PropTypes from 'prop-types';
//Router
import { Link } from 'react-router-dom';
//Custom Components
import ReactionsView from './reactionsView.js';
import ReactionPicker from './reactionPicker.js';
//Custom Constants
import * as Constants from '../../../constants.js';
import { registerStats } from '../../utilities/registerStat.js';

const theme = Constants.ThreadPreviewTheme;

const PreviewContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${Constants.universalBorderRadius};
  background-color: white;
  margin-bottom: ${Constants.threadPreviewBottomMargin};
  padding: 10px 15px;
  border: 1px solid #DADADA;
  transition: background-color 0.2s;

    background-color: #fff8e4;
  :nth-child(odd) {
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
    line-height: 17px;

    a {
      color: black;
    }

    .author-name {
      font-weight: 600;
      font-style: italic;
      margin-bottom: 10px;
      font-size: 15px;
    }
  }
  
  .stats {
    display: flex;
  }

`;

const UserName = styled('div')`
  height: 60px;
  display: flex;
  align-items: center;
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

const Separator = styled('div')`
  height: 1px;
  background-color: ${props => props.theme.separatorBgColor};
  margin-bottom: 10px;
`;

class ThreadPreview extends React.Component {
  constructor(props) {
    super(props);
    const { authorName } = props.thread;
    const splitedName = authorName.split(' ')
    const profileLetters = splitedName[0].slice(0, 1) + splitedName[1].slice(0, 1)
    this.state = {
      profileLetters,
      navigate: false,
      referrer: null,
    };

    this.firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    this.firestore.settings(settings);
  }

  componentWillMount() {
    this.getComment();
  }

  static contextTypes = {
    router: PropTypes.object
  } 

  handleClick = () => {
    const statData = {
      userId: this.props.user.uid,
      event: 'on-thread-click',
      metadata: {
        location: 'forum',
        threadId: this.props.thread.id,
      },
    };
    registerStats(statData);
  }

  getComment = () => {
    const _this = this;
    this.firestore.collection('comments')
    .doc(this.props.thread.comments[0])
    .get()
    .then((doc) => {
      const commentData = doc.data();
      _this.setState({
        commentData,
      })
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  };
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <PreviewContainer>
          <UserName>
            <UserImage>{this.state.profileLetters}</UserImage>
            <h2><Link 
              to={{ pathname: `forum/thread/${this.props.thread.id}`, state: { thread: this.props.thread}}}
              onClick={this.handleClick}>{this.props.thread.title}
            </Link><br/>
            <span className='author-name'>Posted by: {this.props.thread.authorName}</span>
            </h2>
          </UserName>
          <Separator/>
          <div className='stats'>
          {this.state.commentData && 
            <ReactionsView 
              commentId={this.props.thread.comments[0]}
              totalComments={this.props.thread.comments.length}
              commentData={this.state.commentData}
            />
          }
          {this.state.commentData && 
            <ReactionPicker commentData={this.state.commentData}/>
          }
          </div>
        </PreviewContainer>
      </ThemeProvider>
    );
  }
}

export default ThreadPreview;
          // <ReactionPicker
          //   commentData={this.state.commentData}
          // />