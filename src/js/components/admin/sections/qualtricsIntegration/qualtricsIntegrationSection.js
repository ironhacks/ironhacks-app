// IronHacks Platform
// admSettingsSection.js - Results Component
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Router
//Customs components  
import Separator from '../../../../utilities/separator.js';
import Button from '../../../../utilities/button.js';
//Custom Constants
//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: 100%;
  padding: 25px 50px 50px 50px;

  br {
    height: 1px;
    border: 1px solid black;
  }
`;

class AdmQualtricsIntegrationSection extends React.Component {
  constructor(props){
    super(props);
      this.state = {
    }
  }

  render() {
    return (
      <SectionContainer>
        <h2>Quatrics Integration</h2>
        <br/>
        <p>Bellow you can provide a Qualtrics survey link to complement your hack. These surveys are splited in two main types: Reseach related surveys and tutorial quizzes.</p>
        <h3>Research proccess</h3>
        <p>These surveys are mean to be used by you to control the experiment develompent, you can think of them as "breackpoints" during he contest used to ask questions to the partipants.</p>
        <p>You can place a Qualtrics survey on 3 different places: at the registration process (as part of it), any time a participant submit a project to evaluation (per phase) and when the hack ends.</p>
        <br/>

      </SectionContainer>
    );
  }
}

export default AdmQualtricsIntegrationSection;
