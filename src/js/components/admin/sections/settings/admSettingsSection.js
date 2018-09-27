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
    width: 100%;
    max-height: 45px;
  }
`;

const WhiteListContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-height: 180px;
  margin-bottom: 15px;
  overflow-x: auto;
`;

const WhiteListItem = styled('div')`
  height: 35px;
  padding: 10px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${Constants.universalBorderRadius};
  background-color: ${(props) => 
    props.isValid ? Constants.mainBgColor : 'red'
  };
`

class AdmSettingsSection extends React.Component {

  onWhiteListChange = (e) => {
    this.normalizeTextAreaContent(e.target.value);
  };

  normalizeTextAreaContent = (textareaContent) => {
    const emailList = textareaContent.split(/,| |\n/);
    this.setState((prevState, props) => {
      if(!prevState){
        return {whiteList: this.normalizeEmailArray(emailList)}
      }else{
        prevState.whiteList = prevState.whiteList.concat(emailList)
        return {whiteList: emailList}
      }
    });
  };

  // This function sort the emails array, then remove the duplicates.
  normalizeEmailArray = (array) => {
    return array.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
  };

  //This function is just to verify the simplest email format: string@string.string, and is just to give and alert to the researcher in case one email is not valid.
  validateEmailStructure = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    return (
      <SectionContainer>
        <h2>{this.props.hack.name}'s Settings</h2>
        <Separator primary/>
        <h3><label htmlFor='whiteList'>White List</label></h3>
        <p>The white list is an email list that the defines which users are allow to register and participate in a hack (like a participants list). Please introduce the list of emails. You can separate them by commas (,) whitespaces or by pressing intro. You can also copy-paste them directly from excel.</p>
        <WhiteListContainer>

          {this.state && this.state.whiteList.map((item, index) => {
            if(item !== ''){
              return <WhiteListItem key={index} isValid={this.validateEmailStructure(item)}>
                {item}
              </WhiteListItem>
            }
          })}
        </WhiteListContainer>
        <textarea id='whiteList' placeholder='participant@email.com, participant@email.com...' onChange={this.onWhiteListChange}></textarea>
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
