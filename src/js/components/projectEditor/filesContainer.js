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
  padding: 0 20px 0 20px;
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
    console.log()
    this.state = {
      selectedFile: 'index.html',
    }
  }

  componentWillMount() {
    this.generateFilesTree();
  }

  onFileClick = (file, name) => {
    this.props.onClick(file)
    this.setState({selectedFile: name})
  };

  generateFilesTree = () => {
    const filesPaths = Object.keys(this.props.files)
    filesPaths.push("css/rest/test.css", "css/main.css")
    const testArry = ["css/rest/test.css",  "css/main.css"]
    const filesTree = {};
    testArry.forEach((filePath) => {
      const splitedPath = filePath.split('/');
      this.createNestedObject(filesTree, splitedPath);
    });
    console.log(filesTree)
  }

  createNestedObject = (base, names) => {
    // If the lastName was removed, then the last object is not set yet:
    for( var i = 0; i < names.length; i++ ) {
        base = base[ names[i] ] = base[ names[i] ] || {};
    }

    base["items"] = {test: "test"}

    return base;
};

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