// IronHacks Platform
// proyectEditor.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co
import React from 'react';
import { withCookies } from 'react-cookie';
import swal from 'sweetalert2';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import { JSHINT } from 'jshint';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
// codemirror css
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/lint/javascript-lint'
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';


//Custom components
import ProjectPreview from './projectPreview.js';
import FilesContainer from './filesContainer.js';
import Loader from '../../utilities/loader.js';
import Button from '../../utilities/button.js';

window.JSHINT = JSHINT
const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: #1C2022;
  color: rgb(255, 255, 255, 0.4);

  .preview-container {
    width: 40%;
    height: 100%;
  }
`;

const ProjectContent = styled('div')`
  position: relative;
  width: 20%;
  height: 100%;
  background-color: ${Constants.projectEditorBgColor};
  padding-top: 20px;

  h2, h3 {
    margin-left: 20px;
  }

  .control {
    width: 100%;
    bottom: 20px;
    padding: 0 20px 0 20px;

    button {
      margin-bottom: 10px;
    }
  }

  .hack-status {
    position: absolute;
    bottom: 10px;
    padding: 20px;

    h3, p {
      margin: 0;
    }
  }
`;

const EditorContainer = styled('div')`
  width: 40%;
  height: 100%;

  .CodeMirror {
    width: 100%;
    height: 100%;      
  }
`;

const Editor = styled(CodeMirror)`
  width: 100%;
  height: 100%;

  .CodeMirror-matchingtag {
    background-color: transparent;
    text-decoration: underline;
  }
`;

const editorModeMIMERel = {
  html: 'xml',
  css: 'css',
  js: 'javascript',
}

const storageRef = window.firebase.storage().ref();

const commitSurveys = {
  1: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_exR2GmwUUS07XUN',
  2: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_2hHiUsFZ0Urzbmt',
  3: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_8HYZoJadcow0Lad',
  4 :'https://purdue.ca1.qualtrics.com/jfe/form/SV_3La7PbTVxqJkVh3',
  5: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_bxSTjywdbM3zf0x',
}


class ProjectEditor extends React.Component {
  constructor(props){
    super(props);
    const { cookies, user } = props;
    this.state = {
      currentHack: cookies.get('currentHack') || null,
      editorContent: '',
      readonly: false,
      editorMode: 'xml',
      loadingFiles: true,
      selectedFile: 'index.html',
      projectFiles: [],
      user: this.props.user,
      currentAlert: null,
      creatingFile: true,
      projectName: this.props.match.params.proyectName,
      timer: {seconds: 0, minutes: 0, hours: 0, days: 0},
    }
  }

  componentDidMount() {
    this.getProjectPreviewPath();
    this.getProjectFilesUrls();
    window.addEventListener("message", this.recieveMessage)
    //this.getCountDown();
  }

  getCountDown = () => {
    const _this = this;
    const timer = setInterval(function() {
      const countDownDate = new Date("Jan 25, 2019 00:00:00").getTime();

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      _this.setState({timer: {seconds: seconds, minutes: minutes, hours: hours, days: days}})
      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(timer);
        _this.setState({timer: null})
      }
    }, 1000) 
  }

  recieveMessage = (event) => {
    if(event.data === 'quizDone'){
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
    .doc(this.state.projectName)
    .get()
    .then(function(doc) {
      _this.setState({projectFiles: doc.data()})
      _this.getProjectFiles();
    }) 
    .catch(function(error) {
      console.error(error)
    });
  }

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
  }

  getProjectPreviewPath = () => {
    // Create a reference with an initial file path and name
    const proyectPath = `${Constants.cloudFunctionsProdEndPoint}/previewWebServer/${this.state.user.uid}/${this.state.projectName}/index.html`; 
    this.setState({proyectPath: proyectPath});
  }

  saveProject = () => {
    // Raw string is the default if no format is provided
    const newBlobs = this.updateProjectBlobs();
    const _this = this;
    Promise.all(
      newBlobs.map(item => this.uploadBlogToFirebase(item))
    )
    .then((url) => {
      const currentLocation = _this.state.proyectPath;
      _this.setState({proyectPath: currentLocation + ' '})
    })
    .catch((error) => {
      console.log(`Some failed: `, error.message)
    });
  }

  pushToGitHub = (commiteMessage) => {
    const composedCommitMessage = commiteMessage + '\n\n\n Final commit phase 1.';
    const files = [];
    for (const key in this.state.projectFiles) {
      files.push({name: key, content: this.state.projectFiles[key].content})
    }
    let projectName = this.state.user.isAdmin ? 
      `admin-${this.state.user.uid}-${this.state.projectName}` : 
      `${this.state.currentHack}-${this.state.user.uid}-${this.state.projectName}`;
    console.log(projectName)
    const commitToGitHub = window.firebase.functions().httpsCallable('commitToGitHub');
    commitToGitHub({name: projectName, files:files, commitMessage: composedCommitMessage})
    .then((result) => {
      if(result.status === 500){
        console.error(result.error);
      }else{
        swal.clickConfirm();
        console.log(result)
      }
    })
  }

  startPushNavigation = () => {
    this.saveProject();
    swal(Constants.surveyRedirecAlertContent)
    .then((result) => {
      if(!result.dismiss) {
        swal(Constants.pushSurveyAlertContent('https://purdue.ca1.qualtrics.com/jfe/form/SV_ai47Laj9EM1n433?user_email=pepito'))
        .then((result) => {
          swal(Constants.commitContentAlertContent)
          .then((result) => {
            const { value } = result;
            if (value) {
              this.pushToGitHub(value)
              swal(Constants.loadingAlertContent);
            };
          });
        });
      };
    }); 
  }

  updateProjectBlobs = () => {
    let newBlobs = [];
    for(const fileName in this.state.projectFiles){
      if(this.state.projectFiles[fileName].didChange){
        const path = `${this.state.user.uid}/${this.state.projectName}/${fileName}`
        const newContent = this.state.projectFiles[fileName].unSavedContent;
        const updatedBlob = new Blob([newContent], {
            type: this.state.projectFiles[fileName].blob.type
        });
        newBlobs.push({path: path, blob: updatedBlob});
      }
    }
    return newBlobs;
  }

  uploadBlogToFirebase = (blob) => {
    const indexRef = storageRef.child(blob.path);
    return indexRef.put(blob.blob).then(function(snapshot) {
    });
  }

  onChangeEditor = (editor, data, value) => {
    this.setState((prevState, props) => {
      prevState.projectFiles[prevState.selectedFile].unSavedContent = value;
      prevState.projectFiles[prevState.selectedFile].didChange = true;
      return prevState;
    });
  }

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

  startCreateNewFileFlow = async () => {
    this.saveProject();
    const {value: filePath, error: error} = await swal(Constants.createNewFileFlowAlertContent(this.fileNameValidator));
    if(filePath) {
      const file = this.createNewFile(filePath);
      this.putStorageFile(file, this.state.projectName);
    }
  }

  createNewFile = (filePath) => {
    const splitedPath = filePath.split('/')
    const newFile = {
      name: splitedPath[splitedPath.length - 1],
      path: filePath,
      blob: new Blob([`${splitedPath[splitedPath.length - 1]} create by: ${this.state.user.displayName}`], {type: this.getMIME(splitedPath[splitedPath.length - 1])}),
    };
    return newFile;
  }

  fileNameValidator = (fileName) => {
    if (fileName) {
      const name = fileName.toLowerCase();
      const splitedFileName = name.split('/')
      if (splitedFileName.includes('file') || splitedFileName.includes('folder')) {
        return true && '"File" or "folder" are not valid names.';
      }
      if (this.state.projectFiles.hasOwnProperty(fileName)) {
        return true && 'File already exists.'
      }
      return false;
    } else {
      return !fileName && 'You need to write something!'
    }
  }

  getMIME = (fileName) => {
    const splitedName = fileName.split('.');
    const extention = splitedName.pop();
    const extToMimes = {
      'txt': 'text/plain',
      'html': 'text/html',
      'css': 'text/css',
      'js': 'text/javascript',
      'md': 'text/markdown',
      'svg': 'image/svg+xml',
      'img': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
    }

    if (extToMimes.hasOwnProperty(extention)) {
      return extToMimes[extention];
    }
    return false;
  }

  putStorageFile = (file, projectName) => {
    this.setState({loadingFiles: true});
    const pathRef = storageRef.child(`${this.state.user.uid}/${projectName}/${file.path}`)   
    const _this = this;
    //the return value will be a Promise
    return pathRef.put(file.blob)
    .then((snapshot) => {
      //Get the download URL
      pathRef.getDownloadURL().then(function(url) {
        const fileURL = url;
        const fileJson = {};
        const fullPath = file.path;
        fileJson[fullPath] = {url: fileURL}
        const firestore = window.firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        firestore.settings(settings);
        firestore.collection("users")
        .doc(_this.state.user.uid)
        .collection('projects')
        .doc(projectName)
        .set(fileJson, {merge: true})
        .then(function(doc) {
          _this.getProjectFilesUrls();
        })
      })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
      }).catch(function(error) {
    }).catch((error) => {
      console.log('One failed:', file, error.message)
    });
  };

  reloadFrame = () => {
    this.setState((prevState, props) => {
      const proyectPath = prevState.proyectPath + ' ';
      return {proyectPath}
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
            <ProjectContent>
              <h2>{this.state.projectName.toUpperCase()}</h2>
              <div className="control">
                <Button primary onClick={this.saveProject}> Save and run </Button>
                <Button primary onClick={this.startPushNavigation}> Push to evaluation </Button>
                <Button primary onClick={this.startCreateNewFileFlow}>Create new file</Button>
              </div>
              <h3>Files:</h3>
              {this.state.loadingFiles ? <Loader 
                  backgroundColor={Constants.projectEditorBgColor}
                  dark
                  small
                /> : 
                <FilesContainer files={this.state.projectFiles}
                  onFileSelection={this.onFileSelection}
                  selectedFile={this.state.selectedFile}
                  projectName={this.state.projectName.toUpperCase()}/>  
              }
              <div className="hack-status">
                <h3>Current phase: 1</h3>
                <p>
                  Remaining time: <br/>
                  {`${this.state.timer.days}:${this.state.timer.hours}:${this.state.timer.minutes}:${this.state.timer.seconds}`}
                </p>
              </div>
            </ProjectContent>
            <EditorContainer>
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
                    matchBrackets: true,
                    matchTags: true,
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                }}
                onChange={this.onChangeEditor}
              />}
            </EditorContainer>
            <div className="preview-container">
              {this.state.proyectPath &&
                <ProjectPreview 
                  projectURL={this.state.proyectPath}
                  projectName={this.state.projectName}
                  reloadFrame={this.reloadFrame}
                />
              }
            </div>
        </SectionContainer> 
      </ThemeProvider>
    );
  }
}
export default withCookies(ProjectEditor);