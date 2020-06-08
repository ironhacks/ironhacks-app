import Reactotron, {trackGlobalErrors} from 'reactotron-react-js';
import apisaucePlugin from 'reactotron-apisauce';
import { fireApi } from './services/fire-api';

if ( process.env.REACT_APP_REACTOTRON && process.env.NODE_ENV !== 'production') {

  Reactotron
      .configure()
      .use(trackGlobalErrors())
      .use(apisaucePlugin({
          ignoreContentTypes: /^(image)\/.*$/i
      }))
      .use(apisaucePlugin())
      .connect();

    Reactotron.clear()
    Reactotron.warn('start*')
    fireApi.addMonitor(Reactotron.apisauce)
    console.tron = Reactotron

    // OR ONLY TRACK 500 ERRORS
    // fireApi.addMonitor(response => {
    //   if (response.problem === 'SERVER_ERROR') Reactotron.apisauce(response)
    // })

}
