// IronHacks Platform
// datePickerContainer.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
//import * as Constants from '../../../../constants.js';

//Custom components
import PhaseInterval from './phaseInterval.js';

const PhaseItem = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 15px;

`;

class Phase extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  onCodingHandler = () => {
    this.props.onFocusHandler(this.props.phaseIndex, 'coding')
  };

  onEvaluationHandler = () => {
    this.props.onFocusHandler(this.props.phaseIndex, 'evaluation')
  }

  render() {
    
    return (
      <PhaseItem>
        <PhaseInterval intervalName='Coding' 
          phaseIndex={this.props.phaseIndex}
          start={this.props.dates.coding.start} 
          end={this.props.dates.coding.end}
          onClick={this.onCodingHandler}
        />
        <PhaseInterval intervalName='Evaluation'
          phaseIndex={this.props.phaseIndex}
          start={this.props.dates.evaluation.start} 
          end={this.props.dates.evaluation.end}
          onClick={this.onEvaluationHandler}
        />
      </PhaseItem>

    );
  }
}

export default Phase;