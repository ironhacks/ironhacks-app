// IronHacks Platform
// filesContainer.js - 
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
import FoderWrapper from './folderWrapper.js';
//Custom Constants
import * as Constants from '../../../constants.js';

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
    filesPaths.push('index.js', "css/index.css", "js/index.js", "css/img/index.css")
    const filesTree = {};
    filesPaths.forEach((filePath) => {
      const splitedPath = filePath.split('/');
      this.createNestedObject(filesTree, splitedPath);
    });
    this.setState({filesTree: filesTree});
    console.log(filesTree);
  };

  createNestedObject = (base, names) => {
    // If the lastName was removed, then the last object is not set yet:
    const fileName = names.pop()

    for( var i = 0; i < names.length; i++ ) {
        base = base[ names[i] ] = base[ names[i] ] || {};
    }
    if (base["files"]) {
      base["files"].push(fileName);
    }else {
      base["files"] = [fileName];
    } 

    return base;
  };

  eachRecursive = (obj, folders) => {
    folders = folders || [<FoderWrapper type='root' name='Root'/>];
    for (var k in obj) {
      if (!obj.hasOwnProperty(k)) continue;
      if (typeof obj[k] == "object" && obj[k] !== null){
        if(k != 'files'){
          folders.push(<FoderWrapper type='folder' name={k}/>)
        }else if (k === 'files'){
          console.log(folders[folders.length - 1])
          folders[folders.length - 1].addFiles(obj[k])
        }
        this.eachRecursive(obj[k], folders);
      }else{
      }
    }
    return folders
  };

  getPath = (obj, val, path) => {
   path = path || "";
   var fullpath = "";
   for (var b in obj) {
      if (obj[b].files && obj[b].files.includes(val)) {
         return (path + "/" + b);
      }
      else if (typeof obj[b] === "object") {
         fullpath = this.getPath(obj[b], val, path + "/" + b) || fullpath;
      }
   }
   return fullpath;
}

  // createFilesTreeRepresentation = () => {
  //   for (let key in this.state.filesTree){
  //     if (key == "child")
  //       // do something...
  //   } 
  // };

  render() {
    return(
      <MainContainer>
        {this.eachRecursive(this.state.filesTree)}
      </MainContainer>
    )
  }
}

export default FilesContainer;