// IronHacks Platform
// admTaskSection.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Router
//import { Switch, Route, Redirect} from "react-router-dom";
//Customs components
import MarkdownEditor from '../../../markdownEditor/markdownEditor.js';  
import Button from '../../../../utilities/button.js';
//Custom Constants
import * as Constants from '../../../../../constants.js';

const theme = Constants.adminInnerSectionsTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: 100%;
  padding: 25px 50px 50px 50px;

  .finish-cancel-button-container {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    height: 50px;
  }
`;
const EditorContainer = styled('div')`
  height: 500px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

class AdmTaskSection extends React.Component {
  state = {previousDocument: this.props.previousDocument};

  onEditorChange = (markdown) => {
    this.props.onTaskMarkdownUpdate(markdown);
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <h2>Task document editor</h2>
          <p>Here you can edit and preview the Task document. You can also publish the document or schedule it (check bellow).</p>
          <EditorContainer>
            <MarkdownEditor editorLayout='horizontal' onEditorChange={this.onEditorChange} withContent={this.state.previousDocument}/>
          </EditorContainer>
          <p>Here you will find the instrictions to publish your task.</p>
          <div className='finish-cancel-button-container'>
            <Button 
              primary
              width='150px' 
              margin='0 0 0 15px'
              onClick={this.props.updateTaskDocument}>
              Publish Task
            </Button>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdmTaskSection;
