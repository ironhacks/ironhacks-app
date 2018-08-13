// IronHacks Platform
// ReactionsView.js -
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
// Images
import heartReaction from './img/heart-reaction.svg';
import likeReaction from './img/like-reaction.svg';

const theme = Constants.ReactionsViewTheme;
//Reactions displayer
const Reactions = styled('div')`
  height: 30px;
  border-radius: ${Constants.universalBorderRadius + ";"};
  background-color: ${props => props.theme.backgroundColor};
  display: flex;
  align-items: center;
  padding-left: 10px;

  img {
    height: 14px;
    width 22px;
    object-fit: contain;
  }
`;

class ReactionsView extends React.Component {
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Reactions>
        <span>9</span>
        <img src={likeReaction}/>
        <span>18</span>
        <img src={heartReaction}/>
        <span>| 17 comments | 7 days ago</span>
        </Reactions>
      </ThemeProvider>
    );
  }
}

export default ReactionsView;