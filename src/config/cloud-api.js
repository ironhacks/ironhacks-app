const cloudFunctionsProdEndPoint =
  'https://us-central1-the-ironhacks-platform-dev.cloudfunctions.net'

const CloudApiDevConfig = {
  baseUrl: 'localhost:5000',
  commitToGitHubUrl: 'http://localhost:5000/the-ironhacks-platform-dev/us-central1/commitToGitHub',
  createGitHubRepoUrl:
    'http://localhost:5000/the-ironhacks-platform-dev/us-central1/createGitHubRepo',
  getPhaseResultsUrl:
    'http://localhost:5000/the-ironhacks-platform-dev/us-central1/getPhaseResults',
  getTaskDocUrl: 'http://localhost:5000/the-ironhacks-platform-dev/us-central1/getTaskDoc',
  previewWebServerUrl:
    'http://localhost:5000/the-ironhacks-platform-dev/us-central1/previewWebServer',
  registerUserUrl: 'http://localhost:5000/the-ironhacks-platform-dev/us-central1/registerUser',
  saveLikedCompetitorsUrl:
    'http://localhost:5000/the-ironhacks-platform-dev/us-central1/saveLikedCompetitors',
  saveStatUrl: 'http://localhost:5000/the-ironhacks-platform-dev/us-central1/saveStat',
}

const CloudApiConfig = {
  baseURL: 'https://firestore.googleapis.com',
  apiKey: 'AIzaSyA6EnVRUF1W1QD4qvx-6yjcQ2A4YNrihqY',
  authDomain: 'the-ironhacks-platform-dev.firebaseapp.com',
  databaseURL: 'https://the-ironhacks-platform-dev.firebaseio.com',
  projectId: 'the-ironhacks-platform-dev',
  storageBucket: 'the-ironhacks-platform-dev.appspot.com',
  messagingSenderId: '314398832566',
  appId: '1:314398832566:web:da5dfef4755d4745aab317',
}

export { cloudFunctionsProdEndPoint, CloudApiConfig, CloudApiDevConfig }
