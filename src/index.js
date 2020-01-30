import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { unregister } from './serviceWorker';
import App from './App.js';
import './static/bootstrap-reboot.css';
import './static/bootstrap-grid.css';
import './main.css';

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));

unregister();
