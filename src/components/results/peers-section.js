import { Component } from 'react';

function ParticipantScoreRow({participant}) {
  let notebooks = []
  participant.files.forEach((file, index) => {
    if (file.type === 'application/x-ipynb+json'){
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
    <tr>
      <td className="text-capitalize">{participant.name}</td>
      {notebooks.length > 0 ? (
        <td className="text-capitalize">
          <a
            className="badge bg-primary cl-black"
            href={`/notebook-viewer?path=${notebooks[0].url}`}
            target="_blank"
            rel="noopener noreferrer"
            >
            View
            </a>
        </td>
      ):(
        <td className="text-capitalize"/>
      )}
    </tr>
  )
}

class ResultsPeersSection extends Component {
  render() {
    return (
      <div>
        <table className="results_table">
          <thead>
            <tr>
              <th>Participant</th>
              <th>Submission</th>
            </tr>
          </thead>
          <tbody>
            {this.props.participantData.map((item, index)=>(
              <ParticipantScoreRow
                key={index}
                participant={item}
              />
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export { ResultsPeersSection }
