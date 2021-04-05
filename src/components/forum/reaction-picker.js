import { useState, useEffect } from 'react'
import { ReactionButton } from './reaction-button'

function ReactionPicker({ reactions, userId, docRef }) {
  const [syncing, setSyncing] = useState(false)
  const [likes, setLikes] = useState(reactions.likes)
  const [dislikes, setDislikes] = useState(reactions.dislikes)
  const [isLiked, setIsLiked] = useState(likes.includes(userId))
  const [isDisliked, setIsDisliked] = useState(dislikes.includes(userId))

  useEffect(() => {
    if (syncing) {
      docRef
        .update({
          reactions: {
            likes: likes,
            dislikes: dislikes,
          },
        })
        .then(() => {
          setSyncing(false)
        })
    }
  }, [syncing, setSyncing, likes, dislikes, isLiked, isDisliked, docRef])

  const onVoteUp = () => {
    if (syncing) {
      return false
    }

    setSyncing(true)

    if (isDisliked) {
      let updated = dislikes.filter((item) => {
        return item !== userId
      })
      setDislikes(updated)
      setIsDisliked(false)
    }

    if (isLiked) {
      let updated = likes.filter((item) => {
        return item !== userId
      })
      setLikes(updated)
      setIsLiked(false)
    } else {
      let updated = likes.concat(userId)
      setLikes(updated)
      setIsLiked(true)
    }
  }

  function onVoteDown() {
    if (syncing) {
      return false
    }

    setSyncing(true)

    if (isLiked) {
      let updated = likes.filter((item) => {
        return item !== userId
      })
      setLikes(updated)
      setIsLiked(false)
    }

    if (isDisliked) {
      let updated = dislikes.filter((item) => {
        return item !== userId
      })
      setDislikes(updated)
      setIsDisliked(false)
    } else {
      let updated = dislikes.concat(userId)
      setDislikes(updated)
      setIsDisliked(true)
    }
  }

  return (
    <div className="reaction_container">
      {likes.length >= 0 && (
        <ReactionButton type="upvote" active={isLiked} count={likes.length} onReact={onVoteUp} />
      )}

      {dislikes.length >= 0 && (
        <ReactionButton
          type="downvote"
          active={isDisliked}
          count={dislikes.length}
          onReact={onVoteDown}
        />
      )}
    </div>
  )
}

export { ReactionPicker }
