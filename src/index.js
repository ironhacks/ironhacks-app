import {BrowserRouter} from 'react-router-dom';
import {unregister} from './serviceWorker';
import App from './app';
import { render } from 'react-snapshot';

if (process.env.NODE_ENV !== 'production') {
  window.__DEV__ = true;
} else {
  window.__DEV__ = false;
}

render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));

unregister();
