import debug from 'debug';

const COLORS = {
  trace: 'lightblue',
  info: 'cyan',
  warn: 'pink',
  error: 'red',
};


// Log Utility Class
class Log {

  // Set the prefix which will cause debug to enable the message
  generateMessage(level, message, source) {
    const BASE = 'ironhacks ';
    const createDebug = debug(`${BASE}:${level}`);
    createDebug.color = COLORS[level];

    if (source) {
      createDebug(source, message);
    } else {
      createDebug(message);
    }
    console.log(`[${BASE}${source}] ${message}`);
  }

  info(message, source) {
    return this.generateMessage('info', message, source);
  }

  warn(message, source) {
    return this.generateMessage('warn', message, source);
  }

  error(message, source) {
    return this.generateMessage('error', message, source);
  }

  trace(moduleName, caller, ...args) {
    if (process.env.NODE_ENV !== 'production') {
      return console.log(`[${moduleName.toUpperCase()}] (${caller})`, args);
    }
  }
}

export default new Log();
