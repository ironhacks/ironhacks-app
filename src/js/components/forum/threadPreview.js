// IronHacks Platform
// threadPreview.js - Preview that will be displayed on the Forum section
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
import PropTypes from 'prop-types';
//Router
import { Redirect } from 'react-router-dom';
//Custom Components
import ReactionsView from './reactionsView.js';
//Custom Constants
import * as Constants from '../../../constants.js';
import { registerStats } from '../../utilities/registerStat.js';

const theme = Constants.ThreadPreviewTheme;

const PreviewContainer = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${Constants.universalBorderRadius};
  background-color: ${props => props.theme.backgroundColor};
  margin-bottom: ${Constants.threadPreviewBottomMargin};
  padding: 10px 15px;
  transition: background-color 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.highlightedTextBgColor};
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 0;
    line-height: 15px;
  }

  .author-name {
    font-style: italic;
    margin-bottom: 10px;
  }
`;

const Separator = styled('div')`
  height: 1px;
  background-color: ${props => props.theme.separatorBgColor};
  margin-bottom: 10px;
`;

class ThreadPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      referrer: null,
    };
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
    this.setState({referrer: 'forum/thread/' + this.props.thread.id});
  }
  
  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect push to={{ pathname: referrer, state: { thread: this.props.thread}}} />;
    return (
      <ThemeProvider theme={theme}>
        <PreviewContainer to={'forum/thread/' + this.props.thread.id} onClick={this.handleClick}>
          <h2>{this.props.thread.title}</h2>
          <span className='author-name'>{this.props.thread.authorName}</span>
          <Separator/>
          <ReactionsView 
            commentId={this.props.thread.comments[0]}
            totalComments={this.props.thread.comments.length}
          />
        </PreviewContainer>
      </ThemeProvider>
    );
  }
}

export default ThreadPreview;