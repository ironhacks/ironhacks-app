import React from 'react';

class InputCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.isChecked
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log('change', 'from', this.state.isChecked, 'to', event.target.checked);
    this.setState({
      isChecked: event.target.checked
    })
    if (this.props.onInputChanged){
      console.log('test');
      this.props.onInputChanged(event.target.checked);
    }
  }

  render() {
    return (
      <div className="input_field">
        <label>
          <span className="input__name">{this.props.name}</span>
          <input
            className="input__checkbox"
            type="checkbox"
            checked={this.state.isChecked}
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
}

export { InputCheckbox }
