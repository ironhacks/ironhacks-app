import { fire2Date } from '../../util/date-utils'

function CommentMeta({ createdAt }) {
  const dateSettings = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }

  const date = fire2Date(createdAt).toLocaleString('en-US', dateSettings)

  return (
    <div className="comment_meta">
      <span className="comment_date">{date}</span>
    </div>
  )
}

export { CommentMeta }
