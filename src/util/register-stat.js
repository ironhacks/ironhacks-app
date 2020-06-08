
//
// *  User metrics reporting
// *  @function registerStats
// *  @param {Object} statData user metrics
//
export const registerStats = (statData) => {
  console.log('registerStats', statData);
  if (process.env.NODE_ENV !== 'production') {
    console.log('statData', statData);
  } else {
    const saveStat = window.firebase.functions().httpsCallable('saveStat');
    saveStat(statData);
  }
};
