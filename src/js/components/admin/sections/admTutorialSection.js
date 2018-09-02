// IronHacks Platform
// results.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Router
import { Switch, Route, Redirect} from "react-router-dom";
//Customs components
import MarkdownEditor from '../../markdownEditor/markdownEditor.js';
//Custom Constants
import * as Constants from '../../../../constants.js';

const theme = Constants.adminInnerSectionsTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  padding: 25px 50px 50px 50px;
  height: ${props => props.theme.containerHeight};
`;
const EditorContainer = styled('div')`
  height: 500px;
  margin-top: 20px;
`;

class AdmTutorialSection extends React.Component {

  onEditorChange = (markdown) => {

  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <h2>Tutorial document editor</h2>
          <span>Here you can edit and preview the tutorial document. You can also publish the document or schedule it (check bellow).</span>
          <EditorContainer>
            <MarkdownEditor editorLayout='horizontal' onEditorChange={this.onEditorChange}/>
          </EditorContainer>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdmTutorialSection;
