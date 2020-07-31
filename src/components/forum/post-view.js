import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactionsView from './reaction-view';
import ReactionPicker from './reaction-picker';
import Separator from '../../util/separator';
import { MdContentView } from '../markdown-viewer';
import { MaterialDesignIcon } from '../icons/material-design-icon';
import Swal from 'sweetalert2';

const UserName = styled('div')`
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
    line-height: 15px;
    margin: 0;
  }
`;

const UserImage = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  margin-right: 15px;
  font-weight: 800;
  font-style: normal;
  background-color: var(--color-primary);
  border-radius: 20px;
`;

const Control = styled('div')`
  position: absolute;
  display: flex;
  top: 10px;
  right: 15px;
  height: 30px;
`;


function PostHeader({postTitle, postAuthorName}){
  const name = postAuthorName;
  const initials = name[0].slice(0, 1) + name[1].slice(0, 1);
  return (
    <>
        <h2 className="h2 mb-2 font-bold">
          {postTitle}
        </h2>

        <UserName>
          <UserImage>{initials}</UserImage>
          <span>{postAuthorName}</span>
        </UserName>
    </>
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
    const splitedName = authorName.split(' ');
    const profileLetters = splitedName[0].slice(0, 1) + splitedName[1].slice(0, 1);
    this.state = {
      authorName: authorName,
      user: user,
      profileLetters: profileLetters,
      editMode: false,
    }

    this.deletePost = this.deletePost.bind(this);
  }

  editPost() {
    this.setState({
      editMode: !this.state.editMode,
    })

  }

  deletePost() {
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
        console.log(this.props.postRef);
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
  }

  render() {
    if (this.state.navigateToForum) {
      return <Redirect push to='/forum' />;
    }

    return (
      <div className="depth-1 mb-2 p-5 relative">
        <PostHeader
          postAuthorName={this.props.data.authorName}
          postTitle={this.props.title}
        />
        {this.props.data.author === this.state.user.uid && (
          <Control>
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
          </Control>
          )}

        <Separator />

        <PostBody content={this.props.data.body} />

        <Separator />

        <div className='flex'>
          <ReactionsView commentData={this.props.data} />

          <ReactionPicker
            commentData={this.props.data}
            commentId={this.props.data.id}
            user={this.state.user}
            />
        </div>
      </div>
    )
  }
}

export default PostView;
