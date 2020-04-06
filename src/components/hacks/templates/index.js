import {
  indexHtml,
  customScriptJs,
  initMapScriptJs,
  vizScriptJs,
  mapStyleCss,
} from './maps-example';
import { mapdata } from './map-data.js';

function generateHackFileTemplate(key) {
  const _templates = {
    'indexhtml': {
      name: 'index.html',
      path: '',
      blob: new Blob([indexHtml], { type: 'text/html' }),
    },
    'mainscripts': {
      name: 'main.js',
      path: 'js/',
      blob: new Blob([customScriptJs], { type: 'text/javascript' }),
    },
    'mapscripts':  {
      name: 'map.js',
      path: 'js/',
      blob: new Blob([initMapScriptJs], { type: 'text/javascript' }),
    },
    'visyscripts': {
      name: 'visualization.js',
      path: 'js/',
      blob: new Blob([vizScriptJs], { type: 'text/javascript' }),
    },
    'mainstyles': {
      name: 'main.css',
      path: 'css/',
      blob: new Blob([mapStyleCss], { type: 'text/css' }),
    },
    'datafile': {
      name: 'population.csv',
      path: 'data/',
      blob: new Blob([mapdata], { type: 'text/csv' }),
    },
  };

  if (key in _templates) {
    return _templates[key];
  }
  return false;
}

export default generateHackFileTemplate;
