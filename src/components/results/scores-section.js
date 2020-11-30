import { Component } from 'react';
import { downloadFileUrl } from '../../util/download-file-url';

function UserScoreRow({name, label, value}) {
  return (
    <tr className="">
      <td className="">{label}</td>
      <td className="">{value}</td>
    </tr>
  )
}


class SubmissionLink extends Component {
  constructor(props) {
    super(props);

    this.downloadFileUrl = downloadFileUrl;
  }

  render() {
    if (this.props.fileType ===  'application/x-ipynb+json') {
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
    }

    else if (this.props.fileType === 'text/csv') {
      return (
      <div
        className="btn badge"
        onClick={()=>{
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
    }

    else {
      return (
      <a
        className="link"
        href={this.props.fileUrl}
      >
        View File
      </a>
      )
    }
  }
}

SubmissionLink.defaultProps = {
  fileType: 'file',
}


const ResultsScoresSection = ({scores, submission}) => {
  return (
    <div>
      {scores && (
        <table className="results_table">
          <thead>
            <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        {scores.map((item, index)=>(
          <UserScoreRow
            key={index}
            label={item.label}
            value={item.value}
            name={item.name}
          />
        ))}
        </tbody>
        </table>
      )}
    </div>
  )
}

export { ResultsScoresSection }

// {submission && (
//   <div>
//     <h3 className="font-bold mb-1 text-left text-underline">Your Submission:</h3>
//     {submission.files.map((item, index)=>(
//       <div
//         key={index}
//         className="mb-2"
//         >
//         <SubmissionLink
//           fileName={item.name}
//           fileType={item.type}
//           fileUrl={item.url}
//         />
//       </div>
//     ))}
//   </div>
// )}
