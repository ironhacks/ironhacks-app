export const registerStats = (statData) => {
  console.log(statData)
  const saveStat = window.firebase.functions().httpsCallable('saveStat');
  saveStat(statData)
  .then((response) => {
    console.log(response)
  });
}

