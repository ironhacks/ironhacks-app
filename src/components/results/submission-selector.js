import { Component } from 'react'
import { userMetrics } from '../../util/user-metrics'
import Select from 'react-select'

class ResultsSubmissionSelector extends Component {
  onSelectChanged = (selected) => {
    if (this.props.currentSubmission === selected.value) {
      return false
    }

    userMetrics({
      event: 'results_phase_view',
      data: {
        selected: selected.value,
      },
    })

    this.props.onSelect(selected)
  }

  render() {
    return (
      <div className="my-2 w-250">
        <Select
          className={'fs-m1 font-bold'}
          options={this.props.selectOptions}
          value={this.props.selectValue}
          onChange={this.onSelectChanged}
          isDisabled={this.props.disabled}
        />
      </div>
    )
  }
}

export { ResultsSubmissionSelector }
