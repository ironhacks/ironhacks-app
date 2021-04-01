import { Component } from 'react'
import { userMetrics } from '../../util/user-metrics'

class ParticipantScoreRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }

    const PREVIEW_LENGTH = 160

    if (props.participant.tags && props.participant.tags.length > 0) {
      this.tagList = props.participant.tags.map((tag) => tag.label)
    } else {
      this.tagList = []
    }

    if (props.participant.summary) {
      this.summaryPreview =
        props.participant.summary.length > PREVIEW_LENGTH
          ? props.participant.summary.substring(0, PREVIEW_LENGTH) + '...'
          : props.participant.summary
    } else {
      this.summaryPreview = ''
    }
  }

  expandPreview = (userId) => {
    userMetrics({
      event: 'results_summary_expanded',
      data: {
        selectedUserId: this.props.participant.userId,
        submission: this.props.submission,
      },
    })
    this.setState({ expanded: true })
  }

  render() {
    return (
      <div className="px-2 pt-2 pb-1 fs-m1 card my-2">
        <div className="text-capitalize mb-1">
          <span className="font-extrabold">{this.props.participant.name}</span>
        </div>

        <div className="">
          <span className="font-bold">Summary:</span>
          {this.state.expanded ? (
            <>
              <span className="ml-1">{this.props.participant.summary}</span>
            </>
          ) : (
            <>
            <span className="ml-1">{this.summaryPreview}</span>
              <div
                className="badge bd-1 button cl-pink ml-2 pb-1 px-1"
                onClick={this.expandPreview}
              >
                expand
              </div>
            </>
          )}
        </div>

        <div className="text-capitalize mt-1">
          {this.tagList.map((tag, index) => (
            <span key={index} className="mr-1 badge">
              {tag}
            </span>
          ))}
        </div>
      </div>
    )
  }
}

class CohortSubmissionsSummary extends Component {
  render() {
    return (
      <div className="px-4">
        {this.props.participantData.map((item, index) => (
          <ParticipantScoreRow
            key={index}
            participant={item}
            submission={this.props.currentSubmission}
          />
        ))}
      </div>
    )
  }
}

export { CohortSubmissionsSummary }
