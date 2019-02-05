// IronHacks Platform
// timeLine.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, { css } from 'styled-components';
//Custom Constants
import * as Constants from '../../constants.js';
import * as DateFormater from './dateFormater.js';

const TimeLineContainer = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  background-color: #f9f9f8;
  padding: 5px 0 ;

  div {
    height: 100%;
  }
`;

const PhaseItem = styled('button')`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 1px solid #e6b92f;
  border-radius: 15px;
  margin-left: 5px;
  width: 140px;
  height: 60px;
  cursor: pointer;

  &:hover, &:active, &:focus {
    outline: none;
  }

  p {
    margin: 0;
    font-weight: 700;

    &.current {
      font-size: 12px;
    }
  }

  ${(props) => props.selected && css`
    background-color: #ffe085;
  `}

  &:hover {
    background-color: #fff1c7;
  }
`;

class TimeLine extends React.Component {
  constructor(props) {
    super(props);
    const { phases } = props;
    this.state = {
      phases,
    }
  }

  componentWillMount() {
    const currentPhase = DateFormater.getCurrentPhase(this.state.phases).index;
    this.setState({currentPhase})
  }

  onPhaseClick = (phase) => {
    this.setState({currentPhase: parseInt(phase)})
    this.props.onClick(phase)
  }

  render() {
    return (
      <TimeLineContainer>
        {this.state.phases.map((phase, i) => {
          const startDate = new window.firebase.firestore.Timestamp(phase.codingStartDate.seconds, phase.codingStartDate.nanoseconds);
          const day = startDate.toDate().getDate();
          return (
            <PhaseItem
             key={phase.index}
             selected={i === this.state.currentPhase || i === this.props.currentPhase  - 1}
             onClick={() => this.onPhaseClick(phase.index)}>
              <p>PHASE {i+1}</p>
              {this.props.currentPhase - 1 === i && <p className='current'>CURRENT PHASE</p>}
            </PhaseItem>
          )
        })}
          
      </TimeLineContainer>
    );
  }
}

export default TimeLine;