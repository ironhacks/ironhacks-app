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
  border-radius: ${Constants.universalBorderRadius};

  span {
    margin: 0;
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
      this.setState({
        date,
      })
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
      _this.setState({
        date,
      })
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
              <span>{`Posted ${this.state.date}`}</span>
            }
            {this.state.totalComments && 
              <span>{`Posted ${this.state.date} | ${this.state.totalComments - 1} comments`}</span>
            }
          </ItemData>
        </Container>
      </ThemeProvider>
    );
  }
}

export default ReactionsView;