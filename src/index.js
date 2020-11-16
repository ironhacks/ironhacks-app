import ReactDOM from 'react-dom'
import {unregister} from './serviceWorker'
import App from './app'

ReactDOM.render(<App/>, document.getElementById('root'))
unregister()
