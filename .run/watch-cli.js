#!/usr/bin/env node

// var watch = require('node-watch');

const watch_src = process.argv[2] || './';

var watcher = require('node-watch')(watch_src, { recursive: true }, function(
  evt,
  name
) {
  return console.log('%s', name);
});

process.on('SIGINT', watcher.close);
process.on('SIGTERM', watcher.close);
