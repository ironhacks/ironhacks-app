// IronHacks Platform
// ProjectPreview.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const PreviewContainer = styled('div')`
  display: flex;
  border-radius: ${Constants.universalBorderRadius};
  background-color: #1C2022;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;

  
  .iframe-header {
    width: 100%;
    height: 50px;
    background-color: #F2F2F2;
    border-radius: ${Constants.universalBorderRadius} ${Constants.universalBorderRadius} 0 0;
  };

  

  .smooth-borders {
    display: flex;
    flex-grow: 1;
    width: 100%
    overflow: hidden;
    border-radius: 0 0 ${Constants.universalBorderRadius} ${Constants.universalBorderRadius};

    iframe {
      border: none;
      width: 100%;
      background-color: white;
    };
  }
`;

class ProjectPreview extends React.Component {
  
  render() {
    return (
      <PreviewContainer>
        <div className="iframe-header">

        </div>
        <div className="smooth-borders">
          {this.props.projectURL && <iframe src={this.props.projectURL} title='The Project Preview'/>}
        </div>
      </PreviewContainer>
    );
  }
}

export default ProjectPreview;