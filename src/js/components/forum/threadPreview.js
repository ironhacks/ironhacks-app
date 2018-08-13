// IronHacks Platform
// threadPreview.js - Preview that will be displayed on the Forum section
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
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
const tag = styled('div')`
  
`;

class ThreadPreview extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <PreviewContainer>
          <div className="row">
            <div className='col-6'>
              <h2>{this.props.title}</h2>
              <label>{this.props.author}</label>
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