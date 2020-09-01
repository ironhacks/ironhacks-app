import React from 'react';
import Button from '../../util/button.js';
import MarkdownEditor from '../../components/markdown-editor';
import { userMetrics } from '../../util/user-metrics'

class CommentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange(markdown) {
    this.setState({content: markdown})
  }

  encodeDocument(str) {
    let safeString = unescape(encodeURIComponent(str));
    return window.btoa(safeString);
  }

  handleSubmit() {

    const currentUser = window.firebase.auth().currentUser
    const userId = currentUser.uid;
    const userName = currentUser.displayName;
    const codedBody = this.encodeDocument(this.state.content);

    window.firebase.firestore()

    const comment = {
      author: userId,
      adminPost: false,
      authorName: userName,
      authorRealName: userName,
      body: codedBody,
      createdAt: new Date(),
      postId: this.props.postId,
    }

    if (this.props.userIsAdmin){
      comment.adminPost = true;
      this.props.postRef
      .collection('comments')
      .add(comment)
      .then((docRef) => {
        this.setState({content: ''});
        this.props.refreshComments();
      })
      .catch(function(error) {
        console.error('Error adding comment', error)
      })

    } else {
      userMetrics({event: 'submit_comment'})

      // LOOKUP USER ALIAS
      window.firebase.firestore()
        .collection('hacks')
        .doc(this.props.hackId)
        .collection('registration')
        .doc('participants')
        .get()
        .then((participants)=>{
          let result = participants.data();
          let registeredUser = result[userId];
          if (registeredUser.alias) {
            comment.authorName = registeredUser.alias;
          }

          this.props.postRef
            .collection('comments')
            .add(comment)
            .then((docRef) => {
              this.setState({content: ''});
              this.props.refreshComments();
            })
            .catch(function(error) {
              console.error('Error adding comment ', error)
            })
        }).catch((error)=>{
          console.log(error)
        })
    }
  }


  render() {
    return (
      <>
        <MarkdownEditor
          editorLayout='tabbed'
          height={250}
          value={this.state.content}
          onEditorChange={this.onEditorChange}
        />

        <div className='control'>
          <Button primary width='150px' onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      </>
    )
  }
}

export { CommentEditor }
