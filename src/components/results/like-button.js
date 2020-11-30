import { Component } from 'react'

class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likedUsers: [],
    }

    this.buttonStyle = {
      position: 'absolute',
      display: props.hidden ? 'none' : 'block',
      bottom: '15px',
      right: 0,
      width: '150px',
      height: '40px',
      marginTop: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#FFD75F',
      cursor: 'pointer',
    }
  }

  saveLikes() {
    const likedUsers = []
    for (const k in this.state.likedUsers) {
      if (this.state.likedUsers[k]) {
        likedUsers.push(k)
      }
    }

    this.props.onLikedCompetitors(likedUsers)
  }

  render() {
    return (
      <button style={this.buttonStyle} onClick={this.saveLikes} hidden={this.props.hidden}>
        Save likes
      </button>
    )
  }
}

export { LikeButton }
