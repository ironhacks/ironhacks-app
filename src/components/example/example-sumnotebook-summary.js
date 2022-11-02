import { Component } from 'react'
import { userMetrics } from '../../util/user-metrics'
import { MdContentView } from '../markdown-viewer'

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
              <MdContentView
                enableTracking={true}
                content={this.props.title.content}
                encoded={false}
                emptyText="Tutorial is not available yet."
              />
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
              {this.props.notebook.content.length > 0 ? (
                <div className="text-capitalize flex-1 pr-2 text-right">
                  <a
                    className="badge bg-primary cl-black"
                    onClick={() => {
                      userMetrics({
                        event: 'results_notebook_opened',
                        // data: {
                        //   selectedUserId: participant.userId,
                        // },
                      })
                    }}
                    href={`/notebook-viewer?path=${this.props.notebook.content}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Notebook
                  </a>
                </div>
              ) : (
                <div className="text-capitalize flex-1 pr-2 text-right" />
              )}
            </>
          )}
        </div>
      </div>
    )
  }
}

class ExampleSumNotebook extends Component {
  render() {
    const title = this.props.exampleDataNB.map((item, index) => {
      const notebook = this.props.exampleDataSM[index]
      return (
        <div className="px-4">
          <ParticipantScoreRow key={index} title={title} notebook={notebook} />
        </div>
      )
    })

    // return (
    //   <div className="px-4">
    //     {this.props.exampleDataNB.map((item, index) => (
    //       <ParticipantScoreRow key={index} title={item} notebook={item} />
    //     ))}
    //   </div>
    // )
  }
}

export { ExampleSumNotebook }
