// newHack.js


import React from 'react';

import styled from 'styled-components';

import {Theme} from '../../theme';
const colors = Theme.COLORS;


const CardContainer = styled('button')`
  height: 150px;
  width: 30%;
  margin: 10px;
  text-align: left;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.3);
  border: none;
  background-color: white;
  padding: 0;

  &.newHackCard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      color: ${colors.mainBgColor};
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
    line-height: 16px;
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
  background-color: ${colors.mainBgColor};
`;

class HackCard extends React.Component {
  onHackCardClick = () => {
    this.props.onClick(this.props.index, this.props.hack.registrationSurvey);
  };

  render() {
    if (this.props.newHack === true) {
      return (
        <CardContainer className='newHackCard' onClick={this.props.onClick}>
          <span>+</span>
          <span>Add Hack</span>
        </CardContainer>
      );
    }

    return (
      <CardContainer onClick={this.onHackCardClick}>
        <h3>{this.props.hack.name}</h3>
        <span>{'Phases: ' + this.props.hack.phases.length}</span>
        <Separator/>
      </CardContainer>
    );
  }
}

export default HackCard;
