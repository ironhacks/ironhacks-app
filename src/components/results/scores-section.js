import { Component } from 'react'
import { downloadFileUrl } from '../../util/download-file-url'

function UserScoreRow({ name, label, value }) {
  return (
    <div className="flex flex-between py-3 px-2 font-bold">
      <div className="">{label}</div>
      <div className="">{value.toLocaleString('en-US')}</div>
    </div>
  )
}

class SubmissionLink extends Component {
  constructor(props) {
    super(props)

    this.downloadFileUrl = downloadFileUrl
  }

  render() {
    if (this.props.fileType === 'application/x-ipynb+json') {
      return (
        <a
          className="btn badge"
          href={`/notebook-viewer?path=${this.props.fileUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Submission Notebook
        </a>
      )
    } else if (this.props.fileType === 'text/csv') {
      return (
        <div
          className="btn badge"
          onClick={() => {
            this.downloadFileUrl({
              url: this.props.fileUrl,
              label: 'submission_file',
              name: this.props.fileName,
            })
          }}
        >
          Download Data File
        </div>
      )
    } else {
      return (
        <a className="link" href={this.props.fileUrl}>
          View File
        </a>
      )
    }
  }
}

SubmissionLink.defaultProps = {
  fileType: 'file',
}

const ResultsScoresSection = ({ scores, submission }) => {
  return (
    <div>
      {scores && (
        <div className="results_table px-4 mb-5">
          <div
            className="results_table_header flex flex-between py-2 mb-2 fs-m1 font-bold cl-grey"
            style={{
              borderBottom: '1px solid rgba(0,0,0,.2)',
            }}
          >
            <div className="header_col pl-2">Metric</div>
            <div className="header_col pr-2">Value</div>
          </div>
          <div>
            {scores.map((item, index) => (
              <UserScoreRow key={index} label={item.label} value={item.value} name={item.name} />
            ))}
          </div>
        </div>
      )}

      {submission && (
        <div>
          <h3 className="font-bold mb-1 text-left text-underline">Your Submission:</h3>
          {submission.files.map((item, index) => (
            <div key={index} className="mb-2">
              <SubmissionLink fileName={item.name} fileType={item.type} fileUrl={item.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { ResultsScoresSection }
