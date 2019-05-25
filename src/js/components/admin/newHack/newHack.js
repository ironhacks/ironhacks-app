// IronHacks Platform
// newHack.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { Redirect } from 'react-router-dom';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Date Picker
import DayPicker, { DateUtils } from 'react-day-picker';
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
      selectedPhase: 0,
      from: undefined,
      to: undefined,
      isCalendarManagingFocus: false,
      phases: [{coding: {start: new Date(), end: new Date()}, evaluation: {start: new Date(), end: new Date()}}],
      forums: [{name: '', treatment: 0, participants: []}],
      isCreateEnable: true,
      mustNavigate: false
    }
    //References
    this.calendarContainerRef = React.createRef();  
  };

  componentDidUpdate = () => {
    if(this.calendarContainerRef.current){
      this.calendarContainerRef.current.focus()
    };
  };

  //Callback, reports if the title input state change
  hackNameEventHandler = (event) => {
    this.setState({
      hackName: event.target.value,
      isCreateEnable: event.target.value ? false : true,
    });
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
    //Setting the phase value for the correct phase index and updating the calendar display
    this.setState((prevState, props) => {
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
// --------------------- Forum functions ---------------------------- //
  //Add a new Phase Json Representation Object to de forum array on the state object
  addNewForum = () => {
    this.setState((prevState, props) => {
      return prevState.forums.push({name: '', treatment: 0, participants: []})
    });
  };

  onForumItemUpdate = (name, treatment, index) => {
    this.setState((prevState, props) => {
      prevState.forums[index] = {
        name: name ? name : prevState.forums[index].name,
        treatment: treatment ? treatment : prevState.forums[index].treatment,
        participants: {},
      }
      return prevState.forums;
    });
  };
// --------------------- Forum functions ---------------------------- //
// --------------------- Create Hack Process ------------------------ //
  // this fucton handle the 'create' button onClick
  createHackHandler = () => { 
    //TODO: change the ui in order to block all input fields.
    this.createHack();
  };

  createHack = () => {
    //Begin to create the hack json representation: 
    /*
    * Hack = {
    *   name: string,  
    *   phases: [{}],
    *   tutorial: {},
    *   ceremony: {},
    */

    //Mapping phases object to create the json representation of it.
    const phases = this.state.phases.map((item, index) => {
      return {
        index: index,
        codingStartDate: item.coding.start,
        codingStartEnd: item.coding.end,
        evaluationStartDate: item.evaluation.start,
        evaluationStartend: item.evaluation.end,
      }
    })

    const hackInstance = {
      name: this.state.hackName,
      phases: phases,
      tutorial: {
        doc: '',
        start: new Date(),
        end: new Date(),
      },
    }

    const adminData = {
      task: {
        doc: '',
        releaseDate: new Date(),
      },
      whiteList: [],
    }

    this.setState({hack: hackInstance});
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    //TODO: add forum id
    firestore.collection('hacks').add(hackInstance)
    .then(function(docRef) {
      const hackRef = docRef.id;
      _this.setState({hackId: hackRef});
      //Adding each forum to the hack:
      // Get a new write batch
      const batch = firestore.batch();
      _this.state.forums.forEach((forum) => {
        forum.hack = hackRef;
        const newForumRef = firestore.collection('forums').doc();
        batch.set(newForumRef, forum);
      })
      const adminDataRef = firestore.collection('adminHackData').doc(hackRef);
      batch.set(adminDataRef, adminData);
      // Commit the batch
      batch.commit().then(function () {
          //TODO: Update the UI to give feedback to the user
          _this.setState({mustNavigate: true})
      });
    })  
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  };
// --------------------- Create Hack Process ------------------------ //


  render() {
    if (this.state.mustNavigate) return <Redirect to={{ pathname: '/admin/dashboard/' + this.state.hackName, state: { hack: this.state.hack, hackId: this.state.hackId}}}/>;
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
              <ForumItem name={item} treatment={item.treatment} onForumItemUpdate={this.onForumItemUpdate} forumIndex={index} key={index}/>  
            ))}
            <NewElementButton onClick={this.addNewForum}>ADD FORUM</NewElementButton>
            <Separator/>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8 offset-md-2 finish-cancel-button-container'>
            <Button 
              primary
              width='150px' 
              margin='0 0 0 15px'
              onClick={this.createHackHandler}
              disabled={this.state.isCreateEnable}>
              Create Hack
            </Button>
            <Button width='150px'>Cancel</Button>
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default NewHack;