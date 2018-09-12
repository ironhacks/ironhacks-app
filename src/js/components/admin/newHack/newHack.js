// IronHacks Platform
// newHack.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Date Picker
import DayPicker, { DateUtils } from 'react-day-picker';
// Include the locale utils designed for moment
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import moment from 'moment';
//Custom Constants
import * as Constants from '../../../../constants.js';
//Custom Components
import Phase from './phase.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};

  h1 {
    &:first-child {
      margin: 30px 0 0 0;
    }
  };

  red-border {
    color: red;
  }

  overflow: auto;
`;
const Separator = styled('div')`
  width: 100%;
  height: 1px;
  margin-top: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => 
    props.primary ? Constants.mainBgColor : 'lightgray'
  };
`;
const NewElementButton = styled('button')`
  background-color: transparent;
  border: none;
  font-weight: 800;
  color: #4D4D4D;

  &:hover{
    cursor: pointer;
  }
`;

class NewHack extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hackName : '',
      from: undefined,
      to: undefined,
      pickingStart: false,
      phases: [{coding: {start: moment(), end: moment()}, evaluation: {start: moment(), end: moment()}}],
      forums: [],
    }
  }

  //This callback reports if the title input state change
  hackNameEventHandler = (event) => {
    this.setState({hackName: event.target.value});
  };

  addNewPhase = () => {
    this.setState((prevState, props) => {
      return prevState.phases.push(<Phase/>)
    });
  };

  handleDayClick = (day) => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  };

  addNewForum = () => {
    this.setState((prevState, props) => {
      return prevState.phases.push(<Phase/>)
    });
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <ThemeProvider theme={theme}>
      <SectionContainer className='container-fluid'>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
          	<h1>Create a new Hack</h1>
            <p>Hack description</p>
            <Separator primary/>
            <h2>Hack name</h2>
            <input type='text' placeholder='Hack Name' onChange={this.hackNameEventHandler}/>
            <Separator/>
            <h2>{this.state.hackName} Dates</h2>
            <p>Dates Explanation.</p>
            <Separator/>
            <h2>Phases</h2>
            <p>Phase mechanic description.</p>
            {this.state.phases.map((item, index) => (
              <Phase props={item} key={index} />
            ))}
            <p>{this.state.from && formatDate(this.state.from, 'MMM dd YY', 'en')}</p>
            <DayPicker
              className="Selectable"
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={this.handleDayClick}
            />
            <NewElementButton onClick={this.addNewPhase}>ADD PHASE</NewElementButton>
            <Separator/>
            <h2>Forums</h2>
            <NewElementButton onClick={this.addNewForum}>ADD FORUM</NewElementButton>
            <Separator/>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default NewHack;