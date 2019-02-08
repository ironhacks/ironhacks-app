// IronHacks Platform
// personalScoreSection.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';

import PersonalScoreItem from './personalScoreItem.js';

const SectionContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  overflow: hidden;
  border-radius: 40px;
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
        <PersonalScoreItem type='technology' score={this.props.scores.tech}/>
        <PersonalScoreItem type='analytics' score={this.props.scores.analytics}/>
        <PersonalScoreItem type='visualization' score={this.props.scores.InfoVis}/>
      </SectionContainer>
    );
  }
}

export default PersonalScoreSection;