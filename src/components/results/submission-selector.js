import { Component } from 'react';
import { userMetrics } from '../../util/user-metrics'
import { fire2Ms } from '../../util/date-utils';

function SubmissionSelectorItem({
  selected,
  buttonClass,
  title,
  disabled,
  index,
  onItemClick,
}) {
  let classes = [
    buttonClass,
    selected ? 'selected' : '',
    disabled ? 'disabled' : ''
  ].join(' ');

  return (
    <div
      className={classes}
      onClick={()=>{
        if (disabled) { return false }
        onItemClick()
      }}
    >
      <span>{title}</span>
    </div>
  )

}

class ResultsSubmissionSelector extends Component {
  onItemClick(phase, submissionId) {
    userMetrics({
      event: 'results_phase_view',
      data: {
        selected: submissionId,
      }
    })

    this.props.onClick(phase, submissionId)
  }

  render() {
    return (
      <div className="submission_selector">
        {this.props.phases.map((item, index) => {
          return (
            <SubmissionSelectorItem
              key={index}
              buttonClass={'submission_selector__item'}
              selected={index === this.props.selectedPhase ? true : false}
              onItemClick={()=>this.onItemClick(index, item.submissionId, item)}
              disabled={this.props.resultsPublished[item.submissionId] ? !this.props.resultsPublished[item.submissionId] : true }
              title={`Phase ${index + 1}`}
            />
          )
        })}
        {this.props.finalResults && (
          <SubmissionSelectorItem
            buttonClass={'submission_selector__item'}
            selected={this.props.selectedPhase === 'final' ? true : false}
            onItemClick={()=>this.onItemClick('final', 'final')}
            disabled={false}
            title={'Final'}
          />
        )}
      </div>
    )
  }
}

export { ResultsSubmissionSelector }
