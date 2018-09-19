// IronHacks Platform
// forum.js
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled from 'styled-components';
//Custom Constants
//import * as Constants from '../../../../constants.js';


// Images
import forumIcon from './img/forum-icon.svg';

const ForumItemContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin: 10px 0 10px 15px;

  img {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  span {
    &.interval {
      font-weight: 300;
      font-size: 20px;
    };
  };

  input {
    text-align: right;
    padding-right: 10px;
  }
`;

class ForumItem extends React.Component {
  render() {
    
    return (
      <ForumItemContainer>
        <div>
          <img src={forumIcon} alt='forum-icon'/>
          <span className='interval'>{"Forum " + this.props.forumIndex}</span>
        </div>
        <div>
          <input type='text' placeholder='Forum Name'/>
        </div>
      </ForumItemContainer>
    );
  }
}

export default ForumItem;