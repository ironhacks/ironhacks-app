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
      <div className="input_field">
        <label>
          <span className="input__name mr-3">
            {this.props.label}
          </span>
          <input
            className="input__checkbox"
            name={this.props.name}
            type="checkbox"
            checked={this.props.isChecked}
            onChange={this.handleChange}
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
}

export { InputCheckbox }
