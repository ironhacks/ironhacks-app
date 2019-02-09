// IronHacks Platform
// filesContainer.js - 
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import {Treebeard, decorators} from 'react-treebeard';

import fileIcon from './img/file-icon.svg';
// import newFileIcon from './img/new-file-icon.svg';
import folderIcon from './img/folder-icon.svg';
//Section container
const MainContainer = styled('div')`
  display: flex;
  flex-grow: 1;
  width: 100%;
  overflow: auto;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : Constants.projectEditorBgColor};
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 20px;

  * li {
    cursor: pointer;
  }
`;

const TreeStyles = {
  tree: {
    base: {
      listStyle: 'none',
      backgroundColor: `${props => props.backgroundColor ? props.backgroundColor : Constants.projectEditorBgColor}`,
      margin: 0,
      padding: 0,
      color: '#9DA5AB',
      fontFamily: 'Muli',
      fontSize: '14px',
    },
    node: {
      base: {
        position: 'relative',
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block'
      },
      activeLink: {
        background: '#31363F',
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#9DA5AB',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#9DA5AB'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        color: '#E2C089'
      }
    }
  }
}

const NodeHeader = styled('div')`
  display: inline-block;

  div {
    display: flex;
    align-items: center;
    font-family: 'Muli';
    font-size: 14px;
    
    img {
      height: 14px;
      width: 14px;
      margin-right: 5px;
    }
  }
`;

// Example: Customising The Header Decorator To Include Icons
decorators.Header = ({style, node}) => {
  const iconType = node.children ? 'folder' : 'file';
  return (
    <NodeHeader>
      <div>
        <img src={iconType === 'file' ? fileIcon : folderIcon} alt='item-icon'/>
        {node.name}
      </div>
    </NodeHeader>
  );
};

class FilesContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cursor: false,
      selectedFile: 'index.html',
      data: {
        name: this.props.projectName,
        toggled: true,
        children: [],
      },
    }
  }

  componentDidMount() {
    this.generateFilesTree();
  }

  onFileClick = (file, name) => {
    this.props.onClick(file)
    this.setState({selectedFile: name})
  }

  generateFilesTree = () => {
    const filesPaths = Object.keys(this.props.files)
    let { children: filesTree } = this.state.data;
    filesPaths.forEach((filePath) => {
      this.generateTreeBeardData(filesTree, filePath);
    });
    this.setState((prevState, props) => ({
        ...prevState.data,
        children: filesTree,
    }));
  };

  generateTreeBeardData = (filesTree, filePath) => {
    const splitedPath = filePath.split('/');
    if(splitedPath.length === 1) {
      filesTree.push({
        name: splitedPath.shift(),
        path: filePath,
      })
      return;
    }

    const fileName = splitedPath.pop();
    if(filesTree.length === 0){
      filesTree.push({
        name: splitedPath.shift() || fileName,
      });
    }

    if (splitedPath.length === 0) {
      if(filesTree[filesTree.length - 1].name !== fileName)
        filesTree[filesTree.length - 1].children ? filesTree[filesTree.lenght - 1].children.push({name: fileName, path: filePath}) : filesTree[filesTree.length - 1].children = [{name: fileName, path: filePath}];
      return;
    }
    splitedPath.forEach((component) => {
      filesTree.some((folder, index) => {
        if (folder.name === component) {
          folder.children = folder.children || [];
          filesTree = folder.children;
          return true;
        }
        if (index === filesTree.length - 1) {
          folder = {
            name: component,
            children: [],
          }
          filesTree.push(folder);
          filesTree = folder.children;
        }
        return false;
      });
    })    

    filesTree.push({name: fileName, path: filePath});
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
  };

  onToggle = (node, toggled) => {
    if(this.state.cursor){this.setState({cursor: {active: false}})};
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState((prevState, props) => {
      const state = {
        cursor: node,
        selectedFile: node.path || prevState.selectedFile,
      }
      return state;
    });
    if (node.path) 
      this.props.onFileSelection(node.path);
  }

  render() {
    return(
      <MainContainer>
        <Treebeard className='component'
          data={this.state.data}
          decorators={decorators}
          onToggle={this.onToggle}
          style={TreeStyles}
        />
      </MainContainer>
    )
  }
}




export default FilesContainer;  