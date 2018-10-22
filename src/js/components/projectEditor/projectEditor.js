// IronHacks Platform
// proyectEditor.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co
import React from 'react';
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

window.JSHINT = JSHINT
const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
  padding: 0 !important;

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

  button {
    position: absolute;
    bottom: 10hv;
  }
`;

const Editor = styled(CodeMirror)`
  width: 100%;
  height: 80%;
`;

const PreviewContainer = styled('div')`
  width: 100%;
  height: 100%

  iframe {
    border: none;
    width: 100%;
    height: 100%;
  }
`;

const editorThemplate = `<!DOCTYPE html>
  <html>
  <head>
    <title></title>
  </head>
  <body>
  
  </body>
</html>`;

var defaults = {
  javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};',
  
}

class ProjectEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorContent: editorThemplate,
      readonly: false,
      mode: 'xml',
    }
  }

  componentDidMount() {
    this.getUserData();
  }

  // This funciton calls Firebase SDK to know if there is an active user session
  getUserData = () => {
    const _this = this;
    window.firebase.auth().onAuthStateChanged((user) => {
      if(user){
        _this.setState({user: user});
        _this.isAdmin(); //We only check this to display specific ui items.
      };
    });
  };

  //check on the DB if the current user is admin.
  isAdmin = () => {
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    //Updating the current hack:
    firestore.collection('admins').doc(this.state.user.uid)
    .get()
    .then(function(doc) {
      //Is admin.
      _this.setState((prevState, props) => {
        prevState.user.isAdmin = true;
        return prevState;
      });
      _this.getProject();
    }) 
    .catch(function(error) {
      // The user can't read the admins collection, therefore, is not admin.
      _this.setState((prevState, props) => {
        prevState.user.isAdmin = false;
        return prevState;
      });
      _this.getProject();
    });
  };

  getProject = () => {
    // Create a reference with an initial file path and name
    var storage = window.firebase.storage().ref();
    const proyectPath = `${Constants.cloudFunctionsProdEndPoint}/previewWebServer/${this.state.user.uid}/${this.props.match.params.proyectName}/index.html`; 
    this.setState({proyectPath: proyectPath});
    /*
    storage.child(proyectPath).getDownloadURL().then(function(url) {
      console.log(url)
      _this.setState({index: url})
    })
    */
  };

  saveProject = () => {
    // Create a root reference
    var storageRef = window.firebase.storage().ref();
    var indexRef = storageRef.child('test/index.html');
    // Raw string is the default if no format is provided
    var message = this.state.editorContent;
    console.log(message)
    var myblob = new Blob([message], {
        type: 'text/html'
    });
    const _this = this;
    indexRef.put(myblob).then(function(snapshot) {
      console.log('Uploaded a raw string!');
      _this.getProject();
    });
  }

  onChangeEditor = (editor, data, value) => {
    console.log(value)
    this.setState({editorContent: value})
  }
  
  render() {
    console.log(this.props, this.state)
      const { readOnly, mode, code, calc_title } = this.state
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer className='container-fluid'>
          <div className='row no-gutters'>
            <div className='col-md-6 editor-container'>
              <Editor
                value={editorThemplate}
                options={{
                    lineNumbers: true,
                    mode: mode,
                    lint: true,
                    gutters: [
                     'CodeMirror-lint-markers',
                   ],
                    theme: 'material',
                    esversion: 6
                }}
                onChange={this.onChangeEditor}
              />
            </div>
            <PreviewContainer className='col-md-6'>
              {this.state.proyectPath && <iframe src={this.state.proyectPath} />}
              <button onClick={this.saveProject} className={"save-button"}> Save </button>
            </PreviewContainer>
          </div>
        </SectionContainer> 
      </ThemeProvider>
    );
  }
}

export default ProjectEditor;