import React from 'react';
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

function ParticipantScoreRow({name, stats}) {
  return (
    <tr>
      <td className="text-capitalize">{name}</td>
      <td className="text-capitalize">{stats.count}</td>
      <td className="text-capitalize">{stats.mean ? parseFloat(stats.mean).toFixed(2) : 'n/a'}</td>
      <td className="text-capitalize">{stats.deltaMean ? parseFloat(stats.deltaMean).toFixed(2) : 'n/a'}</td>
    </tr>
  )
}

class ResultsSummarySection extends React.Component {
  render() {
    return (
      <SectionContainer>
        <Table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Sample Size</th>
              <th>Mean</th>
              <th>StdDev</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.summary).map((key, index)=>(
              <ParticipantScoreRow
                key={index}
                name={key}
                stats={this.props.summary[key]}
              />
            ))}
          </tbody>
        </Table>
        <p>
          Total Participants: {this.props.participantCount}
        </p>
      </SectionContainer>
    )
  }
}

export { ResultsSummarySection }
