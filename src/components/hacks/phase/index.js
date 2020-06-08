import React from 'react';
import { PhaseItem } from './lib/phase-item';
import { PhaseInterval } from './lib/phase-interval';

export default class Phase extends React.Component {
  onCodingHandler = () => {
    this.props.onFocusHandler(this.props.phaseIndex, 'coding');
  };

  onEvaluationHandler = () => {
    this.props.onFocusHandler(this.props.phaseIndex, 'evaluation');
  };

  render() {
    return (
      <PhaseItem>
        <PhaseInterval
          intervalName='Coding'
          phaseIndex={this.props.phaseIndex}
          start={this.props.dates.coding.start}
          end={this.props.dates.coding.end}
          onClick={this.onCodingHandler}
        />
        <PhaseInterval
          intervalName='Evaluation'
          phaseIndex={this.props.phaseIndex}
          start={this.props.dates.evaluation.start}
          end={this.props.dates.evaluation.end}
          onClick={this.onEvaluationHandler}
        />
      </PhaseItem>
    );
  }
}
