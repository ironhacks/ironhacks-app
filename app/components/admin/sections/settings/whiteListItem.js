// WhiteListItem.js - WhiteListItem


import React from 'react';

import styled from 'styled-components';

import {Theme} from '../../theme';
import trashCanIcon from '../../../../assets/svg/trash.svg';
const colors = Theme.COLORS;
const units = Theme.units;

const ItemContainer = styled('div')`
  width: 20%;
  height: 30px;
  margin-right: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;

  input {
    width: 60%;
    height: 100%;
    background-color: ${(props) =>
      props.isValid ? colors.mainBgColor : 'red'
};
    border: 1px solid #999999;
    border-right: none;
    border-radius: ${units.universalBorderRadius} 0px 0px ${units.universalBorderRadius};
    padding-left: 10px;
  }

  button {
    height: 100%;
    width: 30px;
    background-color: ${(props) =>
      props.isValid ? colors.mainBgColor : 'red'
};
    border: 1px solid #999999;
    border-left: none;
    border-radius: 0px ${units.universalBorderRadius} ${units.universalBorderRadius} 0px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
/*
const WhiteListItemInput = styled('input')`
  height: 35px;
  padding: 10px 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: ${units.universalBorderRadius};
  background-color: ${(props) =>
    props.isValid ? colors.mainBgColor : 'red'
  };
`
^*/
class WhiteListItem extends React.Component {
  onWhiteListItemChange = (e) => {
    if (e.target.value === '') {
      this.props.onWhiteListItemDelete(this.props.index);
    } else {
      this.setState({ email: e.target.value });
    }
  };

  onDelete = () => {
    this.props.onWhiteListItemDelete(this.props.index);
  };

  onBlur = () => {
    if (this.state) {
      this.props.onChange(this.state.email, this.props.index);
    }
  };

  render() {
    return (
      <ItemContainer
        isValid={this.props.isValid}
        onChange={this.onWhiteListItemChange}
      >
        <input
          type='text'
          defaultValue={this.props.userEmail}
          onBlur={this.onBlur}
        />
        <button onClick={this.onDelete}>
          <img src={trashCanIcon} alt='searchIcon' />
        </button>
      </ItemContainer>
    );
  }
}

export default WhiteListItem;
