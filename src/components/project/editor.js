import React from 'react';
import {withCookies} from 'react-cookie';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import styled, {ThemeProvider} from 'styled-components';
import {Loader} from '../../components/loader';
import Button from '../../util/button.js';
import { cloudFunctionsProdEndPoint } from '../../config/cloud-api';
import * as DateFormater from '../../util/dateFormater.js';
import {registerStats} from '../../util/register-stat';
import { withRouter } from 'react-router';
import swal from 'sweetalert2';
import {JSHINT} from 'jshint';
import {Theme} from '../../theme';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/lint/javascript-lint';
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
import ProjectPreview from './preview.js';
import FilesContainer from './filesContainer.js';
const colors = Theme.COLORS;

window.JSHINT = JSHINT;
const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
position: relative;
display: flex;
flex-direction: row;
width: 100%;
height: ${(props) => props.theme.containerHeight};
background-color: #1C2022;
color: rgb(255, 255, 255, 0.4);
`;

const PreviewContainer = styled('div')`
display: ${(props) => props.hidden ? 'none' : 'block'};
width: 40%;
height: 100%;
`;

const ProjectContent = styled('div')`
position: relative;
display: flex;
flex-direction: column;
width: 20%;
height: 100%;
background-color: ${colors.projectEditorBgColor};
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
  margin-bottom: 10px;
  padding: 20px;

  h3, p {
    margin: 0;
  }
}
`;

const EditorContainer = styled('div')`
width: ${(props) => props.large ? '80%' : '40%'};
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


const ShowPreview = styled('button')`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 15px;
  top: 15px;
  height: 30px;
  width: 30px;
  border: none;
  cursor: pointer;
  padding-left: 8px;
  background-color: lightslategrey;
  border-radius: 15px;
  z-index: 2;
  i {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    &.left {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    }
  }
`;


class EditorPreviewButton extends React.Component {
  render() {
    return (
      <ShowPreview onClick={()=>{
        this.props.action()
      }}>
        <i className="left" />
      </ShowPreview>
    )
  }
}

EditorPreviewButton.defaultProps = {
  action: function(){
    return true;
  }
}

const editorModeMIMERel = {
  html: 'xml',
  css: 'css',
  js: 'javascript',
};

// const storageRef = window.firebase.storage().ref();


function getMIME(fileName) {
  const names = fileName.split('.');
  const ext = names.pop();
  const mimes = {
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

  if (mimes.hasOwnProperty(ext)) {
    return mimes[ext];
  }
  return false;
}


class ProjectEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      hackerId: this.props.userId,
      readOnly: this.props.userId ? true : false,
      editorKey: Math.random(),
      hidePreview: false,
      currentHack: this.hackId,
      editorContent: '',
      editorMode: 'xml',
      loadingFiles: true,
      selectedFile: 'js/main.js',
      projectFiles: [],
      projectFileCount: 0,
      creatingFile: false,
      projectName: this.props.match.params.projectName,
      timer: {seconds: 0, minutes: 0, hours: 0, days: 0},
    }

    this.projectName = this.props.match.params.projectName;
    this.hackId = this.props.hackId;
    this.commitSurveys = {
      1: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_exR2GmwUUS07XUN',
      2: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_2hHiUsFZ0Urzbmt',
      3: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_8IgnHWN5eqeyYlL',
      4: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_3PhdvoDMbShZbPn',
      5: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_6R0ytiGxG2WTjs9',
      6: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_8rhPwaWZHGUz49v',
      7: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_dbZU35dwHd0QKY5',
    };

    this.getProjectFilesUrls = this.getProjectFilesUrls.bind(this);
    this.getProjectFiles = this.getProjectFiles.bind(this);
    this.getFile = this.getFile.bind(this);
  }

  componentDidMount() {
    this.getProjectPreviewPath();
    this.getProjectFilesUrls();
    // this.getCurrentHackInfo();
    window.addEventListener('message', this.recieveMessage);
  }

  getProjectPreviewPath() {
    const userId = this.props.userId;
    const projectPath = `${cloudFunctionsProdEndPoint}/previewWebServer/${userId}/${this.projectName}/index.html`;
    this.setState({
      projectPath: projectPath
    })
  }

  async getProjectFilesUrls() {
    const firestore = window.firebase.firestore();
    const userId = this.state.hackerId || this.state.user.uid;

    let projectFileUrls = await firestore.collection('users')
      .doc(userId)
      .collection('projects')
      .doc(this.state.projectName)
      .get()

    Promise.resolve(projectFileUrls).then((result)=>{
      const projectFiles = result.data();
      this.setState({ projectFiles: projectFiles })
      this.getProjectFiles(projectFiles)
    })
  }

  updateProjectFiles(data){
    this.setState({
      projectFiles: {[`${data.path}`] : data}
    })

    // VIEW CAN RENDER ONCE SELECTED FILE HAS CONTENT
    let selected = this.state.selectedFile;
    if (selected === data.path && this.state.projectFiles[selected].content) {
      this.setState({
        loadingFiles: false
      })
    }
  }

  async getFile(data) {
    const fileUrl = Object.values(data)[0].url;
    const fileName = Object.keys(data)[0];
    const fetchData = await fetch(fileUrl, { method:'GET' })
    const blobData = await fetchData.blob()
    let reader = new FileReader();
    reader.addEventListener('loadend', () => {
      this.updateProjectFiles({
        path: fileName,
        url: fileUrl,
        content: reader.result,
      })
    })
    reader.readAsText(blobData);
  }

  getProjectFiles(files) {
    var fileArray = [];
    for (let key of Object.keys(files)) {
      let item = {};
      item[`${key}`] = files[key];
      fileArray.push(item);
    }

    for (let file of fileArray) {
      this.getFile(file);
    }
  }

  getCurrentHackInfo() {
    const _this = this;
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.state.currentHack)
      .get()
      .then((doc) => {
        const hackData = doc.data();
        const currentPhase = DateFormater.getCurrentPhase(hackData.phases).index + 1 || -1;
        _this.setState({
          hackData,
          currentPhase,
        });
        if (currentPhase !== -1) {
          _this.getCountDown();
        }
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  };

  getCountDown() {
    const _this = this;
    const phase = this.state.hackData.phases[this.state.currentPhase - 1];
    // const countDownDate = new window.firebase.firestore.Timestamp(phase.codingStartEnd.seconds, phase.codingStartEnd.nanoseconds).toDate();
    const countDownDate = new Date();
    const timer = setInterval(function() {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      _this.setState({
        timer: {
          seconds: seconds,
          minutes: minutes,
          hours: hours,
          days: days
        }
      });

      if (distance < 0) {
        clearInterval(timer);
        _this.setState({timer: null});
      }
    }, 1000);
  }

  recieveMessage = (event) => {
    if (event.data === 'quizDone') {
      swal.clickConfirm();
    }
  }

  saveProject() {
    console.log('on save');
    this.saveStat({event: 'save-and-run', metadata: {action: 'click'}});
    // Raw string is the default if no format is provided
    const newBlobs = this.updateProjectBlobs();
    console.log(newBlobs, 'blobs');
    const _this = this;
    Promise.all(
      newBlobs.map((item) => this.uploadBlogToFirebase(item)),
    )
    .then((url) => {
      _this.setState((prevState, props) => {
        const projectPath = prevState.projectPath + ' ';
        const projectFiles = prevState.projectFiles;
        if (projectFiles[prevState.selectedFile].unSavedContent !== undefined) {
          projectFiles[prevState.selectedFile].content = projectFiles[prevState.selectedFile].unSavedContent;
        }
        return {projectFiles, projectPath};
      });
    })
    .catch((error) => {
      console.log('Some failed: ', error.message);
    });
  }

  updateProjectBlobs() {
    const newBlobs = [];
    for (const fileName in this.state.projectFiles) {
      if (this.state.projectFiles[fileName].didChange) {
        const path = `${this.state.user.uid}/${this.state.projectName}/${fileName}`;
        const newContent = this.state.projectFiles[fileName].unSavedContent;
        const updatedBlob = new Blob([newContent], {
          type: this.state.projectFiles[fileName].blob.type,
        });
        newBlobs.push({path: path, blob: updatedBlob});
      }
    }
    return newBlobs;
  }

  startPushNavigation() {
    const _this = this;
    this.saveProject();
    if (this.state.hackData.phases[this.state.currentPhase - 1].commitSurveyLink) {
      swal(colors.surveyRedirecAlertContent)
      .then((result) => {
        if (!result.dismiss) {
          swal(colors.pushSurveyAlertContent([
              `${this.state.hackData.phases[this.state.currentPhase - 1].commitSurveyLink}`,
              `?email=${_this.state.user.email}`,
              `&user_id=${_this.state.user.uid}`
            ].join(''))
          )
          .then((result) => {
            if (!result.dismiss) {
              swal(colors.commitContentAlertContent)
              .then((result) => {
                const {value} = result;
                if (value) {
                  this.pushToGitHub(value);
                  swal(colors.loadingAlertContent)
                  .then((result) => {
                    swal(colors.onSuccessAlertContent);
                  });
                };
              });
            }
          });
        };
      });
    } else {
      swal(colors.commitContentAlertContent).then((result) => {
        const {value} = result;
        if (value) {
          this.pushToGitHub(value);
          swal(colors.loadingAlertContent).then((result) => {
            swal(colors.onSuccessAlertContent);
          });
        };
      });
    }
  }

  pushToGitHub(commitMessage) {
    const composedCommitMessage = commitMessage + '\n\n\n Final commit phase 1.';
    const files = [];

    for (const key of this.state.projectFiles) {
      files.push({
        name: key,
        content: this.state.projectFiles[key].content,
      });
    }

    const projectName = this.state.user.isAdmin
      ? `admin-${this.state.user.uid}-${this.state.projectName}`
      : `${this.state.currentHack}-${this.state.user.uid}-${this.state.projectName}`;

    // const commitToGitHub = window.firebase.functions().httpsCallable('commitToGitHub');

    // commitToGitHub({
    //   name: projectName,
    //   files: files,
    //   commitMessage: composedCommitMessage},
    // ).then((result) => {
    //   if (result.status === 500) {
    //     console.error(result.error);
    //   } else {
    //     swal.clickConfirm();
    //   }
    // });
  }


  uploadBlogToFirebase(blob) {
    // const indexRef = storageRef.child(blob.path);
    // return indexRef.put(blob.blob)
    // .then(function(snapshot) {
    //   console.log('blob uploaded');
    // }).catch(function(error) {
    //   console.error('Error updating documents: ', error);
    // });
  }

  onChangeEditor(editor, data, value) {
    this.setState((prevState, props) => {
      const projectFiles = prevState.projectFiles;
      projectFiles[prevState.selectedFile].unSavedContent = value;
      projectFiles[prevState.selectedFile].didChange = true;
      return {projectFiles};
    });
  }

  onFileSelection(name) {
    const splitedFileName = name.split('.');
    // this.saveStat({event: 'view-file', metadata: {filename: name}});
    this.setState((prevState, props) => {
      const projectFiles = prevState.projectFiles;
      if (projectFiles[prevState.selectedFile].unSavedContent !== undefined) {
        projectFiles[prevState.selectedFile].content = projectFiles[prevState.selectedFile].unSavedContent;
      }
      const selectedFile = name;
      const editorMode = editorModeMIMERel[splitedFileName[splitedFileName.length - 1]];

      return {projectFiles, selectedFile, editorMode, editorKey: Math.random()};
    });
  }


  async startCreateNewFileFlow() {
    this.saveProject();

    const {
      value: filePath
    } = await swal(colors.createNewFileFlowAlertContent(this.fileNameValidator));

    if (filePath) {
      const file = this.createNewFile(filePath);
      this.putStorageFile(file, this.state.projectName);
      this.saveStat({event: 'new-file', metadata: {filename: filePath}});
    }
  }


  createNewFile = (filePath) => {
    const splitedPath = filePath.split('/')
    const newFile = {
      name: splitedPath[splitedPath.length - 1],
      path: filePath,
      blob: new Blob([`${splitedPath[splitedPath.length - 1]} create by: ${this.state.user.displayName}`], {
          type: getMIME(splitedPath[splitedPath.length - 1])
      }),
    }
    return newFile;
  }

  fileNameValidator = (fileName) => {
    if (fileName) {
      const name = fileName.toLowerCase();
      const splitedFileName = name.split('/');
      if (splitedFileName.includes('file') || splitedFileName.includes('folder')) {
        return true && '"File" or are not valid names.';
      }
      if (this.state.projectFiles.hasOwnProperty(fileName)) {
        return true && 'File already exists.';
      }
      return false;
    } else {
      return !fileName && 'You need to write something!';
    }
  }
    putStorageFile(file, projectName) {
      this.setState({loadingFiles: true});
      // const pathRef = storageRef.child(`${this.state.user.uid}/${projectName}/${file.path}`);
      const _this = this;
      // the return value will be a Promise
      // return pathRef.put(file.blob)
      // .then((snapshot) => {
      //   // Get the download URL
      //   pathRef.getDownloadURL().then(function(url) {
      //     const fileURL = url;
      //     const fileJson = {};
      //     const fullPath = file.path;
      //     fileJson[fullPath] = {url: fileURL};
      //     const firestore = window.firebase.firestore();
      //     firestore.collection('users')
      //     .doc(_this.state.user.uid)
      //     .collection('projects')
      //     .doc(projectName)
      //     .set(fileJson, {merge: true})
      //     .then(function(doc) {
      //       _this.getProjectFilesUrls();
      //     });
      //   })
      //   .catch(function(error) {
      //     console.error('Error getting documents: ', error);
      //   });
      // }).catch(function(error) {
      // }).catch((error) => {
      //   console.log('One failed:', file, error.message);
      // });
    };

    reloadFrame() {
      this.setState((prevState, props) => {
        const projectPath = prevState.projectPath + ' ';
        return {projectPath};
      });
    }

    hidePreview() {
      this.setState({hidePreview: true});
    }

    showPreview() {
      this.setState({hidePreview: false});
    }

    saveStat(stat) {
      stat.userId = this.state.user.uid;
      stat.metadata.hackId = this.state.currentHack;
      stat.metadata.projectName = this.state.projectName;
      // registerStats(stat);
    }

    render() {
      return (
        <ThemeProvider theme={styles}>
        <SectionContainer>

        <ProjectContent>

        <h2>{this.state.projectName.toUpperCase()}</h2>

        {!this.state.readOnly && (
          <div className="control">
            <Button primary onClick={this.saveProject}>
              Save and run
            </Button>

          {this.state.currentPhase !== -1 && (
            <Button primary onClick={this.startPushNavigation}>
              Push to evaluation
            </Button>
          )}

            <Button primary onClick={this.startCreateNewFileFlow}>
              Create new file
            </Button>
          </div>
        )}

        <h3>Files:</h3>

        {this.state.loadingFiles ? (
          <Loader
            backgroundColor={colors.projectEditorBgColor}
            dark
            small
          />
        ) : (
          <FilesContainer
            files={this.state.projectFiles}
            onFileSelection={this.onFileSelection}
            selectedFile={this.state.selectedFile}
            projectName={this.state.projectName.toUpperCase()}
          />
        )}

        <div className="hack-status">
          <h3>
            Current phase: {this.state.currentPhase !== -1 ? this.state.currentPhase : 'Tutorial stage'}
          </h3>

          <p>
            Remaining time: <br/>
            {`${this.state.timer.days}:${this.state.timer.hours}:${this.state.timer.minutes}:${this.state.timer.seconds}`}
          </p>
        </div>
        </ProjectContent>

        <EditorContainer large={this.state.hidePreview}>
          {!this.state.loadingFiles && (
            <Editor
              key={this.state.editorKey}
              value={this.state.projectFiles[this.state.selectedFile].content}
              options={{
                lineNumbers: true,
                mode: this.state.editorMode,
                lint: true,
                gutters: [ 'CodeMirror-lint-markers', ],
                theme: 'material',
                tabSize: 2,
                lineWrapping: true,
                matchBrackets: true,
                matchTags: true,
                autoCloseTags: true,
                autoCloseBrackets: true,
                readOnly: this.state.readOnly,
              }}
              onChange={this.onChangeEditor}
            />
          )}
         </EditorContainer>

        {this.state.projectPath && (
          <PreviewContainer hidden={this.state.hidePreview}>
            <ProjectPreview
              hidden={this.state.hidePreview}
              hidePreview={this.hidePreview}
              projectURL={this.state.projectPath}
              projectName={this.state.projectName}
              reloadFrame={this.reloadFrame}
            />
          </PreviewContainer>
        )}

        {this.state.hidePreview && (
          <EditorPreviewButton action={this.showPreview} />
        )}

        </SectionContainer>
      </ThemeProvider>
    )
  }
}

export default withCookies(withRouter(ProjectEditor))
