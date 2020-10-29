import { Component } from 'react';


// <InputText
//   containerClass="flex py-1 flex-between flex-align-center"
//   inputClass="mx-2 flex-1"
//   labelClass="flex-1 h4 mb-0"
//   name="files"
//   label="Name"
//   value={this.state.formData.name || ''}
//   onInputChange={this.onFormDataChanged}
// />

class InputTextarea extends Component {
  handleChange = event => {
    let value = event.target.value;
    if (this.props.onInputChange) {
      this.props.onInputChange(this.props.name, value);
    }
  };

  render() {
    return (
      <div className={`input_field ${this.props.containerClass}`}>
        {this.props.label && (
          <label
            htmlFor={this.props.name}
            className={`input_label ${this.props.labelClass}`}
            >
            <span className="input_label__name">
              {this.props.label}
            </span>
          </label>
        )}

        <textarea
          className={`input text_input ${this.props.inputClass}`}
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

export { InputTextarea }
