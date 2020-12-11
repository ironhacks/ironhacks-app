export function fire2Ms(fireDate) {
  return fireDate.seconds * 1000 + fireDate.nanoseconds / 1000000
}

export function fire2Date(fireDate) {
  return new Date(fireDate.seconds * 1000 + fireDate.nanoseconds / 1000000)
}

export async function getStats({
  startDate = false,
  hackId = false,
  userId = false,
  notUserId = false,
}) {
  var START_DATE = '2020-08-10'

  var date = startDate ? startDate : START_DATE
  var timestamp = window.firebase.firestore.Timestamp.fromDate(new Date(date))

  var stats = []

  let query = window.firebase.firestore().collection('stats')
  query = query.where('timestamp', '>', timestamp)

  if (hackId) {
    query = query.where('hackId', '==', hackId)
  }

  if (userId) {
    query = query.where('userId', '==', userId)
  }

  let snapshot = await query.get()

  snapshot.forEach((doc) => {
    stats.push(doc.data())
  })

  console.log(stats)

  Promise.resolve(stats).then(() => {
    var result = []

    // ADD HEADERS
    result.push(['timestamp', 'userId', 'event', 'pathname'].join(','))

    stats.forEach((stat) => {
      result.push(
        [fire2Date(stat.timestamp).toISOString(), stat.userId, stat.event, stat.pathname].join(', ')
      )
    })

    console.log('\nRESULTS\n')
    console.log(result.join('\n'))
    return result
  })
}
