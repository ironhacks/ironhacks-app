// IronHacks Platform
// WhiteListItem.js - WhiteListItem
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../../../constants.js';
// Images
import trashCanIcon from '../../../../../img/trash.svg';

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
      props.isValid ? Constants.mainBgColor : 'red'
    };
    border: 1px solid #999999;
    border-right: none; 
    border-radius: ${Constants.universalBorderRadius} 0px 0px ${Constants.universalBorderRadius};
    padding-left: 10px;

  }

  button {
    height: 100%;
    width: 30px;
    background-color: ${(props) => 
      props.isValid ? Constants.mainBgColor : 'red'
    };
    border: 1px solid #999999;
    border-left: none;
    border-radius: 0px ${Constants.universalBorderRadius} ${Constants.universalBorderRadius} 0px;

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
  border-radius: ${Constants.universalBorderRadius};
  background-color: ${(props) => 
    props.isValid ? Constants.mainBgColor : 'red'
  };
`
^*/
class WhiteListItem extends React.Component {

  onWhiteListItemChange = (e) => {
    if(e.target.value === ''){
      this.props.onWhiteListItemDelete(this.props.index);  
    }else{
      this.setState({email: e.target.value});
    }
  };

  onDelete = () => {
    this.props.onWhiteListItemDelete(this.props.index);
  };

  onBlur = () => {
    if(this.state){
      this.props.onChange(this.state.email, this.props.index);
    }
  };

  render() {
    return (
      <ItemContainer isValid={this.props.isValid} onChange={this.onWhiteListItemChange}>
        <input type='text' defaultValue={this.props.userEmail} onBlur={this.onBlur}/>
        <button onClick={this.onDelete}><img src={trashCanIcon} alt='searchIcon'/></button>
      </ItemContainer>
    );
  }
}

export default WhiteListItem;