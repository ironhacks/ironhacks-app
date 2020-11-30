import { Component } from 'react'
import PropTypes from 'prop-types'

class InputText extends Component {
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
          type="text"
          name={this.props.name}
          disabled={this.props.disabled}
          value={this.props.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }
}

InputText.defaultProps = {
  name: '',
  label: '',
  labelClass: '',
  iconClass: '',
  icon: false,
  placeholder: '',
  disabled: false,
  inputClass: '',
  containerClass: '',
}

InputText.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onInputChange: PropTypes.func,
}

export { InputText }
