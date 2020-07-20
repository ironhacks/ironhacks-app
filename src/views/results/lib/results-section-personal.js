import React from 'react';
import styled from 'styled-components';
import { PersonalFeedbackContent } from './personal-feedback-content';
import PersonalScoreItem from './personal-score-item.js';

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
  render() {
    return (
      <SectionContainer>

      <h2>
        {PersonalFeedbackContent.title}
      </h2>

      {PersonalFeedbackContent.subTitle}

      {this.props.scores.tech && (
        <PersonalScoreItem
          type='technology'
          score={this.props.scores.tech}
          phase={this.props.currentPhase}
          weight={'15%'}
        />
      )}

      {this.props.scores.analytics && (
        <PersonalScoreItem
          type='analytics'
          score={this.props.scores.analytics}
          phase={this.props.currentPhase}
          weight={'25%'}
        />
      )}

      {this.props.scores.InfoVis && (
        <PersonalScoreItem
          type='visualization'
          score={this.props.scores.InfoVis}
          phase={this.props.currentPhase}
          weight={'60%'}
        />
      )}

      </SectionContainer>
    );
  }
}

export { PersonalScoreSection }
