const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const getCurrentPhase = (phasesDates) => {
  const today = new Date();
  for (const key in phasesDates) {
    const startDate = new window.firebase.firestore.Timestamp(phasesDates[key].codingStartDate.seconds, phasesDates[key].codingStartDate.nanoseconds).toDate();
    const endDate = new window.firebase.firestore.Timestamp(phasesDates[key].codingStartEnd.seconds, phasesDates[key].codingStartEnd.nanoseconds).toDate();
    if(phasesDates[key].index === 0 && today < startDate) return -1;
    if (today > startDate && today < endDate) {
      return phasesDates[key];
    }
  }
}

export const getReactionViewformat = (date) => {
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${minutes}`
}

export const getDatesDifference = (date) => {
	return dateDiffInDays(date, new Date());
}

export const getFirebaseDate = (firebaseDate) => {
	return new window.firebase.firestore.Timestamp(firebaseDate.seconds, firebaseDate.nanoseconds).toDate();
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

