import { Component } from 'react'
import PropTypes from 'prop-types'

class InputCheckbox extends Component {
  handleChange = (event) => {
    if (this.props.onInputChange) {
      let value = event.target.checked
      this.props.onInputChange(this.props.name, value)
    }
  }

  render() {
    return (
      <div className={'input_field'}>
        <label className={`${this.props.containerClass}`}>
          <span className={`input__name ${this.props.labelClass ? this.props.labelClass : 'mr-3'}`}>
            {this.props.label}
          </span>
          <input
            className={`input__checkbox ${this.props.inputClass}`}
            name={this.props.name}
            type="checkbox"
            checked={this.props.isChecked}
            onChange={this.handleChange}
            disabled={this.props.disabled}
          />
        </label>
      </div>
    )
  }
}

InputCheckbox.defaultProps = {
  name: '',
  isChecked: false,
  label: '',
  containerClass: '',
  labelClass: '',
  inputClass: '',
  disabled: false,
}

InputCheckbox.propTypes = {
  name: PropTypes.string,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  onInputChange: PropTypes.func,
  disabled: PropTypes.bool,
}

export { InputCheckbox }
