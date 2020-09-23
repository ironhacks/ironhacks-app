import React from 'react';
import { userMetrics } from '../../util/user-metrics'
import { fire2Ms } from '../../util/date-utils';

function SubmissionSelectorItem({selected, buttonClass, disabled, index, onItemClick}) {
  let classes = [
    buttonClass,
    selected ? 'bg-blue-grey-lt3' : 'bg-white',
    disabled ? 'cl-grey-lt2' : 'cl-grey-dk3'
  ].join(' ');

  return (
    <div
      className={classes}
      onClick={()=>{
        if (disabled) { return false }
        onItemClick()
      }}
    >
      <span>PHASE {index + 1}</span>
    </div>
  )

}

class ResultsSubmissionSelector extends React.Component {
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
      <div className="flex flex-end py-2">
        {this.props.phases.map((item, index) => {
          return (
            <SubmissionSelectorItem
              key={index}
              buttonClass={'badge btn flex flex-col flex-align-center py-3 px-4 mx-1 bd-1'}
              selected={index === this.props.selectedPhase ? true : false}
              onItemClick={()=>this.onItemClick(index, item.submissionId, item)}
              disabled={fire2Ms(item.deadline) > Date.now()}
              index={index}
            />
          )
        })}
      </div>
    )
  }
}

export { ResultsSubmissionSelector }
