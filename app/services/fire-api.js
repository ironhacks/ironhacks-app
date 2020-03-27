import apisauce from 'apisauce';

// / https://firestore.googleapis.com
// / :authority: firestore.googleapis.com
// / x-client-data: CIy2yQEIpbbJAQipncoBCMuuygEIvbDKAQj3tMoBCJa1ygEI7LXKARirpMoBGPWxygE=
const fireApi = apisauce.create({
  baseURL: 'https://firestore.googleapis.com',
});

export default fireApi;
