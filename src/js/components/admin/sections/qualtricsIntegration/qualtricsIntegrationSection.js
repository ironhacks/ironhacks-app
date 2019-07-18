// IronHacks Platform
// admSettingsSection.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Router
import { Link } from "react-router-dom";
//Customs components  
import Separator from '../../../../utilities/separator.js';
import Button from '../../../../utilities/button.js';
//Section container
const SectionContainer = styled('form')`
  width: 100%;
  height: 100%;
  padding: 25px 50px 50px 50px;

  label {
    display: flex;
    witdh: 100%;
    font-weight: 700;
    padding-left: 15px;

    input {
      flex-grow: 1;
      margin-left: 15px;
      border: none;
      border-bottom: solid darkslategray 1px;
    }
  }
`;

class AdmQualtricsIntegrationSection extends React.Component {
  constructor(props){
    super(props);
      const { hack } = props
      this.state = {
        hack,
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    console.log(this.state.hack.phases)
    return (
      <SectionContainer onSubmit={this.saveSurveys}>
        <h2>Quatrics Integration</h2>
        <p>Bellow you can provide some Qualtrics survey links to complement your hack. These surveys are splited in two main types: Reseach related surveys and tutorial quizzes.</p>
        <p>TODO: PUT HERE THE PATH TO GET THE LINKS FROM QUALTRICS.</p>
        <Separator primary/>
        <h3>Research proccess</h3>
        <p>These surveys are mean to be used by you to control the experiment develompent, you can think of them as "breackpoints" during he contest used to ask questions to the partipants.</p>
        <p>You can place a Qualtrics survey on 3 different places: at the registration process (as part of it), any time a participant submit a project to evaluation (per phase) and when the hack ends.</p>
        <label>
          Registration survey link:
          <input 
            name="registration-survey"
            type="text"
            onChange={this.handleInputChange}
            placeholder="Survey link"/>
        </label>
        <Separator/>
        {this.state.hack.phases.map((phase) => {
          return (
          <label key={phase.index}>
            Registration survey link:
            <input 
              name={`phase-survey-${phase.index}`}
              type="text"
              onChange={this.handleInputChange}
              placeholder={`Phase ${phase.index + 1} survey link`}/>
          </label>)
          })}
        <Separator />
        <label>
          Registration survey link:
          <input 
            name="end-survey"
            type="text"
            onChange={this.handleInputChange}
            placeholder="Survey link"/>
        </label>
        <Separator primary/>
        <h3>Quizzes</h3>
        <p>These surveys are displayed on the <Link to="/quizzes">Quizzes</Link> section, participant can test their abilities using them.</p>
        <label>
          Registration survey link:
          <input 
            name="quizz-survey"
            type="text"
            onChange={this.handleInputChange}
            placeholder="Survey link"/>
        </label>
        <Button>Save</Button>
      </SectionContainer>
    );
  }
}

export default AdmQualtricsIntegrationSection;
