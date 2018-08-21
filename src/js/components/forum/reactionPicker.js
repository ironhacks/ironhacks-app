// IronHacks Platform
// reactionPicker.js -
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled from 'styled-components';
//Custom Constants
//import * as Constants from '../../../constants.js';
// Images
import smile from './img/smile.svg';

//Picker displayer
const Picker = styled('div')`
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-top: 5px;

  img {
    height: 22px;
    width 22px;
    margin-left: 5px;
    object-fit: contain;
  }
`;

class ReactionPicker extends React.Component {
  
  render() {
    return (
      <Picker>
      <span>+</span><img src={smile} alt='smile'/>
      </Picker>
    );
  }
}

export default ReactionPicker;