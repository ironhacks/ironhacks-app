import randomUsername from './random-username';

const registerUser = async ({hackId, userId}) => {
  let userDoc = await window.firebase.firestore()
    .doc(`/users/${userId}`)
    .get()

  let userRef = userDoc.ref;

  try {
    let participants = await window.firebase.firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('registration')
      .doc('participants')

    let participantList = await participants.get();

    // DO NOT OVERWRITE EXISTING USER ENTRIES
    if (userId in participantList.data() === false){
      await participants.set({
        [userId]: {
          alias: randomUsername(),
          ref: userRef,
        }}, { merge: true });
    }

    await userRef.set({
      hacks: window.firebase.firestore.FieldValue.arrayUnion(hackId),
    }, { merge: true })

  } catch (e) {
    console.log(e);
    return false;
  } finally {
    return true;
  }
}

export { registerUser }
