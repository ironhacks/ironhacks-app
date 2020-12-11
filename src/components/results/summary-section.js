function ParticipantScoreRow({ name, stats }) {
  console.log(stats)
  let niceMean = stats.mean
    ? parseFloat(parseFloat(stats.mean).toFixed(2)).toLocaleString('en-US')
    : 'n/a'

  let niceStdDev = stats.stdDev
    ? parseFloat(parseFloat(stats.stdDev).toFixed(2)).toLocaleString('en-US')
    : 'n/a'

  return (
    <div className="flex flex-between py-3 px-2 font-bold">
      <div className="text-capitalize flex-1 pl-2 text-left">{name}</div>
      <div className="text-capitalize flex-1 px-2 text-right">{stats.count}</div>
      <div className="text-capitalize flex-1 px-2 text-right">{niceMean}</div>
      <div className="text-capitalize flex-1 pr-2 text-right">{niceStdDev}</div>
    </div>
  )
}

const ResultsSummarySection = ({ summary, participantCount }) => {
  return (
    <div>
      <div className="results_table px-4 mb-5">
        <div
          className="results_table_header flex flex-between py-2 px-2 mb-2 fs-m1 font-bold cl-grey"
          style={{
            borderBottom: '1px solid rgba(0,0,0,.2)',
          }}
        >
          <div className="header_col pl-2 flex-1 text-left">Metric</div>
          <div className="header_col px-2 flex-1 text-right">Sample Size</div>
          <div className="header_col px-2 flex-1 text-right">Mean</div>
          <div className="header_col pr-2 flex-1 text-right">StdDev</div>
        </div>

        <div>
          {Object.keys(summary).map((key, index) => (
            <ParticipantScoreRow key={index} name={key} stats={summary[key]} />
          ))}
        </div>
      </div>
      <p>Total Participants: {participantCount}</p>
    </div>
  )
}

export { ResultsSummarySection }
