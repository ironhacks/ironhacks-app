import apisauce from 'apisauce';
import { CloudApiConfig, CloudApiDevConfig } from '../config/cloud-api';

// / :authority: firestore.googleapis.com
// / x-client-data: CIy2yQEIpbbJAQipncoBCMuuygEIvbDKAQj3tMoBCJa1ygEI7LXKARirpMoBGPWxygE=
let fireApiConfig = {
  baseUrl: '',
};

if (process.env.NODE_ENV !== 'production') {
  fireApiConfig.baseURL = CloudApiDevConfig.baseUrl;
} else {
  fireApiConfig.baseURL = CloudApiConfig.baseUrl;
}


const fireApi = apisauce.create(fireApiConfig);
fireApi.actions = {
  commitToGitHubUrl: CloudApiDevConfig.commitToGitHubUrl,
  createGitHubRepoUrl: CloudApiDevConfig.createGitHubRepoUrl,
  getPhaseResultsUrl: CloudApiDevConfig.getPhaseResultsUrl,
  getTaskDocUrl: CloudApiDevConfig.getTaskDocUrl,
  previewWebServerUrl: CloudApiDevConfig.previewWebServerUrl,
  registerUserUrl: CloudApiDevConfig.registerUserUrl,
  saveLikedCompetitorsUrl: CloudApiDevConfig.saveLikedCompetitorsUrl,
  saveStatUrl: CloudApiDevConfig.saveStatUrl,
}

export { fireApi }
