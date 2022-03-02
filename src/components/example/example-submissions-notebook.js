import { Component } from 'react'
import { userMetrics } from '../../util/user-metrics'

function ParticipantScoreRow({ notebook }) {
  return (
    <div className="flex flex-between py-3 px-2 font-bold">
      <div className="text-capitalize flex-1 pl-2 text-left">{notebook.title}</div>
      {notebook.content.length > 0 ? (
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
            href={`/notebook-viewer?path=${notebook.content}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        </div>
      ) : (
        <div className="text-capitalize flex-1 pr-2 text-right" />
      )}
    </div>
  )
}

class ExampleSubmissionsNotebook extends Component {
  render() {
    return (
      <div>
        <div className="results_table px-4 mb-5">
          <div
            className="results_table_header flex flex-between py-2 px-2 mb-2 fs-m1 font-bold cl-grey"
            style={{
              borderBottom: '1px solid rgba(0,0,0,.2)',
            }}
          >
            <div className="header_col pl-2 flex-1 text-left">Title</div>
            <div className="header_col pl-2 flex-1 text-right">Notebook</div>
          </div>
          <div>
            {this.props.exampleData.map((item, index) => (
              <ParticipantScoreRow key={index} notebook={item} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export { ExampleSubmissionsNotebook }
