//
// *  User metrics reporting
// *  @function registerStats
// *  @param {Object} data user metrics
//
const userMetrics = (eventData) => {
  let user = window.firebase.auth().currentUser;

  let metricData = {
    ...eventData,
    userId:  user.uid || 'unauthenticated',
    timestamp: window.firebase.firestore.Timestamp.now(),
    pathname: window.location.pathname,
  }

  if (process.env.NODE_ENV !== 'production') {
    window.firebase.firestore()
      .collection('stats')
      .add(metricData)
  }
}

export { userMetrics }
