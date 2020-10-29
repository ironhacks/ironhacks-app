import React from 'react';
import ReactionsView from './reaction-view';
// import ReactionPicker from './reaction-picker';
import Separator from '../../util/separator';
import { MdContentView } from '../markdown-viewer';
import { MaterialDesignIcon } from '../icons/material-design-icon';
import Swal from 'sweetalert2';

function PostHeader({postTitle, postAuthorName, adminPost}){
  const name = postAuthorName.split(' ');
  const initials = name[0].slice(0, 1) + name[1].slice(0, 1);

  return (
    <div className="post_header">
      <h2 className="post_title mb-2">{postTitle}</h2>

      <div className="post_author">
        <div className="post_author__img">{initials}</div>
          {adminPost ? (
          <div className="post_author__name">
            <span>{name[0]}</span>
            <div className="badge badge-dark ml-2">IronHacks Team</div>
          </div>
          ) : (
          <div className="post_author__name">{postAuthorName}</div>
          )}
      </div>
    </div>
  )
}

function PostBody({content}){
  return (
    <MdContentView
      encoded={true}
      content={content}
    />
  )
}

class PostView extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;
    const { authorName } = props.data;
    const name = authorName.split(' ');
    const profileLetters = name[0].slice(0, 1) + name[1].slice(0, 1);

    this.state = {
      authorName: authorName,
      user: user,
      profileLetters: profileLetters,
      editMode: false,
    }
  }

  editPost() {
    this.setState({
      editMode: !this.state.editMode,
    })

  }

  deletePost = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Confirm you want to delete this post.',
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.value) {
        let commentDocs = this.props.postRef
          .collection('comments')
          .get();

        Promise.resolve(commentDocs)
        .then((docs)=>{
          if (docs.empty) {
            this.props.postRef.delete();
          } else {
            docs.forEach((doc, i) => {
              doc.ref.delete()
            })
            this.props.postRef.delete();
          }
          Swal.fire(
            'Deleted!',
            'Your post has been deleted.',
            'success'
          ).then(()=>{
            window.history.back()
          })
        })
      }
    })
  };

  render() {
    return (
      <div className="post depth-1 mb-2 p-5 relative">
        <PostHeader
          postAuthorName={this.props.data.authorName}
          adminPost={this.props.data.adminPost || false}
          postTitle={this.props.title}
        />

        {this.props.data.author === this.state.user.uid && (
          <div className="post_controls">
            <MaterialDesignIcon
              name="edit"
              iconClass="btn mr-2"
              onClick={()=>{
                window.location = window.location.pathname + '/edit'
              }}
            />
            <MaterialDesignIcon
              name="delete"
              iconClass="btn"
              onClick={this.deletePost}
            />
          </div>
        )}

        <Separator />
        <PostBody content={this.props.data.body} />
        <Separator />

        <div className='flex'>
          <ReactionsView commentData={this.props.data} />
        </div>
      </div>
    )
  }
}

export default PostView;
