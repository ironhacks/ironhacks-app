//
// *  User metrics reporting
// *  @function registerStats
// *  @param {Object} data user metrics
// *  { event }
// *  { data }
//
const userMetrics = (eventData, options = {}) => {
  let user = window.firebase.auth().currentUser
  if (!user) {
    return false
  }

  let metricData = {
    ...eventData,
    userId: user.uid || 'unauthenticated',
    timestamp: window.firebase.firestore.Timestamp.now(),
    pathname: window.location.pathname,
  }

  if (options.debug) {
    console.log(metricData)
  }

  if (process.env.NODE_ENV !== 'production') {
    return false
  }

  try {
    window.firebase
      .firestore()
      .collection('stats')
      .add(metricData)
  } catch (e) {
    console.log('metrics error', e)
  }
}

export { userMetrics }
