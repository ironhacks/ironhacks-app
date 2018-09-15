// IronHacks Platform
// newHack.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Date Picker
import DayPicker, { DateUtils } from 'react-day-picker';
// Include the locale utils designed for moment
import { formatDate } from 'react-day-picker/moment';
import moment from 'moment';
//Custom Constants
import * as Constants from '../../../../constants.js';
//Custom Components
import Separator from '../../../utilities/separator.js';
import Phase from './phase.js';

//DatePicker css
import 'react-day-picker/lib/style.css';

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

  overflow: auto;
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
const DatePickerContainer = styled('div')`
  display: ${(props) => {
    console.log(props)
    if(props.phase === 0) {
      return 'none'
    }else{
      return 'block'
    }
  }}
  position: relative;
  top: 30px;
  left: 20px;
  margin-bottom: 10px;
`;  

class NewHack extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hackName : '',
      from: undefined,
      to: undefined,
      selectedPhase: 0,
      phases: [{coding: {start: moment(), end: moment()}, evaluation: {start: moment(), end: moment()}}],
      forums: [],
    }
  }

  componentDidMount() {

  }

  //Callback, reports if the title input state change
  hackNameEventHandler = (event) => {
    this.setState({hackName: event.target.value});
  };
  //Add a new Phase Json Representation Object to de phases array on the state object
  addNewPhase = () => {
    this.setState((prevState, props) => {
      return prevState.phases.push({coding: {start: moment(), end: moment()}})
    });
  };

  onPhaseCalendarClick = (phaseIndex) => {
    this.setState({selectedPhase: phaseIndex})
  };
// --------------------- Calendar functions ------------------------- //
  //Callback, handle when the user clicks on a day.
  handleDayClick = (day) => {
    //Update the range shown on the calendar.
    /*
    * range object format
    * range = {
    *   from: Date(),
    *   to: Date(),
    * }
    */
    const range = DateUtils.addDayToRange(day, this.state);
    //Setting the phase value for the correct phase index.


    this.setState(range);

    //After set the state 

  };

  showCalendarPicker = () => {
    
  }

// --------------------- Calendar functions ------------------------- //
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
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            <h2>Hack name</h2>
            <input type='text' placeholder='Hack Name' onChange={this.hackNameEventHandler}/>
            <Separator/>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            <h2>{this.state.hackName} Dates</h2>
            <p>Dates Explanation.</p>
            <Separator/>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-7 offset-md-2'>
            <h2>Phases</h2>
            <p>Phase mechanic description.</p>
            {this.state.phases.map((item, index) => (
              <Phase dates={item} phaseIndex={index + 1} key={index} onFocusHandler={this.onPhaseCalendarClick}/>  
            ))}
            <p>{this.state.from && formatDate(this.state.from, 'MMM dd YY', 'en')}</p>
            <DatePickerContainer phase={this.state.selectedPhase}>
              <DayPicker
                className="Selectable"
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
              />
            </DatePickerContainer>
            <NewElementButton onClick={this.addNewPhase}>ADD PHASE</NewElementButton>
          </div> 
        </div>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
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