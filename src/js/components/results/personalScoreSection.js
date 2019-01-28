// IronHacks Platform
// personalScoreSection.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import * as Texts from './staticTexts.js';

import PersonalScoreItem from './personalScoreItem.js';

const SectionContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  min-height: 600px;
  border-radius: ${Constants.universalBorderRadius};
`;

class PersonalScoreSection extends React.Component {
  constructor(props){
    super(props)
    this.state =  {
      
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <SectionContainer>
        <PersonalScoreItem type='technology'/>
        <PersonalScoreItem type='analytics'/>
        <PersonalScoreItem type='infoVis'/>
      </SectionContainer>
    );
  }
}

export default PersonalScoreSection;