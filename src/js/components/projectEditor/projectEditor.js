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

  .editor-container {
    width: 100%;
    height: 100%;

    .CodeMirror {
      width: 100%;
    height: 100%;      
    }
  }
`;

const initValue = `const InitMessage = I ♥ IronHacks;

function printMessage = (message) {
  console.log(message);
}
`

const Editor = styled(CodeMirror)`
  width: 100%;
  height: 100%;
`;

var defaults = {
  javascript: 'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};',
  
}

class ProjectEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      readonly: false,
      mode: 'javascript',
    }
  }
  
  render() {
      const { readOnly, mode, code, calc_title } = this.state
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer className='container-fluid'>
          <div className='row editor-container'>
            <div className='col-md-12 editor-container'>
              <Editor
                value={initValue}
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
                onChange={(editor, data, value) => {
                }}
              />
            </div>
          </div>
        </SectionContainer> 
      </ThemeProvider>
    );
  }
}

export default ProjectEditor;