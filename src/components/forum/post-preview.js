import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MaterialDesignIcon } from '../icons'

function PostLink({ threadId, threadTitle, threadData }) {
  return (
    <Link
      to={{
        pathname: `forum/thread/${threadId}`,
        state: {
          postData: threadData,
        },
      }}
    >
      {threadTitle}
    </Link>
  )
}

function PostPreviewAuthorImg({ initials }) {
  return (
    <div className="flex flex-align-center">
      <div className="author-img">{initials}</div>
    </div>
  )
}

function PostPreview({ postId, postRef, postTitle, postAuthor, postDate, thread, user }) {
  const { authorName } = thread
  const name = authorName.split(' ')
  const authorInitials = name[0].slice(0, 1) + name[1].slice(0, 1)
  const authorFirstName = name[0]
  const [comments, setComments] = useState(0)

  useEffect(() => {
    getCommentCount()
  })

  const getCommentCount = async () => {
    let commentSnap = await postRef.collection('comments').get()
    setComments(commentSnap.docs.length)
  }

  return (
    <div className="post-preview">
      <div className="flex">
        <PostPreviewAuthorImg initials={authorInitials} />

        <div>
          <h2>
            <PostLink threadId={postId} threadTitle={postTitle} threadData={thread} />
          </h2>

          <div className="post-preview__meta cl-grey-dk1">
            <div className="post-comments">
              <span>{`${comments} ${comments > 1 ? 'comments' : 'comment'}`}</span>
            </div>

            <div className="bullet-spacer">&bull;</div>

            <span className="post-date">
              <MaterialDesignIcon name="time" />
              <span className="fs-m1">{postDate}</span>
            </span>

            <span className="post-author">
              by <em>{authorFirstName}</em>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostPreview
