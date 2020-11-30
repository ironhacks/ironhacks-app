import { Component } from 'react'
import PropTypes from 'prop-types'

class InputNumber extends Component {
  handleChange = (event) => {
    let value = event.target.value
    if (this.props.onInputChange) {
      this.props.onInputChange(this.props.name, value)
    }
  }

  render() {
    return (
      <div className={`input_field ${this.props.containerClass}`}>
        <label htmlFor={this.props.name} className={`input_label ${this.props.labelClass}`}>
          <span className="input_label__name">{this.props.label}</span>
        </label>

        <input
          className={`input text_input ${this.props.inputClass}`}
          type="number"
          min={this.props.min}
          max={this.props.max}
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}

InputNumber.defaultProps = {
  name: '',
  label: '',
  labelClass: '',
  inputClass: '',
  containerClass: '',
  disabled: false,
  min: 0,
  max: 99999,
}

InputNumber.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  label: PropTypes.string,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onInputChange: PropTypes.func,
}

export { InputNumber }
