/**
 *  ROLLUP MANUAL CONFIG SCRIPT
 */


// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy-assets';
import pkg from './package.json';
import filesize from 'rollup-plugin-filesize';
import cleanup from 'rollup-plugin-cleanup';


// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const BUILD_ENV = process.env.BUILD;

var module_source = './source/modules/';
var package_basepath = './dist/chrome-devtools' + '-' + pkg.version + '/';

export default [
  {
    // MAIN
    input: module_source + 'main/devtools.js',
    output: {
      name: 'main',
      file: package_basepath + 'devtools.js',
      format: 'umd'
    },
    plugins: [
      filesize(),
      copy({
        assets:[
          module_source + 'main/manifest.json',
          module_source + 'main/package.json',
          module_source + 'main/devtools.js',
          module_source + 'main/devtools.html',
          module_source + 'main/background.js',
          module_source + 'main/images/',
          module_source + 'main/lib/fonts/',
          module_source + 'main/styles/',
          module_source + 'main/lib/bootstrap4/bootstrap.min.js',
          module_source + 'main/lib/bootstrap4/bootstrap.css',
          module_source + 'main/lib/flatui-theme/flat-ui.css',
          module_source + 'main/lib/flatui-theme/flat-ui-checkbox.js',
          module_source + 'main/lib/jquery/jquery-1.8.3.min.js'
        ]
      }),
      (BUILD_ENV === 'production' && uglify()),
    ],
  },
  {
    // PANEL
    input: module_source + 'panel/index.js',
    output: {
      name: 'panel',
      file: package_basepath + 'panel/panel.js',
      format: 'umd'
    },
    sourcemap: true,
    plugins: [
      filesize(),
      cleanup({
        comments: 'none',
        maxEmptyLines: 3,
        extensions: ['.js']
      }),
      copy({
        assets:[
          module_source + 'panel/panel.html'
        ]
      }),
      (BUILD_ENV === 'production' && uglify()),
    ],
    watch: {
      include: module_source + 'panel/**/*.js'
    }
  },
  {
    // MARKDOWN TOOLS
    input: module_source + 'markdown_tools/index.js',
    output: {
      name: 'markdown_tools',
      file: package_basepath + '/markdown_tools.js',
      format: 'umd'
    },
    sourcemap: true,
    plugins: [
      filesize(),
      cleanup({
        comments: 'none',
        maxEmptyLines: 3,
        extensions: ['.js']
      }),
      (BUILD_ENV === 'production' && uglify()),
    ],
    watch: {
      include: module_source + 'markdown_tools/**/*.js'
    }
  },
  {
    // INSPECTOR
    input: module_source + 'dom_inspector/index.js',
    output: {
      name: 'dom_inspector',
      file: package_basepath + 'inspector/inspector.js',
      format: 'umd'
    },
    sourcemap: true,
    plugins: [
      filesize(),
      cleanup({
        comments: 'none',
        maxEmptyLines: 3,
        extensions: ['.js']
      }),
      (BUILD_ENV === 'production' && uglify()),
    ],
    watch: {
      include: module_source + 'dom_inspector/**/*.js'
    }
  }
];
