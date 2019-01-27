// IronHacks Platform
// timeLine.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';

const TimeLineContainer = styled('div')`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 70px;

  div {
    height: 100%;
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

  render() {
    
    return (
      <TimeLineContainer>
        {this.state.phases.map((phase, i) => {
          console.log(phase)
          const startDate = new window.firebase.firestore.Timestamp(phase.codingStartDate.seconds, phase.codingStartDate.nanoseconds);
          const day = startDate.toDate().getDate();
          console.log(startDate.toDate())
          return (
            <div key={i}>
              {day}
            </div>
          )
        })}
      </TimeLineContainer>
    );
  }
}

export default TimeLine;