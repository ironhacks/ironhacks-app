// IronHacks Platform
// commentView.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Components
import ReactionsView from '../reactionsView.js';
import TagView from '../tagView.js';
import ReactionPicker from '../reactionPicker.js';
//Custom Constants
import * as Constants from '../../../../constants.js';

const theme = Constants.CommentViewTheme;

const CommentContainer = styled('div')`
  height: ${props => props.theme.containerHeight};
  border-radius: ${Constants.universalBorderRadius};
  background-color: ${props => props.theme.backgroundColor};
  margin-bottom: ${Constants.commentViewBottomMargin};
  padding: 10px 15px 10px 15px;
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

  label {
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

//Comment view Props (inside commentData):
/*
* authorName : String = The name of the autor.
* body : String = The content of the comment.
* date : TimeStamp = The date when the comment was done.
* reaction : [Reaction] = An array with all the reactions made.
*
*
*
*/
class CommentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      referrer: null,
    };
  }

  handleClick = () => {
    console.log('Button is cliked!');
  }

  render() {

    return (
      <ThemeProvider theme={theme}>
        <CommentContainer onClick={this.handleClick}>
          <div className="row">
            <div className='col-6'>
              <h2>{this.props.commentData.authorName}</h2>
              <p>{this.props.commentData.body}</p>
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
        </CommentContainer>
      </ThemeProvider>
    );
  }
}

export default CommentView;