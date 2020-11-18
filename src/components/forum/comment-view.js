import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MdContentView } from '../markdown-viewer';
import { CommentMeta } from './comment-meta';
import { ReactionPicker } from './reaction-picker';
import Separator from '../../util/separator';
import { MaterialDesignIcon } from '../icons/material-design-icon';
import Swal from 'sweetalert2';

function CommentHeader({postTitle, postAuthorName, adminPost}){
  const name = postAuthorName.split(' ');
  const initials = name[0].slice(0, 1) + name[1].slice(0, 1);

  return (
    <div className="comment_author">
      <div className="comment_author__img">{initials}</div>
      {adminPost ? (
        <>
        <span>{name[0]}</span>
        <div className="badge badge-dark ml-2">IronHacks Team</div>
        </>
      ) : (
        <div className="comment_author__name">{postAuthorName}</div>
      )}
    </div>
  )
}

function CommentBody({content}){
  return (
    <MdContentView
      containerClass={'mt-1'}
      encoded={true}
      content={content}
    />
  )
}

class CommentView extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    const { authorName } = props.data;
    const name = authorName.split(' ');
    const profileLetters = name[0].slice(0, 1) + name[1].slice(0, 1);

    this.state = {
      user,
      profileLetters,
    };

    this.firestore = window.firebase.firestore();
  }

  deleteComment = () => {
    let commentBody = window.atob(this.props.data.body).trim();
    if (commentBody.length > 100){
      commentBody = commentBody.substring(0,100) + '...';
    }

    let alertHtml = `
    <h3 class="h3 mb-2 py-3">
      Confirm you want to delete this comment.
    </h3>
    <p><small><em>"${commentBody}"</em></small></p>
    `;

    Swal.fire({
      title: 'Are you sure?',
      text: 'Confirm you want to delete this comment.',
      html: alertHtml,
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.props.commentRef.delete()
        .then(()=>{
          Swal.fire(
            'Deleted!',
            'Your comment has been deleted.',
            'success'
          ).then(()=>{
            window.location.reload()
          })
        })
      }
    })
    .catch(function(error) {
       console.error('Error deleting comment', error)
    })
  };

  render() {
    if (this.state.navigateToForum) {
      return <Redirect push to='/forum' />;
    }

    return (
      <div className="comment depth-1 bg-grey-lt3 relative">
        <CommentHeader
          adminPost={this.props.data.adminPost}
          postAuthorName={this.props.data.authorName}
        />

        <Separator />

        {this.props.data.author === this.state.user.uid && (
          <div className="comment_controls">
            <MaterialDesignIcon
              name="edit"
              iconClass="btn mr-2"
              style={{display: 'none'}}
              onClick={()=>{
                console.log('click');
              }}
            />
            <MaterialDesignIcon
              name="delete"
              iconClass="btn"
              onClick={this.deleteComment}
            />
          </div>
        )}

        <CommentBody content={this.props.data.body} />

        <div className='comment_footer'>
          <CommentMeta
            commentData={this.props.data}
          />

          <ReactionPicker
            reactions={this.props.data.reactions || {likes: [], dislikes: []}}
            docRef={this.props.data.commentRef}
            user={this.state.user}
          />
        </div>
      </div>
    )
  }
}

export { CommentView }
