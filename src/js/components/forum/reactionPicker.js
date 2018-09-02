// IronHacks Platform
// reactionPicker.js -
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
// Images
import heartReaction from './img/heart-reaction.svg';
import likeReaction from './img/like-reaction.svg';
import smile from './img/smile.svg';

//Picker displayer
const ReactionIcon = styled('div')`
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-top: 5px;

  button {
    border: none;
    background-color: transparent;
    border-radius: ${Constants.universalBorderRadius};
  
    &:hover {
      cursor: pointer;
    }

    &:focus {
      background-color: lightgray;
      outline: none;
    }
  }

  img {
    height: 30px;
    width 30px;
    padding: 5px; 
    object-fit: contain;
  }
`;
const Picker = styled('div')`
  display: ${props => props.display};
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 40px;
  right: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  border-radius: ${Constants.universalBorderRadius};
  padding: 5px 5px;
  z-index: 1;


  img {
    border-radius: 6px;
    margin-left: 6px;
    
    &:first-child {
      margin: 0;
    }

    &:hover {
      background-color: lightgray;
    }
  }
`;
class ReactionPicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showPicker: 'none',
    }
  }

  toggleReactionMenu = () => {
    if(this.state.showPicker === 'none'){
      this.setState({showPicker: 'flex'})
    }else{
      this.setState({showPicker: 'none'})
    }
  };

  hideReactionPicker = () => {
    this.setState({showPicker: 'none'})
  }

  render() {
    return (
      <ReactionIcon onBlur={this.hideReactionPicker}>
          <button onClick={this.toggleReactionMenu}>
            <span>+</span><img src={smile} alt='smile'/>
          </button>
          <Picker display={this.state.showPicker}>
            <button><img src={heartReaction} alt='heart'/></button>
            <button><img src={likeReaction} alt='like'/></button>
        </Picker>
      </ReactionIcon>
    );
  }
}

export default ReactionPicker;