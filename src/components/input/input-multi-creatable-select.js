import { Component } from 'react';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types'

class InputMultiCreatableSelect extends Component {
  handleChange = (value, meta) => {
    if (this.props.onInputChange) {
      this.props.onInputChange(this.props.name, value)
    }
  }

  render() {
    return (
      <div className={['input_field', this.props.containerClass].join(' ').trim()}>
        <label
          className={['input_label input_label__name', this.props.labelClass].join(' ').trim()}
          htmlFor={this.props.name}
          >
            {this.props.label}
        </label>

        <CreatableSelect
          isMulti
          onChange={this.handleChange}
          options={this.props.options}
          className={this.props.inputClass}
          value={this.props.value}
          isDisabled={this.props.disabled}
        />
      </div>
    )
  }
}

InputMultiCreatableSelect.defaultProps = {
  name: 'input_multiselect',
  label: '',
  labelClass: '',
  inputClass: '',
  containerClass: '',
  disabled: false,
}

InputMultiCreatableSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  disabled: PropTypes.bool,
  onInputChange: PropTypes.func,
}


export { InputMultiCreatableSelect }
