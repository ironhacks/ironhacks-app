
const scriptJs = `
  // Feel free to put your custom js here.
  console.log("Hello Ironhacks!")`;

const ScriptJsTemplate = {
  name: 'main.js',
  path: 'js/',
  blob: new Blob([scriptJs], { type: 'text/javascript' }),
};

export { ScriptJsTemplate }
