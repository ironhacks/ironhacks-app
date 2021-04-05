import { fire2Date } from '../../util/date-utils'

function PostMeta({ commentData, totalComments }) {
  const dateSettings = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }

  const date = fire2Date(commentData.createdAt).toLocaleString('en-US', dateSettings)

  return (
    <div className="post_meta">
      <span className="post_date">Posted: {date}</span>

      {totalComments && <span className="post_comments">{totalComments - 1} comments</span>}
    </div>
  )
}

PostMeta.defaultProps = {
  totalComments: null,
}

export { PostMeta }
