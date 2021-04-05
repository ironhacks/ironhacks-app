import { MdContentView } from '../markdown-viewer'
import { CommentMeta } from './comment-meta'
import { ReactionPicker } from './reaction-picker'
import { MaterialDesignIcon } from '../icons/material-design-icon'
import Swal from 'sweetalert2'

function CommentHeader({ postTitle, postAuthorName, adminPost }) {
  const name = postAuthorName.split(' ')
  const initials = name[0].slice(0, 1) + name[1].slice(0, 1)

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

function CommentBody({ content }) {
  return <MdContentView containerClass={'mt-1'} encoded={true} content={content} />
}

function CommentView({
  adminPost,
  commentId,
  commentRef,
  createdAt,
  authorId,
  authorName,
  body,
  user,
  reactions,
  reloadComments,
}) {
  const deleteComment = () => {
    let commentPreview = window.atob(body).trim()
    if (commentPreview.length > 100) {
      commentPreview = commentPreview.substring(0, 100) + '...'
    }

    let alertHtml = `
    <h3 class="h3 mb-2 py-3">
      Confirm you want to delete this comment.
    </h3>
    <p><small><em>"${commentPreview}"</em></small></p>
    `

    Swal.fire({
      title: 'Are you sure?',
      text: 'Confirm you want to delete this comment.',
      html: alertHtml,
      icon: 'warning',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
      .then((result) => {
        if (result.value) {
          commentRef.delete().then(() => {
            Swal.fire('Deleted!', 'Your comment has been deleted.', 'success').then(() => {
              window.location.reload()
            })
          })
        }
      })
      .catch(function(error) {
        console.error('Error deleting comment', error)
      })
  }

  return (
    <div className="comment depth-1 bg-grey-lt3 relative">
      <CommentHeader adminPost={adminPost} postAuthorName={authorName} />

      <div className="separator" />

      {authorId === user.uid && (
        <div className="comment_controls">
          <MaterialDesignIcon
            name="edit"
            iconClass="btn mr-2"
            style={{ display: 'none' }}
            onClick={() => {
              console.log('click')
            }}
          />

          <MaterialDesignIcon name="delete" iconClass="btn" onClick={deleteComment} />
        </div>
      )}

      <CommentBody content={body} />

      <div className="comment_footer">
        <CommentMeta createdAt={createdAt} />

        <ReactionPicker
          reactions={reactions || { likes: [], dislikes: [] }}
          docRef={commentRef}
          userId={user.uid}
        />
      </div>
    </div>
  )
}

export { CommentView }
