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
import WhiteListItem from './whiteListItem.js';
import AvailableActionsDiv from '../../../../utilities/availableActionsDiv.js';
import Button from '../../../../utilities/button.js';
//Custom Constants
import * as Constants from '../../../../../constants.js';

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: 100%;
  padding: 25px 50px 50px 50px;

  input {
    width: 100%;
    max-height: 45px;
  }

  .new-item-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const WhiteListContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 15px;
  overflow-x: auto;
`;

const NewWhiteListItem = styled('input')`
  width 100%;
`;

class AdmSettingsSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      whiteList: ['']
    }
  }

  onWhiteListChange = (e) => {
    if(e.target.value.split(/,| |\n/).length > 1){
      this.normalizeInputContent(e.target.value);
    }
  };

  onWhiteListItemChange = (email, index) => {
    this.setState((prevState, props) => {
      prevState.whiteList[index] = email;
      return {whiteList: prevState.whiteList};
    })
  };
  onWhiteListItemDelete = (index) => {
    this.setState((prevState, props) => {
      if(prevState.whiteList.length === 1) {
        return {whiteList: ['']};  
      }else{
        prevState.whiteList.splice(index, 1);
        return {whiteList: prevState.whiteList};
      }
    })
  };

  normalizeInputContent = (textareaContent) => {
    var emailList = textareaContent.split(/,| |\n/);
    // Removing empty string at the end.
    emailList.splice(1, 1);
    this.setState((prevState, props) => {
      var joinedList = prevState.whiteList.concat(emailList)
      if(joinedList[0] === ''){
        joinedList.splice(0, 1);
      }
      return {whiteList: joinedList}
    }); 
  };

  // This function sort the emails array, then remove the duplicates.
  normalizeEmailArray = (array) => {
    const _this = this
    return array.sort().filter(function(item, pos, ary) {
        if(!_this.validateEmailStructure(item)){
          return false;
        }
        return !pos || item !== ary[pos - 1];
    })
  };

  saveChanges = () => {
    var normalizeWhiteList = this.state.whiteList;
    normalizeWhiteList = this.normalizeEmailArray(normalizeWhiteList);
    this.props.onSaveSettings(normalizeWhiteList);
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
          {this.state.whiteList && this.state.whiteList.map((item, index, arr) => {
            if(item !== ''){
              if(arr.length === 1 || arr.length - 1 === index){
                return <div className='new-item-list' key={index + item}>
                  <WhiteListItem key={index + item} index={index} userEmail={item} onChange={this.onWhiteListItemChange} onWhiteListItemDelete={this.onWhiteListItemDelete} isValid={this.validateEmailStructure(item)}/>
                  <NewWhiteListItem id='whiteList' placeholder='participant@email.com, participant@email.com...' onChange={this.onWhiteListChange} autoFocus/>
                </div>
              }else{
                return <WhiteListItem key={index + item} index={index} userEmail={item} onChange={this.onWhiteListItemChange} onWhiteListItemDelete={this.onWhiteListItemDelete} isValid={this.validateEmailStructure(this.props.userEmail)}/>
              }
            }else{
              return <NewWhiteListItem key={index + item} id='whiteList' placeholder='participant@email.com, participant@email.com...' onChange={this.onWhiteListChange} autoFocus/>
            }
          })}
        </WhiteListContainer>
        <AvailableActionsDiv>
          <Button 
            primary
            width='150px' 
            margin='0 0 0 15px'
            onClick={this.saveChanges}>
            Save
          </Button>
        </AvailableActionsDiv>
      </SectionContainer>
    );
  }
}

export default AdmSettingsSection;
