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
    console.log(props)
    this.state = {
    }
  }

  isSelected = () => {
    this.props.onFocusHandler(this.props.phaseIndex)
  }

  render() {
    
    return (
      <PhaseItem>
        <PhaseInterval intervalName='Coding' 
          phaseIndex={this.props.phaseIndex}
          start={this.props.dates.coding.start} 
          end={this.props.dates.coding.end}
          onClick={this.isSelected}
        />
        <PhaseInterval intervalName='Evaluation'
          phaseIndex={this.props.phaseIndex}
          start={this.props.dates.coding.start} 
          end={this.props.dates.coding.end}
          onClick={this.isSelected}
        />
      </PhaseItem>

    );
  }
}

export default Phase;