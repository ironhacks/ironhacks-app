import { Component } from 'react'
import { userMetrics } from '../../util/user-metrics'

class ParticipantScoreRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }

  expandPreview = (userId) => {
    userMetrics({
      event: 'examples_summary_expanded',
      // data: {
      //   selectedUserId: this.props.participant.userId,
      // },
    })
    this.setState({ expanded: true })
  }

  render() {
    return (
      <div className="px-2 pt-2 pb-1 fs-m1 card my-2">
        <div className="text-capitalize mb-1">
          <span className="font-extrabold">{this.props.title.title}</span>
        </div>

        <div className="">
          <span className="font-bold">Summary:</span>
          {this.state.expanded ? (
            <>
              <span className="ml-1">{this.props.title.content}</span>
            </>
          ) : (
            <>
              <span className="ml-1">{this.contentPreview}</span>
              <div
                className="badge bd-1 button cl-pink ml-2 pb-1 px-1"
                onClick={this.expandPreview}
              >
                expand
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}

class ExampleSubmissionsSummary extends Component {
  render() {
    return (
      <div className="px-4">
        {this.props.exampleData.map((item, index) => (
          <ParticipantScoreRow key={index} title={item} />
        ))}
      </div>
    )
  }
}

export { ExampleSubmissionsSummary }
