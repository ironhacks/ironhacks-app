// IronHacks Platform
// reactionPicker.js -
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
// Images
import DislikeReaction from './img/dislike-reaction.svg';
import LikeReaction from './img/like-reaction.svg';
import Smile from './img/smile.svg';

//Picker displayer
const ReactionIcon = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  display: flex;
  align-items: center;
  padding-right: 15px;
  margin-top: 5px;

  button {
    border: none;
    border-radius: ${Constants.universalBorderRadius};
    background-color: transparent;
    transition: background-color 0.3s;

    &:hover {
      cursor: pointer;
      background-color: #ffe085;
    }

    &:focus {
      outline: none;
    }
  }

  img {
    height: 25px;
    width 25px;
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

  button {
    padding: 5px 8px; 
    &:hover {
      cursor: pointer;
      background-color: #ffe085;
    }
  }

  img {
    margin-left: 6px;
    
    &:first-child {
      margin: 0;
    }
  }
`;
class ReactionPicker extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showPicker: 'none',
    }
    this.picker = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  handleClickOutside = (event) => {
    const ref = this.picker.current;
    if (ref && !ref.contains(event.target)) {
      this.hideReactionPicker();
    }
  }

  toggleReactionMenu = (event) => {
    if(this.state.showPicker === 'none'){
      this.setState({showPicker: 'flex'})
    }else{
      this.setState({showPicker: 'none'})
    }
  }

  hideReactionPicker = () => {
    this.setState({showPicker: 'none'})
  }

  render() {
    return (
      <ReactionIcon>
          <button onClick={this.toggleReactionMenu}>
            <span>+ </span><img src={Smile} alt='smile'/>
          </button>
          <Picker display={this.state.showPicker} innerRef={this.picker}>
            <button><img src={LikeReaction} alt='like'/></button>
            <button><img src={DislikeReaction} alt='dislike'/></button>
        </Picker>
      </ReactionIcon>
    );
  }
}

export default ReactionPicker;