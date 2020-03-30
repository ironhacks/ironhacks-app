import Reactotron, {trackGlobalErrors} from 'reactotron-react-js';
import apisaucePlugin from 'reactotron-apisauce';
import('react');

Reactotron
    .configure()
    .use(trackGlobalErrors())
    .use(apisaucePlugin())
    .connect(); // let's connect!
