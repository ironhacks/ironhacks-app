import { Component } from 'react'
import { ReactionButton } from './reaction-button'

class ReactionPicker extends Component {
  constructor(props) {
    super(props)
    const { likes, dislikes } = this.props.reactions

    this.state = {
      syncing: false,
      likes: likes,
      dislikes: dislikes,
      isLiked: likes.includes(this.props.user.uid),
      isDisliked: dislikes.includes(this.props.user.uid),
    }
  }

  onVoteUp = () => {
    if (this.state.syncing) {
      return false
    }

    this.setState({ syncing: true })

    let likes = this.state.likes
    let dislikes = this.state.dislikes
    let userID = this.props.user.uid
    let isLiked = false
    let isDisliked = false

    if (likes.includes(userID)) {
      likes = likes.filter((item) => {
        return item !== userID
      })
    } else {
      isLiked = true
      likes.push(userID)
      dislikes = dislikes.filter((item) => {
        return item !== userID
      })
    }

    this.setState({
      isLiked: isLiked,
      likes: likes,
      isDisliked: isDisliked,
      dislikes: dislikes,
    })

    this.updateScore({
      likes: likes,
      dislikes: dislikes,
    })
  }

  onVoteDown = () => {
    if (this.state.syncing) {
      return false
    }

    this.setState({ syncing: true })

    let likes = this.state.likes
    let dislikes = this.state.dislikes
    let userID = this.props.user.uid
    let isLiked = false
    let isDisliked = false

    if (dislikes.includes(userID)) {
      dislikes = dislikes.filter((item) => {
        return item !== userID
      })
    } else {
      isDisliked = true
      dislikes.push(userID)
      likes = likes.filter((item) => {
        return item !== userID
      })
    }

    this.setState({
      isLiked: isLiked,
      likes: likes,
      isDisliked: isDisliked,
      dislikes: dislikes,
    })

    this.updateScore({
      likes: likes,
      dislikes: dislikes,
    })
  }

  updateScore = (data) => {
    this.props.docRef
      .update({
        reactions: {
          likes: data.likes,
          dislikes: data.dislikes,
        },
      })
      .then(() => {
        this.setState({ syncing: false })
      })
  }

  render() {
    return (
      <div className="reaction_container">
        {this.state.likes.length >= 0 && (
          <ReactionButton
            type="upvote"
            active={this.state.isliked}
            count={this.state.likes.length}
            onReact={this.onVoteUp}
          />
        )}

        {this.state.dislikes.length >= 0 && (
          <ReactionButton
            type="downvote"
            active={this.state.isDisliked}
            count={this.state.dislikes.length}
            onReact={this.onVoteDown}
          />
        )}
      </div>
    )
  }
}

export { ReactionPicker }
