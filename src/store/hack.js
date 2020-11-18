export const hackSchema = {
    name: '',
    description: '',
    defaultTask: {name: '', label: ''},
    difficulty: {name: '', label: ''},
    displayOptions: {
      calendarEnabled: false,
      forumEnabled: false,
      resultsEnabled: false,
      rulesEnabled: false,
      submissionsEnabled: false,
      taskEnabled: false,
      tutorialsEnabled: false,
    },
    hackSlug: '',
    hackThumbImg: '',
    hackBannerImg: '',
    hackPublished: false,
    registrationSurvey: '',
    registrationOpen: false,
    startDate: '',
    overview: {doc: '', updated: ''},
    rules: {doc: '', updated: ''}
}

export const setHackData = (data) => {
  window.sessionStorage.setItem('hackData', JSON.stringify(data))
}

export const getHackData = () => {
  return JSON.parse(window.sessionStorage.getItem('hackData'))
}

export const unsetHackData = () => {
  window.sessionStorage.removeItem('userlist')
  return true
}
