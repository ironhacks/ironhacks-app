import { Component } from 'react';
import styled from 'styled-components';

const SectionContainer = styled('div')`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

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
  constructor(props) {
    super(props);
    this.state = {
      likedUsers: [],
    }
  }


  render() {
    return (
      <SectionContainer>
        <Table>
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
        </Table>
      </SectionContainer>
    )
  }
}

export { ResultsPeersSection }
