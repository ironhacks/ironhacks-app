// IronHacks Platform
// filesContainer.js - 
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

import fileIcon from './img/file-icon.svg';

//Section container
const MainContainer = styled('div')`
  width: 100%;
  min-height: 200px;
  max-height: 250px;
  overflow: auto;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : Constants.projectEditorBgColor};
  display: flex;
  flex-direction: column;
`;

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

class FilesContainer extends React.Component {
  constructor(props){
    super(props);
    console.log(props.files)
    this.state = {
      selectedFile: 'index.html',
    }
  }

  onFileClick = (file, name) => {
    this.props.onClick(file)
    this.setState({selectedFile: name})
  }

  render() {
    return(
      <MainContainer>
        {Object.keys(this.props.files).map((file, i) => {
          const path = file.split('/')
          const name = path[path.length -1]
          return <FileButton 
            key={name}
            onClick={() => this.onFileClick(file, name)}
            isSelected={name === this.state.selectedFile}>
            <img src={fileIcon} alt='file-icon'/>
            {name}
          </FileButton>;
        })}
      </MainContainer>
    )
  }
}

export default FilesContainer;