import { initMapScriptJs, vizScriptJs } from './maps-example';
import { mapdata } from './map-data.js';

function generateHackFileTemplate(key) {
  const _templates = {
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
