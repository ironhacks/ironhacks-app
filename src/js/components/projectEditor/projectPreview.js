// IronHacks Platform
// ProjectPreview.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Link } from "react-router-dom";
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

import ReloadIcon from './img/reload-icon.svg';
import NewTabIcon from './img/multi-tab.svg';

const PreviewContainer = styled('div')`
  display: flex;
  border-radius: ${Constants.universalBorderRadius};
  background-color: #1C2022;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;

  
  .iframe-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    background-color: #F2F2F2;
    border-radius: ${Constants.universalBorderRadius} ${Constants.universalBorderRadius} 0 0;
    padding: 0 10px;

    button, a {
      background-color: transparent;
      padding: 0;
      height: 20px;
      width: 20px;
      border: none;
    
      img {
        display: block;
        height: 100%;
        width: 100%;    
      }
    }

    input {
      flex-grow: 1;
      margin: 0 10px;
      border: solid 1px lightgray;
      border-radius: 4px;
      height: 30px;
      font-size: 13px;
      padding: 0 5px;
    }
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
  constructor(props) {
    super(props);
    this.state = {
      projectName: this.props.projectName || false,
      projectURL: this.props.projectURL || false,
      user: this.props.user,
    }
  }

  componentWillMount() {
    if(!this.state.projectURL) {
      this.getProjectPreviewPath();
    }
  }
  
  reloadFrame = (event) => {
    console.log("test")
  }

  getProjectPreviewPath = () => {
    // Create a reference with an initial file path and name
    const projectURL = `${Constants.cloudFunctionsProdEndPoint}/previewWebServer/${this.state.user.uid}/${this.state.projectName}/index.html`; 
    this.setState({projectURL: projectURL});
  }

  render() {
    return (
      <PreviewContainer>
        <div className="iframe-header">
          <button onClick={this.reloadFrame}>
            <img src={ReloadIcon} alt='reload-icon'/>
          </button>
          <input defaultValue={`www.ironhacks.com/projectEditor/${this.state.projectName}/preview`} readOnly />
          <a 
            href={this.state.projectURL}
            target='_blank'
            >
            <img src={NewTabIcon} alt='reload-icon'/>
          </a>
        </div>
        <div className="smooth-borders">
          {this.state.projectURL && <iframe src={this.state.projectURL} title='The Project Preview'/>}
        </div>

      </PreviewContainer>
    );
  }
}

export default ProjectPreview;