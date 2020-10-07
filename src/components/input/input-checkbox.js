import React from 'react';

class InputCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.props.onInputChange){
      let value = event.target.checked
      this.props.onInputChange(this.props.name, value);
    }
  }

  render() {
    return (
      <div className={'input_field'}>
        <label className={`${this.props.containerClass}`}>
          <span className={`input__name ${this.props.labelClass ? this.props.labelClass : 'mr-3' }`}>
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

export { InputCheckbox }
