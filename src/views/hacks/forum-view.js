import { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PostPreview from '../../components/forum/post-preview'
import { Row } from '../../components/layout'

class ForumView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      forum: null,
      selectedForum: 0,
      hackForums: {},
      posts: [],
      selectedHack: 0,
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = () => {
    let posts = []
    window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('forums')
      .doc('general')
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            ref: doc.ref,
            data: doc.data(),
          })
        })
        this.setState({ posts: posts })
      })
      .catch(function(error) {
        console.error('Error getting documents: ', error)
      })
  }

  sortThreads = (posts, order = 'asc') => {
    if (order === 'asc') {
      return posts.sort((a, b) => {
        return a.data.createdAt.toMillis() - b.data.createdAt.toMillis()
      })
    } else {
      return posts.sort((a, b) => {
        return b.data.createdAt.toMillis() - a.data.createdAt.toMillis()
      })
    }
  }

  newThread = (event) => {
    this.setState({ startNewThreadFlow: true })
  }

  render() {
    if (this.state.startNewThreadFlow) {
      return <Redirect push to="./forum/new" />
    }

    return (
      <Row>
        <div className="post_list">
          <div className="post_list__controls">
            {this.props.userIsAdmin && (
              <div className="button create_post_button" onClick={this.newThread}>
                + New Post
              </div>
            )}
          </div>

          {this.state.posts.map((post, index) => {
            return (
              <PostPreview
                key={post.id}
                postId={post.id}
                postRef={post.ref}
                postTitle={post.data.title}
                postAuthor={post.data.authorName}
                postDate={post.data.createdAt.toDate().toLocaleDateString()}
                thread={post.data}
                user={this.props.user}
              />
            )
          })}
        </div>
      </Row>
    )
  }
}

export default ForumView
