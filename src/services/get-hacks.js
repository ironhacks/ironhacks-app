export const getOpenHacks = async () => {
  const openHacks = await window.firebase.firestore()
    .collection('hacks')
    .where('registrationOpen', '==', true)
    .get()
    .then((result)=>{
      var openHackList = [];
      if (!result.empty) {
        result.docs.forEach((hack)=>{
          let hackId = hack.id;
            openHackList.push(hackId)
        })
        return openHackList;
      }
    })
  return openHacks;
}

export const getClosedHacks = async () => {
  const closedHacks = await window.firebase.firestore()
    .collection('hacks')
    .where('registrationOpen', '==', false)
    .get()
    .then((result)=>{
      var closedHackList = [];
      if (!result.empty) {
        result.docs.forEach((hack)=>{
          let hackId = hack.id;
            closedHackList.push(hackId)
        })
        return closedHackList;
      }
    })
   return closedHacks;
}
