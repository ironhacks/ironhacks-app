import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../../theme';
import trashCanIcon from '../../../assets/svg/trash.svg';

const colors = Theme.COLORS;
const units = Theme.UNITS;
const ItemContainer = styled('div')`
  margin-right: 15px;
  margin-bottom: 10px;
  display: flex;
  flex: 1 1 30%;
  max-width: 30%;
  justify-content: flex-end;
  border-radius: ${units.universalBorderRadius};
  background-color: ${(props) => props.isValid ? colors.mainBgColor : 'red'};
  border: 1px solid #999999;

  input {
    border: none;
    width: 60%;
    background: transparent;
    height: 100%;
    padding-left: 10px;
  }

  button {
    height: 100%;
    width: 30px;
    background-color: transparent;
    border: none;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;


class HackWhitelistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.userEmail,
      disabled: true,
    }

    this.onBlur = this.onBlur.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onChange(e) {
    if (e.target.value === '') {
      this.props.onItemDelete(this.props.index)
    } else {
      this.setState({ email: e.target.value })
    }
  }

  onDelete() {
    this.props.onItemDelete(this.props.index)
  }

  onBlur() {
    if (this.state) {
      this.setState({ disabled: true })
      this.props.onItemChange(this.state.email, this.props.index);
    }
  }

  handleChange(event) {
    this.setState({email: event.target.value})
  }

  handleClick(){
    this.setState({ disabled: false })
  }

  render() {
    return (
      <ItemContainer
        className='whitelist-item'
        isValid={this.props.isValid}
        onChange={this.onItemChange}
        onClick={this.handleClick}
      >
        <input
          type='text'
          value={this.state.email}
          onBlur={this.onBlur}
          name={this.state.email}
          onChange={this.handleChange}
          autoComplete="new-password"
          disabled={this.state.disabled}
        />
        <button onClick={this.onDelete}>
          <img src={trashCanIcon} alt='Delete Item' />
        </button>
      </ItemContainer>
    )
  }
}

HackWhitelistItem.defaultProps = {
  index: 0,
  userEmail: 'participant@email.com',
  isValid: false,
}


export default HackWhitelistItem;
