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
  display: inline-flex;
  align-items: center;
  padding: 0 10px 0 10px;

  img {
    height: 14px;
    width 22px;
    object-fit: contain;
  }
`;
//Reaction view Props:
/*
* likes : Number = The amount of likes.
* dislikes : Number = The amount of dislikes.
* hearts : Number = The amount of Hearts.
* comments : Number = The amount of comments.
*
*/
class ReactionsView extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Reactions>
          {this.props.likes && <span>{this.props.likes}</span>}
          {this.props.likes && <img src={likeReaction} alt='likeReaction'/>}
          {this.props.hearts && <span>{this.props.hearts}</span>}
          {this.props.hearts && <img src={heartReaction} alt='likeReaction'/>}
          <span>18</span>
          <img src={heartReaction} alt='heartReaction'/>
          <span>| 17 comments | 7 days ago</span>
        </Reactions>
      </ThemeProvider>
    );
  }
}

export default ReactionsView;