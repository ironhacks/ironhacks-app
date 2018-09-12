// IronHacks Platform
// datePickerContainer.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
import moment from 'moment';
//Custom Constants
import * as Constants from '../../../../constants.js';

//Custom css
//DatePicker css
import 'react-day-picker/lib/style.css';

const PhaseItem = styled('div')`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;

`;

class Phase extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    
    return (
      <PhaseItem>
        <div>
        </div>
      </PhaseItem>
    );
  }
}

export default Phase;