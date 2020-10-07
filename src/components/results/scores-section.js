import React from 'react';
import styled from 'styled-components';
import { downloadFileUrl } from '../../util/download-file-url';

const Table = styled('table')`
  border-collapse: collapse;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;

  thead {
    background-color: var(--gray-dark);

    color: var(--white);
  }

  th {
    padding: .4em 0;
  }

  tr {
    position: relative;

    :nth-child(even) {
      background-color: #e2e2e2;
    }

    td,
    th {
      text-align: center;
    }
  }

  a {
    padding: 10px;
    font-weight: 700;
    color: white;
    background-color: #e6b92f;
    border-radius: 4px;
  }
`;

function UserScoreRow({name, label, value}) {
  return (
    <tr className="">
      <td className="">{label}</td>
      <td className="">{value}</td>
    </tr>
  )
}


class SubmissionLink extends React.Component {
  constructor(props) {
    super(props);

    this.downloadFileUrl = downloadFileUrl;
  }

  render() {
    if (this.props.fileType ===  'application/x-ipynb+json') {
      return (
        <a
          className="btn badge"
          href={`https://ironhacks.com/notebook-viewer?path=${this.props.fileUrl}`}
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


class ResultsScoresSection extends React.Component {
  render() {
    return (
      <div>
        {this.props.scores && (
          <Table>
          <thead>
          <tr>
          <th>Metric</th>
          <th>Value</th>
          </tr>
          </thead>
          <tbody>
          {this.props.scores.map((item, index)=>(
            <UserScoreRow
              key={index}
              label={item.label}
              value={item.value}
              name={item.name}
            />
          ))}
          </tbody>
          </Table>
        )}

        {this.props.submission && (
          <div>
            <h3 className="font-bold mb-1 text-left text-underline">Your Submission:</h3>
            {this.props.submission.files.map((item, index)=>(
              <div
                key={index}
                className="mb-2"
                >
                <SubmissionLink
                  fileName={item.name}
                  fileType={item.type}
                  fileUrl={item.url}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export { ResultsScoresSection }
