export const registerStats = (statData) => {
  const saveStat = window.firebase.functions().httpsCallable('saveStat');
  saveStat(statData)
}

