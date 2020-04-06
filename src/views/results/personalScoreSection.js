// personalScoreSection.js

import React from 'react';

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
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <SectionContainer>
        <PersonalScoreItem
          type='technology'
          score={this.props.scores.tech}
          phase={this.props.currentPhase}
        />
        <PersonalScoreItem
          type='analytics'
          score={this.props.scores.analytics}
          phase={this.props.currentPhase}
        />
        <PersonalScoreItem
          type='visualization'
          score={this.props.scores.InfoVis}
          phase={this.props.currentPhase}
        />
      </SectionContainer>
    );
  }
}

export default PersonalScoreSection;
