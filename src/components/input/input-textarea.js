import { Component } from 'react'
import PropTypes from 'prop-types'

class InputTextarea extends Component {
  handleChange = (event) => {
    let value = event.target.value
    if (this.props.onInputChange) {
      this.props.onInputChange(this.props.name, value)
    }
  }

  render() {
    return (
      <div className={['input_field', this.props.containerClass].join(' ').trim()}>
        {this.props.label && (
          <label htmlFor={this.props.name} className={['input_label', this.props.labelClass].join(' ').trim()}>
            <span className="input_label__name">{this.props.label}</span>
          </label>
        )}

        <textarea
          className={['input text_input', this.props.inputClass].join(' ').trim()}
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}

InputTextarea.defaultProps = {
  name: '',
  label: false,
  labelClass: '',
  inputClass: '',
  containerClass: '',
  disabled: false,
}

InputTextarea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onInputChange: PropTypes.func,
}

export { InputTextarea }
