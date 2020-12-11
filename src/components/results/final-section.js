function UserScoreRow({ name, label, value, format }) {
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

function ResultsFinalSection({ scores, userId }) {
  const userResult = scores[userId]

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
            {userResult ? (
              userResult.map((item, index) => (
                <UserScoreRow
                  key={index}
                  label={item.label}
                  value={item.value}
                  format={item.format}
                  name={item.name}
                />
              ))
            ) : (
              <tr className="">
                <td className="">
                  <p>No results for this user.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export { ResultsFinalSection }
