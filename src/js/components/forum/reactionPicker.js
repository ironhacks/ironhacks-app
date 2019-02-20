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

  .liked-disliked {
    margin-right: 10px;
    line-height: 45px;
    font-size: 12px;
    height: 100%;
    font-style: italic;
  }

  .reaction-counter {

    position: relative
    display: flex;
    align-items: center;
    border: 1px solid #808080;
    border-radius: 4px;
    transition: background-color 0.3s;
    cursor: pointer;
    
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
      background-color: #e2e0da;

      .tooltiptext {
        visibility: visible;
      } 
    }

    &:last-child {
      margin-left: 10px;
    }
  }
`;

const reverseReaction = {
  likes: 'dislikes',
  dislikes: 'likes',
}

class ReactionPicker extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    this.firestore.settings(settings);
  }

  componentWillMount() {
    if ( this.props.commentData ) {
      if (this.props.commentData.reactions) {
        const { likes, dislikes } = this.props.commentData.reactions;
        this.setState({
          likes: likes,
          dislikes: dislikes,
        });
      } else {
        this.setState({
          likes: [],
          dislikes: [],
        });
      }
    } else {
      this.getComment();
    }
  }

  getComment = () => {
    const _this = this;
    this.firestore.collection('comments')
    .doc(this.props.commentId)
    .get()
    .then((doc) => {
      const data = doc.data();
      if (data.reactions) {
        const { likes, dislikes } = data.reactions;
        _this.setState({
          likes: likes,
          dislikes: dislikes,
        })
      } else {
        _this.setState({
          likes: [],
          dislikes: [],
        })
      }
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  };

  handleReactionClick = (event) => {
    console.log(this.props)
    const _this = this;
    const reactionType = event.target.id;
    const updatedData = {
      likes: this.state.likes,
      dislikes: this.state.dislikes,
    };
    if(updatedData[reactionType].includes(this.props.user.uid)) {
      updatedData[reactionType] = updatedData[reactionType].filter( element => element !== this.props.user.uid)
    } else {
      updatedData[reactionType].push(this.props.user.uid);
      updatedData[reverseReaction[reactionType]] = updatedData[reverseReaction[reactionType]].filter( element => element !== this.props.user.uid)
    }
    this.firestore.collection('comments')
    .doc(this.props.commentId)
    .update({
      'reactions.likes': updatedData.likes,
      'reactions.dislikes': updatedData.dislikes,
    })
    .then((response) => {
      this.setState({likes: updatedData.likes, dislikes: updatedData. dislikes});
    })
    .catch(function(error) {
        console.error("Error updating documents: ", error);
    });
  } 

  render() {
    return (
      <Reactions>
      {this.state.likes.includes(this.props.user.uid) && 
        <span className='liked-disliked'>You liked this.</span>
      }
      {this.state.dislikes.includes(this.props.user.uid) && 
        <span className='liked-disliked'>You disliked this.</span>
      }
      {this.state.likes.length >= 0 && 
        <div className='reaction-counter' id='likes' onClick={this.handleReactionClick}>
          <span id='likes'><img id='likes' src={LikeReaction} alt='likeReaction'/></span>
          <span id='likes'>{`${this.state.likes.length}`}</span>
        </div>
      }
      {this.state.dislikes.length >= 0 && 
        <div className='reaction-counter' onClick={this.handleReactionClick} id='dislikes'>
          <span id='dislikes'><img id='dislikes' src={DislikeReaction} alt='dislikeReaction'/></span>
          <span id='dislikes'>{this.state.dislikes.length}</span>
        </div>
      }
      </Reactions>
    );
  }
}

export default ReactionPicker;