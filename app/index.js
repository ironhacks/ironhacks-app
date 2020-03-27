import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {unregister} from './serviceWorker';
import App from './App.js';
import './static/bootstrap-reboot.css';
import './static/bootstrap-grid.css';
import './main.css';
import Reactotron from 'reactotron-react-js';
import fireApi from './services/fireApi';
import Log from './util/log';
import './ReactotronConfig';


// Add these lines:
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

  localStorage.setItem('debug', 'ironhacks:*');
  fireApi.addMonitor(Reactotron.apisauce);
  Reactotron.clear();
  Log.info(Reactotron.apisauce);
  Log.info(fireApi);
}

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));

unregister();
