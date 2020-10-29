import { Component } from 'react';
import Select from 'react-select';

class InputSelect extends Component {
  handleChange = value => {
    // let value = event.target.value;
    console.log('changed', value);
    if (this.props.onInputChange) {
      this.props.onInputChange(this.props.name, value);
    }
  };

  render() {
    return (
      <div className={`input_field ${this.props.containerClass}`}>
        <label
          htmlFor={this.props.name}
          className={`input_label input_label__name ${this.props.labelClass}`}
          >
            {this.props.label}
        </label>

        <Select
          className={this.props.inputClass}
          options={this.props.options}
          value={this.props.value}
          onChange={this.handleChange}
          isDisabled={this.props.disabled}
        />
      </div>
    )
  }
}


InputSelect.defaultProps = {
  name: '',
  label: '',
  labelClass: '',
  inputClass: '',
  containerClass: '',
  disabled: false,
}

export { InputSelect }
