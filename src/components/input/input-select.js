import { Component } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

class InputSelect extends Component {
  handleChange = (value) => {
    if (this.props.onInputChange) {
      this.props.onInputChange(this.props.name, value)
    }
  }

  render() {
    return (
      <div className={['input_field', this.props.containerClass].join(' ').trim()}>
        <label
          className={['input_label input_label__name', this.props.labelClass].join(' ').trim()}
          htmlFor={this.props.name}
        >
          {this.props.label}
        </label>

        <Select
          className={this.props.inputClass}
          options={this.props.options}
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}
          isDisabled={this.props.disabled}
        />
      </div>
    )
  }
}

InputSelect.defaultProps = {
  name: 'input_select',
  label: '',
  labelClass: '',
  inputClass: '',
  containerClass: '',
  disabled: false,
}

InputSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.object,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onInputChange: PropTypes.func,
}

export { InputSelect }
