import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {unregister} from './serviceWorker';
import App from './app';
// import {fireApi} from './services/fire-api';

// if (process.env.NODE_ENV !== 'production' && process.env.TEST_HACK) {
  // const devHackData = {
  //   ihdemo: {
  //     forumId: 'Ey3ixM3mtmsHhXIPHVff',
  //     hackId: 'eKZyDxD4TGIsvzGAHF6f',
  //   },
  //   ihplatformreview: {
  //     hackId: 'mmHJrWzmx4rCyQ2YpJWL',
  //     forumId: [
  //       'UI0uDZcAyldOnftvl1Pr',
  //       'UI0uDZcAyldOnftvl1Pr',
  //     ],
  //   },
  //   purdueunal2019: {
  //     hackId: 'mmHJrWzmx4rCyQ2YpJWL',
  //     forumId: [
  //       'qJmgIAFB6FtazeS66vJu',
  //       '8JKHD71CFYS2SzI52UQ9',
  //     ],
  //   },
  // };
// }

if (process.env.NODE_ENV !== 'production') {
  window.__DEV__ = true;
  localStorage.setItem('debug','"development" ');
} else {
  window.__DEV__ = false;
}

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));

unregister();
