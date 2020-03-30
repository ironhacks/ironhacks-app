import terser from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';

const NODE_ENV = process.env.NODE_ENV;
const package_globals = [];
const package_external = package_globals;
const package_config = {
  format: 'esm',
  strict: true,
  compact: false,
  preferConst: true,
  uglify: NODE_ENV === 'PRODUCTION' ? true : false,
};

// CORE:
//  - dir, file, format, globals, name
// ADVANCED:
//  - assetFileNames, banner, compact, entryFileNames, extend, footer,
//  - interop, intro, outro, paths, sourcemap, sourcemapFile
// DANGER:
//  - esModule, exports, freeze, indent, namespaceToStringTag,
//  - noConflict, preferConst, strict
const module_list = [
{
    name: 'getPkg',
    path: './',
    dest: './build/',
    input: 'index.js',
    output: 'main.js',
    format: 'cjs',
    sourcemap: false,
    assets: false,
    watch: false,
},
// {
//   name: 'findUp',
//   path: './',
//   dest: './build/',
//   input: 'node_modules/find-up/index.js',
//   output: NODE_ENV === 'PRODUCTION' ? 'Test1.js' : 'test.js',
//   assets: false,
// }
];


// PLUGINS
// -------
const resolve_options = {
  mainFields: ['main'],
  extensions: ['.js'],
  preferBuiltins: false,
  browser: false,
  // customResolveOptions: {
  //   moduleDirectory: '',
  // },
  // dedupe: [],
  // jail: '/lib', // Default: '/'
  // only: [ 'some_module', /^@some_scope\/.*$/ ], // Default: null
  // modulesOnly: true, // Default: false
};

const commonjs_options = {
  include: ['find-up', 'pkg-up'],
  exclude: [],
  extensions: ['.js'],
  sourceMap: false,
  preferBuiltins: false,
  // namedExports: {
  //   'getPkg': ['find-up', 'pkg-up'],
  // },
  // ignoreGlobal: false,  // Default: false
  // preferBuiltins: true,
  // namedExports: {
  // './lib/render': ['render'],
  // },
  // ignore: [ 'conditional-runtime-dependency' ]
};

const terser_options = {
  // parse: {
  //  bare_returns: false,
  //  ecma: 8,
  //  shebang: true,
  // },
  compress: {
    arrows: true,
    arguments: true,
    booleans: true,
    ecma: 8,
    keep_fargs: true,
    keep_classnames: true,
    keep_fnames: true,
  },
  // mangle: {
  //   module: true,
  //   keep_classnames: false,
  //   keep_fnames: false,
  //   // toplevel: false,
  //   reserved: ['import', 'export', 'extends', 'StyleSheet','Component', 'class'],
  // },
  mangle: false,
  output: {
    indent_level: 2,
    braces: true,
    max_line_len: 200,
    semicolons: false,
    comments: false,
    beautify: true,
    // shebang: false,
  },
  // include: [],
  exclude: ['*.dev.js'],
  ecma: 8,
  toplevel: true,
  module: true,
};


var plugins = [ replace({'process.env.NODE_ENV': JSON.stringify(NODE_ENV)}),
  // babel({
  //   exclude:'node_modules/**',
  //   runtimeHelpers: false,
  // }),
  resolve(resolve_options),
  commonjs(commonjs_options)
];

if (NODE_ENV === 'PRODUCTION' && package_config.uglify) {
  plugins.push(terser.terser(terser_options));
}



var modules = [];
var config;
for (var mod of module_list) {
  console.log('modules', mod);
  config = {};
  config.input = mod.path + mod.input;
  config.output = {
    name: mod.name,
    file: mod.dest + mod.output,
    sourcemap: mod.sourcemap ? true : false,
    watch: mod.watch ? true : false,
    globals: mod.globals ? package_globals.concat(mod.globals) : package_globals,
    banner: mod.banner,
    strict: package_config.strict ? true : false,
    compact: package_config.compact ? true : false,
    format: package_config.format ? package_config.format : 'cjs',
    preferConst: package_config.preferConst ? true : false,
  };
  config.external = mod.external ? package_external.concat(mod.external) : package_external,
  config.plugins = plugins;
  if (mod.watch) {
    config.watch = mod.path;
  }
  modules.push(config);
}

export { modules as default };
