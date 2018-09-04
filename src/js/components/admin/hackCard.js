// IronHacks Platform
// newHack.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

//Section container
const CardContainer = styled('button')`
  height: 100px;
  width: 22%;
  margin-left: 4%;
  text-align: left;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.3);
  border: none;
  background-color: white; 
  padding: 0;

  &:first-child {
    margin-left: 0;
  };

  &.newHackCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      color: ${Constants.mainBgColor};
      font-size: 20px;
      font-weight: 800;
      margin: 0;
      
      &:first-child {
        line-height: 40px;
        font-size: 40px;
      }
    };

  };

  h3 {
    line-height: 12px;
    margin: 0 0 0 15px;
  };

  span {
    font-size: 12px;
    margin-left: 15px;
  };
`;
const Separator = styled('div')`
  width: 100%;
  height: 1px;
  margin-top: 25px;
  background-color: ${Constants.mainBgColor};
`;

class HackCard extends React.Component {
  
  render() {
    if(this.props.newHack === true){
      return (
        <CardContainer className='newHackCard' onClick={this.props.onClick}>
          <span>+</span>
          <span>Add Hack</span>
        </CardContainer>
      )
    }

    return (
      <CardContainer>
        <h3>HackTitle</h3>
        <span>3 Gropus, 5 Phases</span>
        <Separator/>
      </CardContainer>
    );
  }
}

export default HackCard;