import { Component } from 'react'

function ParticipantScoreRow({ participant }) {
  let tagList

  if (participant.tags && participant.tags.length > 0) {
    tagList = participant.tags.map((tag) => tag.label)
  } else {
    tagList = []
  }

  return (
    <div className="p-2 fs-m1 card my-2">
      <div className="text-capitalize">
        <span className="font-bold">User:</span>
        <span className="ml-1">{participant.name}</span>
      </div>

      <div className="">
        <span className="font-bold">Summary:</span>
        <span className="ml-1">{participant.summary}</span>
      </div>

      <div className="text-capitalize">
        <span className="font-bold">Tags:</span>
        <span className="ml-1">{tagList.join(', ')}</span>
      </div>
    </div>
  )
}

class CohortSubmissionsSummary extends Component {
  render() {
    return (
      <div className="px-4">
        {this.props.participantData.map((item, index) => (
          <ParticipantScoreRow key={index} participant={item} />
        ))}
      </div>
    )
  }
}

export { CohortSubmissionsSummary }
