import randomUsername from './random-username';

function getParticipantForumId(hackId, userId) {
  return window.firebase.firestore()
    .collection('forums')
    .where('hack', '==', hackId)
    .get()
    .then((querySnapshot) => {
      let result = [];
      let userExists = false;

      querySnapshot.forEach(doc => {
        const forum = doc.data();
        const forumParticipants = Object.keys(forum.participants);
        // USER ALREADY FOUND STOP SEARCHING
        if (userExists) {
          console.log('user exist');
          return false;
        }

        // USER FOUND IN THIS FORUM STOP SEARCHING
        if (userId in forum.participants) {
          userExists = {
            forumId: doc.id,
            alias: forum.participants[userId]
          };
          return false;
        }

        // USER NOT FOUND ADD FORUM TO RESULT SET
        result.push({
          ...forum,
          forumId: doc.id,
          hackId: hackId,
          name: forum.name,
          count: forumParticipants.length,
          ref: doc.ref,
        })
      })

      // ADD USER TO FORUM WITH FEWEST MEMBERS
      if (userExists) {
        console.log('User already registered:', userExists);
        return userExists;
      }

      // ADD USER TO FORUM WITH FEWEST MEMBERS
      Promise.resolve(result)
        .then((data)=>{
          result.sort((a,b)=>{
            return a.count - b.count;
          })

          let assignedForum = result[0];
          let forumId = result[0].forumId;
          let forumUsername = randomUsername();
          assignedForum.ref.set({
            participants: {
              [userId]: forumUsername
            }
          }, { merge: true })
         .then(()=>{
            console.log('done');
            return {
              forumId: forumId,
              alias: forumUsername,
            }
         })
         .catch((err)=>{
           console.log(err);
           return false;
         })
      })
   })
  .catch(error => {
    return {message: error, status: 500};
  });
}


export { getParticipantForumId }
