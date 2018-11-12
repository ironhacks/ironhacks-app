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
import TagView from './tagView.js';
import ReactionPicker from './reactionPicker.js';
//Custom Constants
import * as Constants from '../../../constants.js';

const theme = Constants.ThreadPreviewTheme;

const PreviewContainer = styled('div')`
  height: ${props => props.theme.containerHeight};
  border-radius: ${Constants.universalBorderRadius};
  background-color: ${props => props.theme.backgroundColor};
  margin-bottom: ${Constants.threadPreviewBottomMargin};
  padding: 0 15px 0 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.highlightedTextBgColor};
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 0;
    line-height: 15px;
  }

  span {
    font-style: italic;
    margin-bottom: 10px;
  }
`;
const Separator = styled('div')`
  height: 1px;
  background-color: ${props => props.theme.separatorBgColor};
  margin-bottom: 10px;
`;
// Right section
const RightAlignDiv = styled('div')`
  display: flex;
  justify-content: flex-end;
`;
//const tag = styled('div')`
  
//`;

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
    this.setState({referrer: 'forum/thread/' + this.props.thread.id});
  }
  
  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect push to={{ pathname: referrer, state: { thread: this.props.thread.data()}}} />;

    return (
      <ThemeProvider theme={theme}>
        <PreviewContainer to={'forum/thread/' + this.props.thread.id} onClick={this.handleClick}>
          <div className="row">
            <div className='col-6'>
              <h2>{this.props.thread.data().title}</h2>
              <span>{this.props.thread.data().authorName}</span>
            </div>
            <RightAlignDiv className='col-6'>
              <ReactionPicker/>
            </RightAlignDiv>
          </div>
          <div className="row">
            <div className='col-12'>
              <Separator/>
            </div>
          </div>
          <div className="row">
            <div className='col-6'>
              <ReactionsView/>
            </div>
            <RightAlignDiv className='col-6'>
              <TagView/>
            </RightAlignDiv>
          </div>
        </PreviewContainer>
      </ThemeProvider>
    );
  }
}

export default ThreadPreview;