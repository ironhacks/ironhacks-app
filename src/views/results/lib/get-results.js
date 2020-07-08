
const getAdminHackData = async (data) => {
  const { hackId } = data;

  let adminHackDataPromise = await window.firebase.firestore()
    .collection('adminHackData')
    .doc(hackId)
    .get();

  const adminHackData = adminHackDataPromise.data();

  return {
    registeredUsers: adminHackData.registeredUsers,
    results: adminHackData.results || null,
    task: adminHackData.task || null,
    whitelist: adminHackData.whitelist,
  }
}


const getPhaseResults = (data) => {
  const { phase, hackResults } = data;
  console.log('data', data);
  const phaseResults = hackResults[phase];
  if (!phaseResults){
    return {
      error: 'No results for this phase yet.'
    }
  } else {
    return phaseResults;
  }
}


const getUserPhaseResults = (data) => {
  const { phaseResults, userId } = data;
  let userResults = phaseResults[userId];

  if (!userResults) {
    return false;
  }
  return phaseResults;
}

const getUserForumData = (data) => {
//       const { likedCompetitors } = userResults;
//       console.log('likedCompetitors', likedCompetitors);
  const forum = window.firebase.firestore()
    .collection('forums')
    .doc()
    .get();

    console.log('forums', forum);

    // .doc(forumId)
//       const today = new Date();

//       let allowed = likedCompetitors || Object.keys(forum.data().participants);

//       const offSetDate = new Date(endDate);
//       offSetDate.setDate(offSetDate.getDate() + 1);
//
//       if (today > offSetDate) {
//         allowed = likedCompetitors || [];
//         userResults.filtered = true;
//       }
//
//       const filtered = Object.keys(userResults.similarity)
//       .filter(key => allowed.includes(key))
//       .reduce((obj, key) => {
//         obj[key] = userResults.similarity[key];
//         return obj;
//       }, {});
//
//       if (likedCompetitors !== undefined) {
//         userResults.filtered = true;
//       }
//
//       userResults.similarity = filtered;
//
//       if (!userResults) {
//         return { message: 'error', status: 500 };
//       } else {
//         return { userResults }
//       }
//     }
}


export {
  getAdminHackData,
  getPhaseResults,
  getUserPhaseResults,
  getUserForumData
}
