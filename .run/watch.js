#!/bin/env node

// watch <command> [...directory] [--wait=<seconds>] [--filter=<file>] [--interval=<seconds>] [--ignoreDotFiles] [--ignoreUnreadable]

const fs = require('fs');
const path = './src';
const encoding = 'utf8';

// Example when handled through fs.watch() listener
fs.watch(path, { encoding: 'buffer' }, (eventType, filename) => {
  if (filename) {
    // console.log(filename);
    let bufferA = Buffer.from('This is a buffer example.');
    console.log(bufferOne);
    // Prints: <Buffer ...>
  }
});

var watch_config = {
  persistent: true,
  recursive: false,
  encoding: 'utf8',
  filter: /\.json$/,
  // filter: f => !/node_modules/.test(f)
  delay: 5000,
};

// WATCH ALL PROJECT: SIMPLE
watch('./', { recursive: true }, console.log);

// watch(['file1', 'file2'], console.log);

// watch('file_or_dir', { recursive: true }, function(evt, name) {
//   console.log('%s changed.', name);
// });

// WATCH TASKS
fs.watch('./', watch_config, function(evt, name) {
  if (evt == 'update') {
    console.log('%s updateD', name);
  } else if (evt == 'remove') {
    console.log('%s remove', name);
  } else {
    console.log('%s changed.', name);
  }
});

fs.watchFile('message.text', (curr, prev) => {
  console.log(`the current mtime is: ${curr.mtime}`);
  console.log(`the previous mtime was: ${prev.mtime}`);
});

fs.watch('somedir', (eventType, filename) => {
  console.log(`event type is: ${eventType}`);
  if (filename) {
    console.log(`filename provided: ${filename}`);
  } else {
    console.log('filename not provided');
  }
});

fs.watch('./tmp', { encoding: 'buffer' }, (eventType, filename) => {
  if (filename) {
    console.log(filename);
    // Prints: <Buffer ...>
  }
});
