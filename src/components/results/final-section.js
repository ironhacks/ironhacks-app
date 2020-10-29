import styled from 'styled-components';

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

function UserScoreRow({name, label, value, format}) {
  if (format === 'percent') {
    value = `${value * 100}%`
  }
  return (
    <tr className="">
      <td className="">{label}</td>
      <td className="">{value}</td>
    </tr>
  )
}


function ResultsFinalSection({scores, userId}) {
  const userResult = scores[userId];


  return (
      <div>
        {scores && (
          <Table>
          <thead>
          <tr>
          <th>Metric</th>
          <th>Value</th>
          </tr>
          </thead>
          <tbody>
          {userResult ? userResult.map((item, index)=>(
            <UserScoreRow
              key={index}
              label={item.label}
              value={item.value}
              format={item.format}
              name={item.name}
            />
          )): (
            <p>No results for this user.</p>
          )}
          </tbody>
          </Table>
        )}
      </div>
    )
}


export { ResultsFinalSection }
