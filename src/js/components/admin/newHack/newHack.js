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
//Custom Constants
import * as Constants from '../../../../constants.js';
//Custom Components
import Separator from '../../../utilities/separator.js';
import Button from '../../../utilities/button.js';
import Phase from './phase.js';
import ForumItem from './forumItem.js';

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

  input {
    border: 1px solid gray;
    border-radius: 4px;
    background-color: lightgray;
    padding-left: 10px;
  }

  .finish-cancel-button-container {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    height: 50px;
  }
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
const DatePickerContainer = styled('button')`
  display: ${(props) => {
    if(props.phase === 0) {
      return 'none'
    }else{
      return 'block'
    }
  }}
  top: 30px;
  left: 20px;
  margin-bottom: 10px;
  background-color: transparent;
  border: none;

  &:focus {
    outline: 0;
  }
`;  

class NewHack extends React.Component {

  _timeoutID;

  constructor(props){
    super(props);
    this.state = {
      hackName : '',
      from: undefined,
      to: undefined,
      selectedPhase: 0,
      isCalendarManagingFocus: false,
      phases: [{coding: {start: new Date(), end: new Date()}, evaluation: {start: new Date(), end: new Date()}}],
      forums: [''],
    }

    //References
    this.calendarContainerRef = React.createRef();  
  };

  componentDidMount = () => {

  };

  componentDidUpdate = () => {
    this.calendarContainerRef.current.focus()
  };

  //Callback, reports if the title input state change
  hackNameEventHandler = (event) => {
    this.setState({hackName: event.target.value});
  };

//---------------------- Phase Functions -----------------------------//
  //Add a new Phase Json Representation Object to de phases array on the state object
  addNewPhase = () => {
    this.setState((prevState, props) => {
      return prevState.phases.push({coding: {start: new Date(), end: new Date()}, evaluation: {start: new Date(), end: new Date()}})
    });
  };

  onPhaseClick = (phaseIndex, phaseStage) => {
    var range;
    console.log(this.state.phaseState)
    if(phaseStage === 'coding') {
      range = {
        from: this.state.phases[phaseIndex - 1].coding.start,
        to: this.state.phases[phaseIndex - 1].coding.end,
      }
    }else{
      range = {
        from: this.state.phases[phaseIndex - 1].evaluation.start,
        to: this.state.phases[phaseIndex - 1].evaluation.end,
      }
    };
    console.log(range)
    this.setState((prevState, props) => {
      return {selectedPhase: phaseIndex,
      phaseStage: phaseStage,
      from: range.from,
      to: range.to}
    })
  };
//---------------------- Phase Functions -----------------------------//
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
    console.log(this.state)
    //Setting the phase value for the correct phase index and updating the calendar display
    this.setState((prevState, props) => {
      console.log(prevState.phaseStage)
      if(prevState.phaseStage === 'coding'){
        prevState.phases[prevState.selectedPhase - 1].coding = {
          start: range.from,
          end: range.to
        }
      }else if(prevState.phaseStage === 'evaluation'){
        prevState.phases[prevState.selectedPhase - 1].evaluation = {
          start: range.from,
          end: range.to
        }
      }
      console.log(prevState.phases)
      return {phases: prevState.phases, from: range.from, to: range.to}
    });
  };

  _onCalendarContainerBlur = () => {
    this._timeoutID = setTimeout(() => {
      if (this.state.isCalendarManagingFocus) {
        this.setState({
          isCalendarManagingFocus: false,
          selectedPhase: 0
        });
      }
    }, 0);
  };

  _onCalendarContainerFocus = () => {
    clearTimeout(this._timeoutID);
    if (!this.state.isCalendarManagingFocus) {
      this.setState({
        isCalendarManagingFocus: true,
      });
    }
  };
// --------------------- Calendar functions ------------------------- //
// --------------------- forum functions ------------------------- //
  //Add a new Phase Json Representation Object to de forum array on the state object
  addNewForum = () => {
    this.setState((prevState, props) => {
      return prevState.forums.push('')
    });
  };
// --------------------- forum functions ------------------------- //

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
              <Phase dates={item} phaseIndex={index + 1} key={index} onFocusHandler={this.onPhaseClick}/>  
            ))}
            <DatePickerContainer className='date-picker-container' phase={this.state.selectedPhase} innerRef={this.calendarContainerRef} onBlur={this._onCalendarContainerBlur} onFocus={this._onCalendarContainerFocus}>
              <DayPicker
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
              />
            </DatePickerContainer>
            <NewElementButton onClick={this.addNewPhase} >ADD PHASE</NewElementButton>
          </div> 
        </div>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            <Separator/>
            <h2>Forums</h2>
            {this.state.forums.map((item, index) => (
              <ForumItem name={item} forumIndex={index + 1} key={index}/>  
            ))}
            <NewElementButton onClick={this.addNewForum}>ADD FORUM</NewElementButton>
            <Separator/>
          </div>
        </div>
         <div className='row'>
          <div className='col-md-8 offset-md-2'>
            <h2>Forums</h2>
            {this.state.forums.map((item, index) => (
              <ForumItem name={item} forumIndex={index + 1} key={index}/>  
            ))}
            <NewElementButton onClick={this.addNewForum}>ADD FORUM</NewElementButton>
            <Separator/>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8 offset-md-2 finish-cancel-button-container'>
            <Button width='150px' margin='0 0 0 15px' primary>Create Hack</Button>
            <Button width='150px'>Cancel</Button>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default NewHack;