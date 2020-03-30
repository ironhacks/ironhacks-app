/**
 *  ROLLUP DYNAMIC CONFIG SCRIPT
 */


// ============================================================================
// IMPORT PLUGINS
// ============================================================================
import filesize from 'rollup-plugin-filesize';
import cleanup from 'rollup-plugin-cleanup';
import uglify from 'rollup-plugin-uglify';
import html from 'rollup-plugin-html';


// ============================================================================
// IMPORT MODULES
// ============================================================================
// import { module as Markdown } from './source/modules//config.module.js';
// import { module as Utility } from './source/modules/utilities/config.module.js';
import {module as Main} from './src/modules/main/config.module.js';
import {module as Options} from './src/modules/options/config.module.js';
import {module as Popup} from './src/modules/popup/config.module.js';


// ============================================================================
// IMPORT CONFIG
// ============================================================================
import * as PKG_CONFIG from './package.json';

// import copy from 'rollup-plugin-copy-assets';
// import copy from 'rollup-plugin-copy';
const fs = require('fs');


// ============================================================================
// SETUP
// ============================================================================
const BUILD_ENV = process.env.BUILD;

const MOD_PATH = './src/modules/';
const MOD_FILE = 'config.module.js';
const MOD_DEST = './build/';

const DEPLOY_DEST = './releases/campaign-manager' + '-v' + PKG_CONFIG.version + '/';


// ============================================================================
// BUNDLE PRE BUILD SCRIPT
// ============================================================================
const cleanup_options = {
  comments: 'none',
  maxEmptyLines: 1,
  extensions: ['.js'],
};

const html_options = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  conservativeCollapse: true,
  minifyJS: true,
};

const bundle = [];
const all_assets = [];

// ============================================================================
// REQUIRED MODULE LIST
// ============================================================================
const mods = [
  Main,
  Options,
  Popup,
  // Utility
];

for (const mod of mods ) {
  var config = {};
  config.input = MOD_PATH + mod.name + '/' + mod.input;
  config.output = {
    name: mod.name,
    file: MOD_DEST + mod.output,
    format: mod.format,
    sourcemap: mod.sourcemap,
  };

  // --------------------------------------------------------------------------
  // PLUGINS
  // --------------------------------------------------------------------------
  const pluginArr = [];

  // --------------------------------------------------------------------------
  pluginArr.push(filesize());

  // --------------------------------------------------------------------------
  pluginArr.push(cleanup(cleanup_options));

  if (mod.assets) {
    const asset_paths = [];
    var asset;
    for ( asset of mod.assets ) {
      console.log('assets', asset);
      var asset_src = MOD_PATH + mod.name + '/' + asset;
      var asset_dest = MOD_DEST + asset;
    }

    fs.copyFile(asset_src, asset_dest, (err) => {
      if (err) throw err;
      console.log(asset_src + ' was copied to ' + asset_dest);
    });
  }

  if (mod.html) {
    console.log('html', mod.html);
    pluginArr.push(html({
      include: mod.html,
      htmlMinifierOptions: html_options,
    }));
  }

  // --------------------------------------------------------------------------
  if (BUILD_ENV === 'production') {
    pluginArr.push(uglify());
  }

  config.plugins = pluginArr;

  // if (mod.watch) {
  //   config.watch = MOD_PATH + mod.name + '/' + mod.watch;
  // }

  bundle.push(config);
}


// ----------------------------------------------------------------------------
if (process.env.ROLLUP_COPY_DEPENDENCIES) {
  if (! fs.existsSync('./build/assets/styles')) {
    fs.mkdir('./build/assets/styles', {recursive: true}, (err) => {
      if (err) throw err;
    });
  }

  if (! fs.existsSync('./build/assets/scripts')) {
    fs.mkdir('./build/assets/scripts', {recursive: true}, (err) => {
      if (err) throw err;
    });
  }

  all_assets.push({src: './assets/bootstrap/bootstrap.min.css', dest: './build/assets/styles/bootstrap.min.css'});
  all_assets.push({src: './assets/bootstrap/bootstrap.min.js', dest: './build/assets/scripts/bootstrap.min.js'});
  all_assets.push({src: './assets/flat-ui/flat-ui.min.css', dest: './build/assets/styles/flat-ui.min.css'});
  all_assets.push({src: './assets/flat-ui/flat-ui-checkbox.js', dest: './build/assets/scripts/flat-ui-checkbox.js'});
  all_assets.push({src: './assets/jquery/jquery-1.8.3.min.js', dest: './build/assets/scripts/jquery-1.8.3.min.js'});
  all_assets.push({src: './assets/styles/panel.css', dest: './build/assets/styles/panel.css'});

  // all_assets.push(PKG_CONFIG.assets);
  for (asset of all_assets) {
    console.log('asset', asset);
    fs.copyFile(asset.src, asset.dest, (err) => {
      if (err) throw err;
      console.log(asset.src + ' was copied to ' + asset.dest);
    });
  }
}

// ----------------------------------------------------------------------------
if (process.env.ROLLUP_DEBUG) {
  console.log('DEPLOY_DEST', DEPLOY_DEST);
  console.log('asset_paths', all_assets);
  console.log('config.plugins', config.plugins);
}


export {bundle as default};
