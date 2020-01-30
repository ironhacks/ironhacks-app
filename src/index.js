import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { unregister } from './serviceWorker';
import App from './App.js';
import './static/bootstrap-reboot.css';
import './static/bootstrap-grid.css';
import './main.css';

// Add these lines:
if (process.env.NODE_ENV !== 'production') {
  localStorage.setItem('debug', 'ironhacks:*');
}


ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));

unregister();
