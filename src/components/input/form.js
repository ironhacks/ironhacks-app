import React from 'react';

class InputCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
    console.log(this.state.value);
  }

  handleSubmit(event) {
    console.log(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input_field">
          <label>
            <span className="input__name">{this.props.name}</span>
            <input
              className="input__checkbox"
              type="checkbox"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>

          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}


InputCheckbox.defaultProps = {
  name: '',
}

export { InputCheckbox }
