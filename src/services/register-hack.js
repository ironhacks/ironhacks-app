import randomUsername from './random-username'

// TODO: THIS SHOULD BE HANDLED BY FIREBASE CLOUD ADMIN FUNCTIONS
const registerUser = async ({ hackId, userId }) => {
  let userDoc = await window.firebase
    .firestore()
    .doc(`/users/${userId}`)
    .get()

  let userRef = userDoc.ref
  let userData = await userDoc.data()

  let registrationCohortsDoc = await window.firebase
    .firestore()
    .collection('hacks')
    .doc(hackId)
    .collection('registration')
    .doc('cohorts')
    .get()

  let registrationCohorts = await registrationCohortsDoc.data()

  // SELECT THE COHORT WITH THE LEAST REGISTERED PARTICIPANTS
  let smallestCohortSize = Object.values(registrationCohorts)
    .map((cohort) => {
      return cohort.length
    })
    .sort()[0]

  let cohortId = Object.keys(registrationCohorts).filter((key) => {
    return registrationCohorts[key].length === smallestCohortSize
  })[0]

  try {
    let participants = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('registration')
      .doc('participants')

    // TODO: IS USER ADMIN
    // DO NOT ASSIGN ADMIN USER TO COHORTS
    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('registration')
      .doc('cohorts')
      .update({
        [cohortId]: window.firebase.firestore.FieldValue.arrayUnion(userId),
      })

    let participantList = await participants.get()

    // DO NOT OVERWRITE EXISTING USER ENTRIES
    if (userId in participantList.data() === false) {
      await participants.set(
        {
          [userId]: {
            name: userData.name,
            alias: userData.alias ? userData.alias : randomUsername(),
            email: userData.email,
            ref: userRef,
            cohort: cohortId,
          },
        },
        { merge: true }
      )
    }

    await userRef.set(
      {
        hacks: window.firebase.firestore.FieldValue.arrayUnion(hackId),
      },
      { merge: true }
    )
  } catch (e) {
    console.log(e)
    return false
  } finally {
    return true
  }
}

export { registerUser }
