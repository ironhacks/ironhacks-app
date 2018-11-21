// IronHacks Platform
// proyectEditor.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co
import React from 'react';
import swal from 'sweetalert2';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import { JSHINT } from 'jshint';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
// codemirror css
import 'codemirror/addon/lint/lint.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/addon/lint/lint.css';

//Custom components
import FilesContainer from './filesContainer.js';
import Loader from '../../utilities/loader.js';
import Button from '../../utilities/button.js';

window.JSHINT = JSHINT
const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  padding: 0 !important;
  color: #70867b;
  &.container-fuild {
    padding: 0;
  }

  .row {
    height: 100%;
  }

  .editor-container {
    width: 100%;
    height: 100%;

    .CodeMirror {
      width: 100%;
      height: 100%;      
    }
  }
`;

const ProjectContent = styled('div')`
  width: 100%;
  height: 100%;
  padding: 15px !important;
  background-color: ${Constants.projectEditorBgColor};
`;

const ProjectControl = styled('div')`
`;

const Editor = styled(CodeMirror)`
  width: 100%;
  height: 100%;
`;

const PreviewContainer = styled('div')`
  width: 100%;
  height: 100%;

  iframe {
    border: none;
    width: 100%;
    height: 100%;
  }
`;

const editorModeMIMERel = {
  html: 'xml',
  css: 'css',
  js: 'javascript',
}

class ProjectEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorContent: '',
      readonly: false,
      editorMode: 'xml',
      loadingFiles: true,
      selectedFile: 'index.html',
      user: this.props.user,
      currentAlert: null,
    }
  }

  componentDidMount() {
    this.getProjectPreviewPath();
    this.getProjectFilesUrls();
    window.addEventListener("message", this.recieveMessage)
  };

  recieveMessage = (event) => {
    console.log(event)
    if(event.data == 'quizDone'){
      swal.clickConfirm();
    }
  }

  getProjectFilesUrls = () => {
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    //Updating the current hack:
    firestore.collection('users')
    .doc(this.state.user.uid)
    .collection('projects')
    .doc(this.props.match.params.proyectName)
    .get()
    .then(function(doc) {
      _this.setState({projectFiles: doc.data()})
      _this.getProjectFiles();
    }) 
    .catch(function(error) {
      console.error(error)
    });
  };

  getProjectFiles = () => {
    let remainingFiles = Object.keys(this.state.projectFiles).length
    const _this = this;
    for (const file in this.state.projectFiles){
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        const blob = xhr.response;
          _this.setState((prevState, props) => {
          const reader = new FileReader();
          reader.addEventListener('loadend', () => {
            prevState.projectFiles[file].content = reader.result
          })
          prevState.projectFiles[file].blob = blob;
          reader.readAsText(blob);
          remainingFiles -= 1;
          if(remainingFiles === 0){
            prevState.loadingFiles = false;
          };
          return prevState;
        })
      };
      xhr.open('GET', this.state.projectFiles[file].url);
      xhr.send();
    };
  };

  getProjectPreviewPath = () => {
    // Create a reference with an initial file path and name
    const proyectPath = `${Constants.cloudFunctionsProdEndPoint}/previewWebServer/${this.state.user.uid}/${this.props.match.params.proyectName}/index.html`; 
    this.setState({proyectPath: proyectPath});
  };

  saveProject = () => {
    // Create a root reference
    const storageRef = window.firebase.storage().ref();
    // Raw string is the default if no format is provided
    const newBlobs = this.updateProjectBlobs();
    const _this = this;
    console.log(newBlobs)
    Promise.all(
      newBlobs.map(item => this.uploadBlogToFirebase(item, storageRef))
    )
    .then((url) => {
      console.log(`All success`)
      const currentLocation = _this.state.proyectPath;
      _this.setState({proyectPath: currentLocation + ' '})
    })
    .catch((error) => {
      console.log(`Some failed: `, error.message)
    });
  };

  startPushNavigation = () => {
    swal(Constants.loadingAlertContent)
    .then((result) => {
      console.log(result)
      if(!result.dismiss) {
        swal(Constants.pushSurveyAlertContent('https://purdue.ca1.qualtrics.com/jfe/form/SV_ai47Laj9EM1n433?user_email=pepito'))
        .then((result) => {
          swal(Constants.commitContentAlertContent)
          .then((result) => {
            swal(Constants.loadingAlertContent);
          });
        });
      };
    }); 
  };

  updateProjectBlobs = () => {
    let newBlobs = [];
    for(const fileName in this.state.projectFiles){
      if(this.state.projectFiles[fileName].didChange){
        const path = `${this.state.user.uid}/${this.props.match.params.proyectName}/${fileName}`
        const newContent = this.state.projectFiles[fileName].unSavedContent;
        const updatedBlob = new Blob([newContent], {
            type: this.state.projectFiles[fileName].blob.type
        });
        newBlobs.push({path: path, blob: updatedBlob});
      }
    }
    return newBlobs;
  };

  uploadBlogToFirebase = (blob, storageRef) => {
    const indexRef = storageRef.child(blob.path);
    return indexRef.put(blob.blob).then(function(snapshot) {
      console.log('Blob Uploaded!');
    });
  };

  onChangeEditor = (editor, data, value) => {
    this.setState((prevState, props) => {
      prevState.projectFiles[prevState.selectedFile].unSavedContent = value;
      prevState.projectFiles[prevState.selectedFile].didChange = true;
      return prevState;
    });
  };

  onFileSelection = (name) => {
    const splitedFileName = name.split('.');
    this.setState((prevState, props) => { 
      if(prevState.projectFiles[prevState.selectedFile].unSavedContent) {
        prevState.projectFiles[prevState.selectedFile].content =  prevState.projectFiles[prevState.selectedFile].unSavedContent;
      }
      prevState.selectedFile = name;
      prevState.editorMode = editorModeMIMERel[splitedFileName[splitedFileName.length - 1]];
      return prevState;
    });
  }

  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer className='container-fluid'>
          <div className='row no-gutters'>
            <ProjectContent className='col-md-2'>
              <h2>{this.props.match.params.proyectName.toUpperCase()}</h2>
              <h3>Files:</h3>
              {this.state.loadingFiles ? <Loader 
                  backgroundColor={Constants.projectEditorBgColor}
                  dark
                  small
                /> : 
                <FilesContainer files={this.state.projectFiles} onClick={this.onFileSelection} selectedFile={this.state.selectedFile}/>  
              }
            <div>
              <Button primary onClick={this.saveProject}> Save and run </Button>
              <Button primary onClick={this.startPushNavigation}> Push to evaluation </Button>
            </div>
            </ProjectContent>
            <div className='col-md-5 editor-container'>
              {!this.state.loadingFiles && <Editor
                value={this.state.projectFiles[this.state.selectedFile].content}
                options={{
                    lineNumbers: true,
                    mode: this.state.editorMode,
                    lint: true,
                    gutters: [
                     'CodeMirror-lint-markers',
                   ],
                    theme: 'material',
                    tabSize: 2,
                    lineWrapping: true,
                }}
                onChange={this.onChangeEditor}
              />}
            </div>
            <PreviewContainer className='col-md-5'>
              {this.state.proyectPath && <iframe src={this.state.proyectPath} title='The Project Preview'/>}
            </PreviewContainer>
          </div>
        </SectionContainer> 
      </ThemeProvider>
    );
  }
}

export default ProjectEditor;