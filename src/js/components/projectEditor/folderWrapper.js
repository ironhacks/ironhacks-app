// IronHacks Platform
// results.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

import fileIcon from './img/file-icon.svg';

const FileButton = styled('button')`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.isSelected ? '#b8c3be' : '#eaedeb'};
  border: ${(props) => props.isSelected ? 'solid' : 'none'};
  border-radius: 4px;
  padding: 3px;
  margin: 5px 0;
  text-align: left;
  min-height: 35px;

  &:hover {
    color: #616e6e;
  }

  img {
    margin-right: 5px;
  }
`;

class FolderWrapper extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedFile: false,
    }
  }

  addFiles = (files) => {
    console.log(files)
  }
  
  render() {
    return (
      <FileButton 
        key={this.props.key}
        onClick={() => this.props.onFileClick()}
        isSelected={this.props.name === this.state.selectedFile}>
        {this.props.type === 'file' && <img src={fileIcon} alt='file-icon'/>}
        {this.props.name}
      </FileButton>
    );
  }
}

export default FolderWrapper;