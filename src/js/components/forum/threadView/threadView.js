// IronHacks Platform
// threadView.js - Here is where a user is directed when he clicks on a thread from the forum. 
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom constants
import * as Constants from '../../../../constants.js';
//Custom components
import CommentView from './commentView.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};
`;
//First comment view (this is the author's comment)
const FirstCommentContainer = styled('div')`
  
`;
const SectionSeparator = styled('div')`
  background-color: ${Constants.mainBgColor}
  height: 1px;
  width 100%;
  margin-top: calc(${Constants.threadPreviewBottomMargin} + 10px);
  margin-bottom: calc(${Constants.threadPreviewBottomMargin} + 10px);
`;

class ThreadView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loadingComments: true,
      threadHead: null,
      comments: [],
    }

  }
  //Route props
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  //This functions get all the comments from a specific thread.
  //TODO: We are asking for the thread twice, one on the main forum and second here, we must reduce that to one query.
  //TODO:  This query is not efficient when the db has a good amount of comments, we must find a way to make it scalable.
  getComments = () => {
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;

    firestore.collection('comments').where('threadId', '==', this.props.match.params.threadId).orderBy('createdAt', 'asc').get()
    .then(function(querySnapshot) {
        var comments = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          comments.push(doc);
        });
        //Setting the head
        _this.setState({threadHead: comments.shift()});
        //updating the rest of the comments:
        _this.setState((prevState, props) => {
          return({comments: comments})
        });

    })
    .catch(function(error) {
        console.log('Error getting documents: ', error);
    });
  };

  componentDidMount(){
    this.getComments()
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <SectionContainer className="container-fluid">
        <FirstCommentContainer className="row">
          <div className='col-md-8 offset-md-2'>
            {this.state.threadHead && <CommentView commentData={this.state.threadHead.data()}/>}
          </div>
        </FirstCommentContainer>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            <SectionSeparator/>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8 offset-md-2'>
            {this.state.comments.map((comment, index) => {
              return <CommentView commentData={comment.data()} key={comment.id} /> 
            })}
          </div>
        </div>
      </SectionContainer>
      </ThemeProvider>
    );
  }
}

const ThreadViewWithRouter = withRouter(ThreadView);

export default ThreadViewWithRouter;