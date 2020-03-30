import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {Theme} from '../../theme';
import * as DateFormater from '../../utilities/dateFormater.js';
const colors = Theme.COLORS;

const styles = Theme.STYLES.ReactionsViewTheme;

const Container = styled('div')`
  display: flex;
`;

const ItemData = styled('div')`
  display: flex;
  align-items: center;
  height: 30px;
  border-radius: ${units.universalBorderRadius};

  span {
    margin: 0;
  }
`;


/**
 *
 */
class ReactionsView extends React.Component {
  constructor(props) {
    super(props);
    const {commentId, totalComments, commentData} = props;
    this.state = {
      commentData,
      commentId,
      totalComments,
    };

    this.firestore = window.firebase.firestore();
  }

  componentDidMount() {
    if ( this.state.commentData ) {
      const creationDate = DateFormater.getFirebaseDate(this.state.commentData.createdAt);
      const date = DateFormater.getReactionViewformat(creationDate);
      this.setState({
        date,
      });
    } else {
      this.getComment();
    }
  }

  getComment() {
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
          });
        })
        .catch(function(error) {
          console.error('Error getting documents: ', error);
        });
  };

  render() {
    return (
      <ThemeProvider theme={styles}>
        <Container>
          <ItemData>
            {!this.state.totalComments
              && <span>{`Posted ${this.state.date}`}</span>
            }
            {this.state.totalComments
              && <span>{`Posted ${this.state.date} | ${this.state.totalComments - 1} comments`}</span>
            }
          </ItemData>
        </Container>
      </ThemeProvider>
    );
  }
}

export default ReactionsView;
