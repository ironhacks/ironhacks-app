// extends: [
//     "plugin:prettier/recommended"
//   ],
// plugins: [
// 'eslint-comments',
// 'import',
// 'react',
// 'react-hooks',
// 'react-native',
// 'jest',
// 'prettier',
// ],
// settings: {
//   react: {
//     version: 'detect'
//   }
// },
// overrides: [
//   { files: [ '*.js' ],
//     parser: 'babel-eslint',
//     plugins: [ 'flowtype' ],
//     rules: {
//       'flowtype/define-flow-type': 1,
//       'flowtype/use-flow-type': 1
//       }
//     },
//   {
//     files: [ '*.ts', '*.tsx' ],
//     parser: '@typescript-eslint/parser',
//     plugins: [ '@typescript-eslint/eslint-plugin' ],
//     rules: {
//       '@typescript-eslint/no-unused-vars': [
//         'error',
//         {argsIgnorePattern: '^_' }
//       ],
//       'no-unused-vars': 'off',
//     },
//   },
//   {
//     files: [ '*.{spec,test}.{js,ts,tsx}', '**/__tests__/**/*.{js,ts,tsx}' ],
//     env: {
//       jest: true,
//       'jest/globals': true }
//   }
// ],
//  globals:   {
//    __DEV__: true,
//   __dirname: false,
//   __fbBatchedBridgeConfig: false,
//   alert: false,
//   cancelAnimationFrame: false,
//   cancelIdleCallback: false,
//   clearImmediate: true,
//   clearInterval: false,
//   clearTimeout: false,
//   console: false,
//   document: false,
//   escape: false,
//   Event: false,
//   EventTarget: false,
//   exports: false,
//   fetch: false,
//   FormData: false,
//   global: false,
//   Map: true,
//   module: false,
//   navigator: false,
//   process: false,
//   Promise: true,
//   requestAnimationFrame: true,
//   requestIdleCallback: true,
//   require: false,
//   Set: true,
//   setImmediate: true,
//   setInterval: false,
//   setTimeout: false,
//   window: false,
//   XMLHttpRequest: false,
// },


module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'google',
    'react-app'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    "operator-linebreak": ["error", "before"],
    "max-len": [
      "error",
      {
        "code": 160,
        "tabWidth": 2,
        "ignoreUrls": true,
        "ignoreComments": true,
        "ignoreTrailingComments": false,
      },
    ],
     "require-jsdoc": [
       "error", {
        "require": {
          "FunctionDeclaration": false,
          "FunctionExpression": false,
          "MethodDefinition": false,
          "ClassDeclaration": false,
          "ArrowFunctionExpression": false,
        }
      }
    ]
  }
};
