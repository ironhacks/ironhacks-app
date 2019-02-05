// IronHacks Platform
// ReactionsView.js -
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';

//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import * as DateFormater from '../../utilities/dateFormater.js';
// Images
import DislikeReaction from './img/dislike-reaction.svg';
import LikeReaction from './img/like-reaction.svg';

const theme = Constants.ReactionsViewTheme;
//Reactions displayer
const Reactions = styled('div')`
  display: flex;
  align-items: center;
  height: 30px;
  background-color: ${props => props.theme.backgroundColor};
  display: inline-flex;
  align-items: center;
  padding: 0 10px;

  img {
    height: 14px;
    width 22px;
    object-fit: contain;
  }

  span {
    margin: 0;
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
  constructor(props){
    super(props);
    const { commentId, totalComments, commentData } = props;
    this.state = {
      commentData,
      commentId,
      totalComments,
    }

    this.firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    this.firestore.settings(settings);
  }

  componentWillMount() {
    if( this.state.commentData ) {
      const creationDate = DateFormater.getFirebaseDate(this.state.commentData.createdAt);
      const creationDistance = DateFormater.getDatesDifference(creationDate);
      const days = creationDistance === 0 ? 'Today' : `${creationDistance} days ago.`;
      if (this.state.commentData.reactions) {
        const { likes, dislikes } = this.state.commentData.reactions;
        this.setState({
          days,
          likes,
          dislikes
        })
      } else {
        this.setState({
          days,
        })
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
      const creationDate = DateFormater.getFirebaseDate(data.createdAt);
      const creationDistance = DateFormater.getDatesDifference(creationDate);
      const days = creationDistance === 0 ? 'Today' : `${creationDistance} days ago.`;
      if (data.reactions) {
        const { likes, dislikes } = data.reactions;
        _this.setState({
          days,
          likes,
          dislikes
        })
      } else {
        _this.setState({
          days,
        })
      }
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
        <Reactions>
          {!this.state.totalComments && 
            <span>{`${this.state.days} ${this.state.likes || this.state.dislikes ? '|' : ''}`}</span>
          }
          {this.state.totalComments && 
            <span>{`${this.state.days} | ${this.state.totalComments - 1} comments ${this.state.likes || this.state.dislikes ? '|' : ''}`}</span>
          }
          {this.state.likes && 
            <React.Fragment>
              <span>{`${this.state.likes.length}`}</span>
              <img src={LikeReaction} alt='likeReaction'/>
            </React.Fragment>
          }
          {this.state.dislikes  && 
            <React.Fragment>
              <span>{this.state.dislikes.length}</span>
              <img src={DislikeReaction} alt='likeReaction'/>
            </React.Fragment>
          }
        </Reactions>
        </div>
      </ThemeProvider>
    );
  }
}

export default ReactionsView;