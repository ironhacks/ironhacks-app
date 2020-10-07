import React from 'react';
import styled from 'styled-components';
import { MaterialDesignIcon } from '../icons/material-design-icon';

const Reactions = styled('div')`
  display: flex;
  align-items: center;
  height: 30px;
  margin-left: auto;
`;

const ReactionCounter = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid;
  border-radius: 4px;
  transition: background-color 0.3s;
  cursor: pointer;

  span {
    padding: 0 5px;
    width: 24px;
  }

  &:hover {
    background-color: #e2e0da;
  }

  &:last-child {
    margin-left: 10px;
  }
`;


class ReactionPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      dislikes: [],
      isLiked: false,
      isDisliked: false,
    };
    this.getScore = this.getScore.bind(this)
    this.onVoteUp = this.onVoteUp.bind(this)
    this.onVoteDown = this.onVoteDown.bind(this)
    this.updateScore = this.updateScore.bind(this)
  }

  componentDidMount() {
    this.getScore();
  }


  getScore(){
    if (this.props.reactions) {
      const { likes, dislikes } = this.props.reactions;
      const isVoteUp = likes.includes(this.props.user.uid);
      const isVoteDown = dislikes.includes(this.props.user.uid);
      this.setState({
        likes: likes,
        dislikes: dislikes,
        isLiked: isVoteUp,
        isDisliked: isVoteDown,
      });
    }
  }

  onVoteUp() {
    let likes = this.state.likes;
    let dislikes =this.state.dislikes;
    let userID = this.props.user.uid;

    if (likes.includes(userID)) {
      likes = likes.filter((item)=>{ return item !== userID })
      this.setState({
        isLiked: false,
        likes: likes,
        isDisliked: false,
        dislikes: dislikes,
      })
      this.updateScore()
    } else {
      likes.push(userID);
      dislikes = dislikes.filter((item)=>{ return item !== userID })
      this.setState({
        isLiked: true,
        likes: likes,
        isDisliked: false,
        dislikes: dislikes,
      })
      this.updateScore()
    }
  }

  onVoteDown() {
    let likes = this.state.likes;
    let dislikes =this.state.dislikes;
    let userID = this.props.user.uid;

    if (dislikes.includes(userID)) {
      dislikes = dislikes.filter((item)=>{ return item !== userID })
      this.setState({
        isLiked: false,
        likes: likes,
        isDisliked: false,
        dislikes: dislikes,
      })
      this.updateScore()
    } else {
      dislikes.push(userID);
      likes = likes.filter((item)=>{ return item !== userID })
      this.setState({
        isLiked: false,
        likes: likes,
        isDisliked: true,
        dislikes: dislikes,
      })
      this.updateScore()
    }
  }

  updateScore(event) {
    this.props.docRef
      .update({
        reactions: {
          likes: this.state.likes,
          dislikes: this.state.dislikes,
        }
      })
  }


  render() {
    return (
      <Reactions>
        {this.state.likes.length >= 0 && (
          <ReactionCounter
            onClick={this.onVoteUp}
            active={this.state.isLiked}
          >
            <MaterialDesignIcon
              name="thumb-up"
              iconClass="pl-1 fs-1"
              style={{ color: this.state.isLiked ? 'black' : 'gray' }}
            />
            <span id='likes'>{this.state.likes.length}</span>
          </ReactionCounter>
        )}

        {this.state.dislikes.length >= 0 && (
          <ReactionCounter
            onClick={this.onVoteDown}
            active={this.state.isDisliked}
          >
            <MaterialDesignIcon
              name="thumb-down"
              iconClass="pl-1 fs-1"
              style={{ color: this.state.isDisliked ? 'black' : 'gray' }}
              />
            <span id='dislikes'>{this.state.dislikes.length}</span>
          </ReactionCounter>
        )}
      </Reactions>
    );
  }
}

export default ReactionPicker;
