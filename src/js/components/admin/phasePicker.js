// IronHacks Platform
// newHack.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Date Picker
import DatePicker from 'react-datepicker';
import moment from 'moment';
//Custom Constants
import * as Constants from '../../../constants.js';

//Custom css
//DatePicker css
import './css/react-datepicker.css';

const PhaseItem = styled('div')`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;

`;

class PhasePicker extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hackName : '',
      startDate: moment(),
      endDate: moment()
    }
  }

  //This callback reports if the title input state change
  hackNameEventHandler = (event) => {
    this.setState({hackName: event.target.value});
  };

  //This callback reports if the DatePickerState Channge
  handleChangeStart = (date) => {
    console.log(date)
    this.setState({
      startDate: date
    });
  };

  handleChangeEnd = (date) => {
    console.log(date)
    this.setState({
      endDate: date
    });
  }

  render() {
    return (
      <PhaseItem>
        <DatePicker
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
          showTimeSelect
          timeIntervals={30}
          dateFormat="MMM Do YY[          ]HH:mm"
          timeFormat="HH:mm"
          timeCaption="time"
          className="red-border"
          onlyRead={true}
        />
        <DatePicker
            selected={this.state.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            showTimeSelect
            timeIntervals={30}
            dateFormat="HH:mm[          ]MMM Do YY"
            timeFormat="HH:mm"
            timeCaption="time"
            className="red-border"
            onlyRead={true}
        />
      </PhaseItem>
    );
  }
}

export default PhasePicker;