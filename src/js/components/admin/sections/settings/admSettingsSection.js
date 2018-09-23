// IronHacks Platform
// admSettingsSection.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Router
//import { Switch, Route, Redirect} from "react-router-dom";
//Customs components  
import Separator from '../../../../utilities/separator.js';
import AvailableActionsDiv from '../../../../utilities/availableActionsDiv.js';
import Button from '../../../../utilities/button.js';
//Custom Constants
import * as Constants from '../../../../../constants.js';

const theme = Constants.adminInnerSectionsTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: 100%;
  padding: 25px 50px 50px 50px;

  textarea {
    width: 50%;
    height: 120px;
  }
`;

class AdmSettingsSection extends React.Component {
  state = {previousDocument: this.props.previousDocument};

  onEditorChange = (markdown) => {
    this.props.onTaskMarkdownUpdate(markdown);
  };

  render() {
    return (  
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <h2>{this.props.hack.name}'s Settings</h2>
          <Separator primary/>
          <h3><label htmlFor='whiteList'>White List</label></h3>
          <p>The white list is an email list that the defines which users are allow to register and participate in a hack (like a participants list). Please introduce the list of emails separated by commas (,).</p>
          <textarea id='whiteList' placeholder='participant@email.com, participant@email.com, participant@email.com, participant@email.com...'>{this.props.hack.whiteList.map(())}</textarea>
          <AvailableActionsDiv>
            <Button 
              primary
              width='150px' 
              margin='0 0 0 15px'
              onClick={this.props.onSaveSettings}>
              Save
            </Button>
          </AvailableActionsDiv>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdmSettingsSection;
