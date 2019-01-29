export const getCurrentPhase = (phasesDates) => {
  const today = new Date();
  console.log(today);
  for (const key in phasesDates) {
    const startDate = new window.firebase.firestore.Timestamp(phasesDates[key].codingStartDate.seconds, phasesDates[key].codingStartDate.nanoseconds).toDate();
    const endDate = new window.firebase.firestore.Timestamp(phasesDates[key].codingStartEnd.seconds, phasesDates[key].codingStartEnd.nanoseconds).toDate();
    if (today > startDate && today < endDate) {
      return phasesDates[key];
    }
  }
  return 0;
}