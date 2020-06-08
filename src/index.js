import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {unregister} from './serviceWorker';
import './assets/static/bootstrap-reboot.css'
import './assets/static/bootstrap-grid.css'
import App from './app';

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
