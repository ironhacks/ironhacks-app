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

const Container = styled('div')`
  display: flex;
`;

const ItemData = styled('div')`
  display: flex;
  align-items: center;
  height: 30px;
  background-color: ${props => props.theme.backgroundColor};
  border-radius: ${Constants.universalBorderRadius};
  display: inline-flex;
  align-items: center;
  padding: 0 9px;

  span {
    margin: 0;
  }
`;

const Reactions = styled('div')`
  height: 30px;
  margin-left: auto;

  img {
    height: 14px;
    width 22px;
    object-fit: contain;
  }
`;

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
      const date = DateFormater.getReactionViewformat(creationDate);
      if (this.state.commentData.reactions) {
        const { likes, dislikes } = this.state.commentData.reactions;
        this.setState({
          date,
          likes,
          dislikes
        })
      } else {
        this.setState({
          date,
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
      const date = DateFormater.getReactionViewformat(creationDate);
      if (data.reactions) {
        const { likes, dislikes } = data.reactions;
        _this.setState({
          date,
          likes,
          dislikes
        })
      } else {
        _this.setState({
          date,
          likes: [3,3,3,3],
          dislikes: [3,3,3,3,3],
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
        <Container>
          <ItemData>
            {!this.state.totalComments && 
              <span>{`${this.state.date}`}</span>
            }
            {this.state.totalComments && 
              <span>{`${this.state.date} | ${this.state.totalComments - 1} comments`}</span>
            }
          </ItemData>
          <Reactions>
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
        </Container>
      </ThemeProvider>
    );
  }
}

export default ReactionsView;