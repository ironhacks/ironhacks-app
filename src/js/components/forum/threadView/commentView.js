// IronHacks Platform
// commentView.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Showdown (markdown converter)
import Showdown from 'showdown';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Components
import ReactionsView from '../reactionsView.js';
import TagView from '../tagView.js';
import ReactionPicker from '../reactionPicker.js';
//Custom Constants
import * as Constants from '../../../../constants.js';

//Porfile img test 
import heartReaction from '../img/heart-reaction.svg';

const theme = Constants.CommentViewTheme;

const CommentContainer = styled('div')`
  height: ${props => props.theme.containerHeight};
  border-radius: ${Constants.universalBorderRadius};
  background-color: ${props => props.theme.backgroundColor};
  margin-bottom: ${Constants.commentViewBottomMargin};
  padding: 10px 15px 10px 15px;

  h2 {
    font-size: 20px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 0;
    line-height: 15px;

    img {
      width: 25px;
      height: 25px;
      margin-right: 15px;
    }
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
const ConverterConfig = {
  tables: true,
  simplifiedAutoLink: true,
  prefixHeaderId: true, //Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section' prefix.
  strikethrough: true, //Enable support for strikethrough syntax. ~~strikethrough~~ as <del>strikethrough</del>
  tasklists: true,
};

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

  decodeBody = (markdown) => {
    const converter = new Showdown.Converter(ConverterConfig);
    console.log(markdown)
    return converter.makeHtml(markdown)
  };

  handleClick = () => {
    console.log('Button is cliked!');
  };
  // base64 encoded ascii to ucs-2 string
  atou = (str) => {
      return decodeURIComponent(escape(window.atob(str)));
  };

  render() {

    return (
      <ThemeProvider theme={theme}>
        <CommentContainer>
          <div className="row">
            <div className='col-6'>
              <h2><img src={heartReaction} alt="Profile"/>{this.props.commentData.authorName}</h2>
              <div dangerouslySetInnerHTML={{__html:this.decodeBody(this.atou(this.props.commentData.body))}}/>
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