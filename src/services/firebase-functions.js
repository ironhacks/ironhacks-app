//------------------------------------------
// Firebase helper
//------------------------------------------

//------------------------------------------
// Firestore init.
//------------------------------------------

const firestore = window.firebase.firestore();

//------------------------------------------
// Database collections constants
//------------------------------------------

const COLLECTIONS = {
  ADMIN_HACK_DATA: "adminHackData",
  COMMNETS: "comments",
  FORUMS: "forums",
  HACKS: "hacks",
  STATS: "stats",
  THREADS: "threads",
  USERS: "user",
  WHITELISTS: "whitelists",
}

//------------------------------------------
// getHackByID - retrieve a hack by id
// hackID (String): The function will query that hackID and return and object with the data
//------------------------------------------

export const getHackByID = async (hackID) => {
  let hackData;
  try {
    const response = await firestore.collection(COLLECTIONS.HACKS)
    .doc(hackID)
    .get()
    if (!response.exist) throw new Error('No Hack with that ID!');
    hackData = response.data()
    hackData.id = response.id;
    return hackData;
  } catch ( err ) {
    console.error("Error reading document: ", err)
  }
};

//------------------------------------------
// getHackByName - retrieve a hack by name
// hackName (String): The function will query that hackName and return and object with the data
//------------------------------------------

export const getHackByName = async (hackName) => {
  let hackData;
  try {
    const response = await firestore.collection(COLLECTIONS.HACKS)
    .where("name", "==", hackName)
    .limit(1)
    .get()
    if(response.docs.length !== 1) throw new Error('No Hack with that ID!');
    response.docs.forEach( (doc) => {
      hackData = doc.data()
      hackData.id = doc.id;
    });
    return hackData;
  } catch ( err ) {
    console.error("Error reading document: ", err)
  }
};

//------------------------------------------
// getHacks - retrieve a full list of hacks.
//------------------------------------------

export const getAllHacks = async () => {
  let hacks = [];
  try {
    const response = await firestore.collection(COLLECTIONS.HACKS).get()
    response.docs.forEach( (doc) => {
      const hackData = doc.data()
      hackData.id = doc.id;  
      hacks.push(hackData);
    });
    return hacks;
  } catch ( err ) {
    console.error("Error reading document: ", err)
  }
};

//------------------------------------------
// getAdminHackData(hackObject, [hackID]) - populate a given hackObject with admin data.
// hackObject (object): existing object where the data is going to be saved.
// [hackID] (string, optional): If present, the function will query that hackID data and populated on the hackObject.
//------------------------------------------
export const getAdminHackData = async (hackObject, _hackID) => {
  const hackData = { ...hackObject };
  let hackID = _hackID || hackData.id;
  try {
    const hackAdminData = await firestore.collection(COLLECTIONS.ADMIN_HACK_DATA).doc(hackID).get();
    hackData.whitelist = hackAdminData.data().whitelist
    hackData.task = hackAdminData.data().task
    return hackData;
  } catch ( err ) {
    console.error("Error reading document: ", err)
  }
}

//------------------------------------------
// updateHackWhitelist(whitelist) - update the whitelist on firebase.
// whitelist (array): array of emails. 
// hackObject (object): classic hack object pulled from the db
// return batch promise
//
//------------------------------------------

export const updateWhitelist = async (whitelist, hackID) => {
  let batch = firestore.batch();
  whitelist.forEach( (email) => {
    const data = {whitelist: window.firebase.firestore.FieldValue.arrayUnion(hackID)}
    const whiteListDoc = firestore.collection(COLLECTIONS.WHITELISTS).doc(email);
    batch.set(whiteListDoc, data, {merge: true});
  })

  const hackRef = firestore.collection(COLLECTIONS.ADMIN_HACK_DATA)
  .doc(hackID);
  batch.set(hackRef, {whitelist: whitelist}, {merge: true})
  return batch.commit();
}

//------------------------------------------
// updateHackWhitelist(whitelist) - update the whitelist on firebase.
// whitelist (array): array of emails. 
// hackObject (object): classic hack object pulled from the db
// return batch promise
//
//------------------------------------------

export const updateTutorialDocument = async (markdown, hackID) => {

}






