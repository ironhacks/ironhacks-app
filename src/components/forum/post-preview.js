import { Component } from 'react'
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

class PostPreview extends Component {
  constructor(props) {
    super(props)
    const { authorName } = props.thread
    const name = authorName.split(' ')
    const initials = name[0].slice(0, 1) + name[1].slice(0, 1)

    this.state = {
      navigate: false,
      referrer: null,
      authorInitials: initials,
      authorName: authorName,
      authorFirstName: name[0],
    }
  }

  componentDidMount() {
    this.getCommentCount()
  }

  getCommentCount = async () => {
    let commentSnap = await this.props.postRef.collection('comments').get()

    let commentCount = commentSnap.docs.length
    this.setState({ comments: commentCount })
  }

  render() {
    return (
      <div className="post-preview">
        <div className="flex">
          <PostPreviewAuthorImg initials={this.state.authorInitials} />

          <div>
            <h2>
              <PostLink
                threadId={this.props.postId}
                threadTitle={this.props.postTitle}
                threadData={this.props.thread}
              />
            </h2>

            <div className="post-preview__meta cl-grey-dk1">
              <div className="post-comments">
                <span>{`${this.state.comments} ${
                  this.state.comments > 1 ? 'comments' : 'comment'
                }`}</span>
              </div>

              <div className="bullet-spacer">&bull;</div>

              <span className="post-date">
                <MaterialDesignIcon name="time" />
                <span className="fs-m1">{this.props.postDate}</span>
              </span>

              <span className="post-author">
                by <em>{this.state.authorFirstName}</em>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PostPreview
