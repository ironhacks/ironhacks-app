
export const getCurrentPhase = (phasesDates) => {
  const today = new Date();

  for (const item of phasesDates) {
    const startDate = new window.firebase.firestore.Timestamp(
        item.codingStartDate.seconds,
        item.codingStartDate.nanoseconds,
    ).toDate();

    const endDate = new window.firebase.firestore.Timestamp(
        item.codingStartEnd.seconds,
        item.codingStartEnd.nanoseconds,
    ).toDate();

    if (item.index === 0 && today < startDate ) {
      return -1;
    }

    if (today > startDate && today < endDate) {
      return item;
    }
  }
};


export const getReactionViewformat = (date) => {
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${minutes}`;
}


export const getDatesDifference = (date) => {
  return dateDiffInDays(date, new Date());
}


export const getFirebaseDate = (firebaseDate) => {
  return new window.firebase.firestore.Timestamp(firebaseDate.seconds, firebaseDate.nanoseconds).toDate();
}

export const fire2Ms = (fireDate) => {
  return ((fireDate.seconds * 1000) + (fireDate.nanoseconds / 1000000))
}

export const fire2Date = (fireDate) => {
  return new Date((fireDate.seconds * 1000) + (fireDate.nanoseconds / 1000000))
}


function dateDiffInDays(a, b) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / MS_PER_DAY);
}
