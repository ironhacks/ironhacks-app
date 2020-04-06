import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {unregister} from './serviceWorker';
// import Reactotron from 'reactotron-react-js';
import Log from './util/log';
import {fireApi} from './services/fire-api';
import './ReactotronConfig'
import App from './app';

if (process.env.NODE_ENV !== 'production') {
  const devHackData = {
    ihdemo: {
      forumId: 'Ey3ixM3mtmsHhXIPHVff',
      hackId: 'eKZyDxD4TGIsvzGAHF6f',
    },
    ihplatformreview: {
      hackId: 'mmHJrWzmx4rCyQ2YpJWL',
      forumId: [
        'UI0uDZcAyldOnftvl1Pr',
        'UI0uDZcAyldOnftvl1Pr',
      ],
    },
    purdueunal2019: {
      hackId: 'mmHJrWzmx4rCyQ2YpJWL',
      forumId: [
        'qJmgIAFB6FtazeS66vJu',
        '8JKHD71CFYS2SzI52UQ9',
      ],
    },
  };

  localStorage.setItem('debug','"development" ');
  Log.info('app loaded');
  console.log('env', process.env);
}

console.log(fireApi);
if (process.env.NODE_ENV !== 'production') {
  window.__DEV__ = true;
} else {
  window.__DEV__ = false;
}

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));

unregister();
