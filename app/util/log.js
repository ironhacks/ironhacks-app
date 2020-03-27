import debug from 'debug';

const COLOURS = {
  trace: 'lightblue',
  info: 'cyan',
  warn: 'pink',
  error: 'red',
};


// Log Utility Class
class Log {
  // Set the prefix which will cause debug to enable the message
  generateMessage(level, message, source) {
    const BASE = 'ironhacks';
    const createDebug = debug(`${BASE}:${level}`);
    createDebug.color = COLOURS[level];

    if (source) {
      createDebug(source, message);
    } else {
      createDebug(message);
    }
  }

  trace(message, source) {
    return this.generateMessage('trace', message, source);
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
}

export default new Log();
