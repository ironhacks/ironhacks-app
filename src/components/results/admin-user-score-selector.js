import { Component } from 'react'
import Select from 'react-select'

class ResultsAdminUserScoreSelector extends Component {
  onSelectChanged = (selected) => {
    if (this.props.selectValue && this.props.selectValue.value === selected.value) {
      return false
    }

    this.props.onSelect(selected)
  }

  render() {
    return (
      <div className="my-2 w-250">
        <Select
          className={'fs-m3 font-bold text-monospace'}
          options={this.props.selectOptions}
          placeholder={<div>Select a User</div>}
          value={this.props.selectValue}
          onChange={this.onSelectChanged}
          isDisabled={this.props.disabled}
        />
      </div>
    )
  }
}

export { ResultsAdminUserScoreSelector }
