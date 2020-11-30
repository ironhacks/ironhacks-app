function ParticipantScoreRow({ name, stats }) {
  return (
    <tr>
      <td className="text-capitalize">{name}</td>
      <td className="text-capitalize">{stats.count}</td>
      <td className="text-capitalize">{stats.mean ? parseFloat(stats.mean).toFixed(2) : 'n/a'}</td>
      <td className="text-capitalize">{stats.stdDev ? parseFloat(stats.stdDev).toFixed(2) : 'n/a'}</td>
    </tr>
  )
}

const ResultsSummarySection = ({ summary, participantCount }) => {
  return (
    <div>
      <table className="results_table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Sample Size</th>
            <th>Mean</th>
            <th>StdDev</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(summary).map((key, index) => (
            <ParticipantScoreRow key={index} name={key} stats={summary[key]} />
          ))}
        </tbody>
      </table>
      <p>Total Participants: {participantCount}</p>
    </div>
  )
}

export { ResultsSummarySection }
