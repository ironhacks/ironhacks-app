//
// *  User metrics reporting
// *  @function registerStats
// *  @param {Object} data user metrics
//
const userMetrics = (data) => {
  let user = window.firebase.auth().currentUser;

  let metricData = {
    ...data,
    userId:  user.uid || 'unauthenticated',
    date: window.firebase.firestore.Timestamp.now(),
  }

  if (process.env.NODE_ENV !== 'production') {
    window.firebase.firestore()
      .collection('stats')
      .add(metricData)
  }
}

export { userMetrics }
