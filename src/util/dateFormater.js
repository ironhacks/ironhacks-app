const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const getCurrentPhase = (phasesDates) => {
  console.log('getCurrentPhase');
  const today = new Date();

  for (const item of phasesDates) {
    console.log('key', item);
    console.log('phasesDates', phasesDates);
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
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${minutes}`;
};

export const getDatesDifference = (date) => {
  return dateDiffInDays(date, new Date());
};

export const getFirebaseDate = (firebaseDate) => {
  console.log('get firebase date');
  return new window.firebase.firestore.Timestamp(firebaseDate.seconds, firebaseDate.nanoseconds).toDate();
};

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
