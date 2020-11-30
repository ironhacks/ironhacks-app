const getHackForums = (hackId) => {
  return window.firebse
    .firestore()
    .collection('forums')
    .where('hack', '==', hackId)
    .get()
    .then((hackForums) => {
      try {
        let forums = []
        hackForums.forEach((doc) => {
          forums.push(doc.data())
        })
        return forums
      } catch (e) {
        console.log('error', e)
        return false
      }
    })
}

export { getHackForums }
