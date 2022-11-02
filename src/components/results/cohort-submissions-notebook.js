import { Component } from 'react'
import { userMetrics } from '../../util/user-metrics'

function ParticipantScoreRow({ participant, submission }) {
  let notebooks = []
  participant.files.forEach((file, index) => {
    if (file.type === 'application/x-ipynb+json') {
      notebooks.push({
        name: file.name,
        url: file.url,
      })
    } else if (file.name.split('.').slice(-1)[0] === 'ipynb') {
      notebooks.push({
        name: file.name,
        url: file.url,
      })
    }
  })
  return (
    <div className="flex flex-between py-3 px-2 font-bold">
      <div className="text-capitalize flex-1 pl-2 text-left">{participant.name}</div>

      {notebooks.length > 0 ? (
        <div className="text-capitalize flex-1 pr-2 text-right">
          <a
            className="badge bg-primary cl-black"
            onClick={() => {
              userMetrics({
                event: 'results_notebook_opened',
                data: {
                  selectedUserId: participant.userId,
                  submission: submission,
                },
              })
            }}
            href={`/notebook-viewer?path=${notebooks[0].url}`}
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

class CohortSubmissionsNotebook extends Component {
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
            <div className="header_col pl-2 flex-1 text-left">Participant</div>
            <div className="header_col pl-2 flex-1 text-right">Notebook</div>
          </div>
          <div>
            {this.props.participantData.map((item, index) => (
              <ParticipantScoreRow
                key={index}
                participant={item}
                submission={this.props.currentSubmission}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export { CohortSubmissionsNotebook }
