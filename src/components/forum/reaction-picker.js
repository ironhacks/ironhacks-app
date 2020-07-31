import React from 'react';
import styled from 'styled-components';
import LikeReaction from '../../assets/svg/like-reaction.svg';
import LikeReactionHighLighted from '../../assets/svg/like-reaction-highlight.svg';
import DislikeReaction from '../../assets/svg/dislike-reaction.svg';
import DislikeReactionHighLighted from '../../assets/svg/dislike-reaction-highlight.svg';


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

  &#likes {
    border-color: ${(props) => (props.highLighted ? '#88a923' : '#808080')};
  }

  &#dislikes {
    border-color: ${(props) => (props.highLighted ? '#ff916d' : '#808080')};
  }

  span {
    padding: 0 5px;
    width: 24px;

    img {
      height: 24px;
      width: auto;
      padding: 5px 0;
      object-fit: contain;
    }

    &:nth-child(1) {}

    &:nth-child(2) {
      text-align: center;

      &#likes {
        color: ${(props) => (props.highLighted ? '#88a923' : '#808080')};
      }

      &#dislikes {
        color: ${(props) => (props.highLighted ? '#ff916d' : '#808080')};
      }
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
`;

const reverseReaction = {
  likes: 'dislikes',
  dislikes: 'likes',
};


class ReactionPicker extends React.Component {
  constructor(props) {
    super(props);
    this.firestore = window.firebase.firestore();
    this.state = {
      likes: [],
      dislikes: [],
      isLiked: false,
      isDisliked: false,
    };
  }

  componentDidMount() {
    if (this.props.commentData) {
      if (this.props.commentData.reactions) {
        const { likes, dislikes } = this.props.commentData.reactions;
        const isLiked = likes.includes(this.props.user.uid);
        const isDisliked = dislikes.includes(this.props.user.uid);
        this.setState({
          likes: likes,
          dislikes: dislikes,
          isLiked,
          isDisliked,
        });
      } else {
        this.setState({
          likes: [],
          dislikes: [],
          isLiked: false,
          isDisliked: false,
        });
      }
    } else {
      this.getComment();
    }
  }

  getComment() {
    const _this = this;
    window.firebase.firestore()
      .collection('comments')
      .doc(this.props.commentId)
      .get()
      .then((doc) => {
        const data = doc.data();
        if (data.reactions) {
          const { likes, dislikes } = data.reactions;
          const isLiked = likes.includes(this.props.user.uid);
          const isDisliked = dislikes.includes(this.props.user.uid);
          _this.setState({
            likes,
            dislikes,
            isLiked,
            isDisliked,
          });
        } else {
          _this.setState({
            likes: [],
            dislikes: [],
            isLiked: false,
            isDisliked: false,
          });
        }
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error);
      });
  }

  handleReactionClick(event) {
    const _this = this;
    const reactionType = event.target.id;
    const updatedData = {
      likes: this.state.likes,
      dislikes: this.state.dislikes,
    };
    if (updatedData[reactionType].includes(this.props.user.uid)) {
      updatedData[reactionType] = updatedData[reactionType].filter(
        (element) => element !== this.props.user.uid
      );
    } else {
      updatedData[reactionType].push(this.props.user.uid);
      updatedData[reverseReaction[reactionType]] = updatedData[
        reverseReaction[reactionType]
      ].filter((element) => element !== this.props.user.uid);
    }
    this.firestore
      .collection('comments')
      .doc(this.props.commentId)
      .update({
        'reactions.likes': updatedData.likes,
        'reactions.dislikes': updatedData.dislikes,
      })
      .then((response) => {
        const isLiked = updatedData.likes.includes(_this.props.user.uid);
        const isDisliked = updatedData.dislikes.includes(_this.props.user.uid);
        _this.setState({
          likes: updatedData.likes,
          dislikes: updatedData.dislikes,
          isLiked,
          isDisliked,
        });
      })
      .catch(function(error) {
        console.error('Error updating documents: ', error);
      });
  }

  render() {
    return (
      <Reactions>
        {this.state.likes.length >= 0 && (
          <ReactionCounter
            id='likes'
            onClick={this.handleReactionClick}
            highLighted={this.state.isLiked}
          >
            <span id='likes'>
              <img
                id='likes'
                src={ this.state.isLiked ? LikeReactionHighLighted : LikeReaction }
                alt='likeReaction'
              />
            </span>
            <span id='likes'>{`${this.state.likes.length}`}</span>
          </ReactionCounter>
        )}
        {this.state.dislikes.length >= 0 && (
          <ReactionCounter
            id='dislikes'
            onClick={this.handleReactionClick}
            highLighted={this.state.isDisliked}
          >
            <span id='dislikes'>
              <img
                id='dislikes'
                src={
                  this.state.isDisliked
                    ? DislikeReactionHighLighted
                    : DislikeReaction
                }
                alt='dislikeReaction'
              />
            </span>
            <span id='dislikes'>{this.state.dislikes.length}</span>
          </ReactionCounter>
        )}
      </Reactions>
    );
  }
}

export default ReactionPicker;
