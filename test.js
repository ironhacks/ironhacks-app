'use strict';// https://github.com/sindresorhus/pkg-up
// COMPILED INTO A SINGLE PAGKED
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const fsStat = promisify(fs.stat);
const fsLStat = promisify(fs.lstat);
const pAccess = promisify(fs.access);

const stop = Symbol('findUp.stop');
const typeMappings = {
  directory: 'isDirectory',
  file: 'isFile',
};

function checkType({type}) {
  if (type in typeMappings) {
    return;
  }

  throw new Error(`Invalid type specified: ${type}`);
}

const matchType = (type, stat) =>
  type === undefined || stat[typeMappings[type]]();

const pTry = (fn, ...arguments_) =>
  new Promise((resolve) => {
    resolve(fn(...arguments_));
  });

const pLimit = (concurrency) => {
  if (
    !(
      (Number.isInteger(concurrency) || concurrency === Infinity)
      && concurrency > 0
    )
  ) {
    return Promise.reject(
        new TypeError('Expected `concurrency` to be a number from 1 and up'),
    );
  }

  const queue = [];
  let activeCount = 0;

  const next = () => {
    activeCount--;

    if (queue.length > 0) {
      queue.shift()();
    }
  };

  const run = (fn, resolve, ...args) => {
    activeCount++;

    const result = pTry(fn, ...args);

    resolve(result);

    result.then(next, next);
  };

  const enqueue = (fn, resolve, ...args) => {
    if (activeCount < concurrency) {
      run(fn, resolve, ...args);
    } else {
      queue.push(run.bind(null, fn, resolve, ...args));
    }
  };

  const generator = (fn, ...args) =>
    new Promise((resolve) => enqueue(fn, resolve, ...args));
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount,
    },
    pendingCount: {
      get: () => queue.length,
    },
  });

  return generator;
};

class EndError extends Error {
  constructor(value) {
    super();
    this.value = value;
  }
}

const testElement = async (element, tester) => tester(await element);
const finder = async (element) => {
  const values = await Promise.all(element);
  if (values[1] === true) {
    throw new EndError(values[0]);
  }

  return false;
};

const pLocate = async (iterable, tester, options) => {
  options = {
    concurrency: Infinity,
    preserveOrder: true,
    ...options,
  };

  const limit = pLimit(options.concurrency);

  const items = [...iterable].map((element) => [
    element,
    limit(testElement, element, tester),
  ]);

  const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);

  try {
    await Promise.all(items.map((element) => checkLimit(finder, element)));
  } catch (error) {
    if (error instanceof EndError) {
      return error.value;
    }

    throw error;
  }
};

const locatePath = async (paths, options) => {
  options = {
    cwd: process.cwd(),
    type: 'file',
    allowSymlinks: true,
    ...options,
  };
  checkType(options);
  const statFn = options.allowSymlinks ? fsStat : fsLStat;

  return pLocate(
      paths,
      async (path_) => {
        try {
          const stat = await statFn(path.resolve(options.cwd, path_));
          return matchType(options.type, stat);
        } catch (_) {
          return false;
        }
      },
      options,
  );
};

const findUp = async (name, options = {}) => {
  let directory = path.resolve(options.cwd || '');
  const {root} = path.parse(directory);
  const paths = [].concat(name);

  const runMatcher = async (locateOptions) => {
    if (typeof name !== 'function') {
      return locatePath(paths, locateOptions);
    }

    const foundPath = await name(locateOptions.cwd);
    if (typeof foundPath === 'string') {
      return locatePath([foundPath], locateOptions);
    }

    return foundPath;
  };

  while (true) {
    const foundPath = await runMatcher({...options, cwd: directory});

    if (foundPath === stop) {
      return;
    }

    if (foundPath) {
      return path.resolve(directory, foundPath);
    }

    if (directory === root) {
      return;
    }

    directory = path.dirname(directory);
  }
};

const pkgUp = async ({cwd} = {}) => findUp('package.json', {cwd});

(async () => {
  console.log(await pkgUp());
})();