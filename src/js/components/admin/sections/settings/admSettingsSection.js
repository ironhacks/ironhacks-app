// IronHacks Platform
// admSettingsSection.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Router
//import { Switch, Route, Redirect} from "react-router-dom";
//Customs components  
import Separator from '../../../../utilities/separator.js';
import AvailableActionsDiv from '../../../../utilities/availableActionsDiv.js';
import Button from '../../../../utilities/button.js';
//Custom Constants
import * as Constants from '../../../../../constants.js';

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

const WhiteListContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 45px;
  max-height: 180px;
  overflow-x: auto;
`;

const WhiteListItem = styled('div')`
  display: flex;
  flex-direction: row;
  height: 35px;
  padding: 10px 5px;
`

class AdmSettingsSection extends React.Component {

  onWhiteListChange = (e) => {
    this.normalizeTextAreaContent(e.target.value);
  };

  normalizeTextAreaContent = (textareaContent) => {
    const emailList = textareaContent.split(/,| |\n/);
    this.setState({whiteList: emailList});
  }

  render() {
      console.log(this.props.hack)
    return (
      <SectionContainer>
        <h2>{this.props.hack.name}'s Settings</h2>
        <Separator primary/>
        <h3><label htmlFor='whiteList'>White List</label></h3>
        <p>The white list is an email list that the defines which users are allow to register and participate in a hack (like a participants list). Please introduce the list of emails separated by commas (,).</p>
        <WhiteListContainer>
          {this.state && this.state.whiteList.map((item, index) => {
            return <WhiteListItem key={index}>
              {item}
            </WhiteListItem>
          })}
        </WhiteListContainer>
        <textarea id='whiteList' placeholder='participant@email.com, participant@email.com, participant@email.com, participant@email.com...' onChange={this.onWhiteListChange}></textarea>
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
    );
  }
}

export default AdmSettingsSection;
