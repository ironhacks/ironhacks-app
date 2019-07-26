// IronHacks Platform
// admTutorialSection.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Router
//import { Switch, Route, Redirect} from "react-router-dom";
//Customs components
import MarkdownEditor from '../../../markdownEditor/markdownEditor.js';  
import AvailableActionsDiv from '../../../../utilities/availableActionsDiv.js';
import Button from '../../../../utilities/button.js';
//Custom Constants
import * as Constants from '../../../../../constants.js';

const theme = Constants.adminInnerSectionsTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  padding: 25px 50px 50px 50px;
  height: ${props => props.theme.containerHeight};
`;

class AdmTutorialSection extends React.Component {
  state = {previousDocument: this.props.previousDocument};

  onEditorChange = (markdown) => {
    this.props.onTutorialMarkdownUpdate(markdown);
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <h2>Tutorial document editor</h2>
          <p>Here you can edit and preview the tutorial document. You can also publish the document or schedule it (check bellow).</p>
          <MarkdownEditor editorLayout='tabbed' onEditorChange={this.onEditorChange} withContent={this.state.previousDocument}/>
          <p>Here you will find the instrictions to publish your task.</p>
          <AvailableActionsDiv>
            <Button 
              primary
              width='150px' 
              margin='0 0 0 15px'
              onClick={this.props.updateTutorialDocument}>
              Publish tutorial
            </Button>
          </AvailableActionsDiv>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdmTutorialSection;
