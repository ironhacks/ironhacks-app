// IronHacks Platform
// reactionPicker.js -
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled from 'styled-components';
// Images
import DislikeReaction from './img/dislike-reaction.svg';
import LikeReaction from './img/like-reaction.svg';

const Reactions = styled('div')`
  display: flex;
  align-items: center;
  height: 30px;
  margin-left: auto;
  cursor: pointer; 

  .reaction-counter {
    position: relative
    display: flex;
    align-items: center;
    border: 1px solid #808080;
    border-radius: 4px;
    
    span {  
      padding: 0 5px;
      width: 24px

      img {
        height: 24px;
        width auto;
        padding: 5px 0;
        object-fit: contain;
      }

      &:nth-child(1) {
      }

      &:nth-child(2) {
        color: black;
        text-align: center;
      }
    }

    .tooltiptext {
      visibility: hidden;
      background-color: #e2e0da;
      color: #fff;
      text-align: center;
      border-radius: 4px;
      padding: 5px 0;
      position: absolute;
      width: 150px;
      bottom: 120%;
      left: 50%; 
      margin-left: -75px;
      z-index: 1;
    }

    &:hover {
      .tooltiptext {
        visibility: visible;
      } 
    }

    &:last-child {
      margin-left: 10px;
    }
  }
`;

class ReactionPicker extends React.Component {
  constructor(props){
    const { commentData } = props;
    super(props)
    this.state = {
      commentData,
    }
  }

  componentWillMount() {
    if ( this.state.commentData ) {
      if (this.state.commentData.reactions) {
        const { likes, dislikes } = this.state.commentData.reactions;
        this.setState({
          likes: likes.length,
          dislikes: dislikes.length,
        });
      } else {
        this.setState({
          likes: 0,
          dislikes: 0,
        });
      }
    } else {
      this.getComment();
    }
  }

  getComment = () => {
    const _this = this;
    this.firestore.collection('comments')
    .doc(this.state.commentId)
    .get()
    .then((doc) => {
      const data = doc.data();
      if (data.reactions) {
        const { likes, dislikes } = data.reactions;
        _this.setState({
          likes: likes.length,
          dislikes: dislikes.length,
        })
      } else {
        _this.setState({
          likes: 0,
          dislikes: 0,
        })
      }
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  };

  handleReactionClick = (event) => {
    console.log(event.target.id)
  } 

  render() {
    return (
      <Reactions>
      {this.state.likes >= 0 && 
        <div className='reaction-counter' onClick={this.handleReactionClick}>
          <span><img id='likes' src={LikeReaction} alt='likeReaction'/></span>
          <span id='likes'>{`${this.state.likes}`}</span>
        </div>
      }
      {this.state.dislikes >= 0 && 
        <div className='reaction-counter' onClick={this.handleReactionClick}>
          <span><img id='dislikes' src={DislikeReaction} alt='dislikeReaction'/></span>
          <span id='dislikes'>{this.state.dislikes}</span>
        </div>
      }
      </Reactions>
    );
  }
}

export default ReactionPicker;