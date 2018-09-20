// IronHacks Platform
// admTutorialSection.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Router
//import { Switch, Route, Redirect} from "react-router-dom";
//Customs components
import MarkdownEditor from '../../markdownEditor/markdownEditor.js';  
import Button from '../../../utilities/button.js';
//Custom Constants
import * as Constants from '../../../../constants.js';

const theme = Constants.adminInnerSectionsTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  padding: 25px 50px 50px 50px;
  height: ${props => props.theme.containerHeight};

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

class AdmTutorialSection extends React.Component {

  onEditorChange = (markdown) => {

  };

  render() {
    console.log(this.props)
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <h2>Tutorial document editor</h2>
          <p>Here you can edit and preview the tutorial document. You can also publish the document or schedule it (check bellow).</p>
          <EditorContainer>
            <MarkdownEditor editorLayout='horizontal' onEditorChange={this.onEditorChange}/>
          </EditorContainer>
          <p>Here you will find the instrictions to publish your task.</p>
          <div className='finish-cancel-button-container'>
            <Button 
              primary
              width='150px' 
              margin='0 0 0 15px'>
              Publish tutorial
            </Button>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdmTutorialSection;
