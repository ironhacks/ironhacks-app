import React from 'react';
import { MaterialDesignIcon } from '../icons/material-design-icon';

class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let value = event.target.value;
    if (this.props.onInputChange) {
      this.props.onInputChange(this.props.name, value);
    }
  }

  render() {
    return (
      <div className={`input_field ${this.props.containerClass}`}>
        <label
          htmlFor={this.props.name}
          className={`input_label ${this.props.labelClass}`}
          >
          {this.props.icon && (
            <MaterialDesignIcon
              iconClass={`input_label__icon ${this.props.iconClass}`}
              name={this.props.icon}
            />
          )}
          <span className="input_label__name">
            {this.props.label}
          </span>
        </label>

        <input
          className={`input text_input ${this.props.inputClass}`}
          type="text"
          name={this.props.name}
          disabled={this.props.disabled}
          value={this.props.value}
          onChange={this.handleChange}
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
  disabled: false,
  inputClass: '',
  containerClass: '',
}

export { InputText }
