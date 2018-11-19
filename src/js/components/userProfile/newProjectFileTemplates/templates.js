export const index = `<!DOCTYPE html>
  <html>
  <head>
    <title>Ironhacks project</title>
    <link rel="stylesheet" href="./css/main.css">
  </head>
  <body>
    <h1>Welcome To Ironhacks!</h1>
    <p>This is the Ironhacks editor, on the left you will find the editor, fell free to play with it!</p>
    <script src="./js/main.js"></script>
  </body>
</html>
`;

export const css = `/* Template file */
h1 {
  color: red;
}

p {
  color: blue;
}
`;

export const js = `console.log("You can add you custom js here.")
`;

export const indexBlob = {
  name: 'index.html',
  path: '',
  blob: new Blob([index], {type: 'text/html'})
};

export const cssBlob = {
  name: 'main.css',
  path: 'css/',
  blob: new Blob([css], {type: 'text/css'})
};

export const jsBlob = {
  name: 'main.js',
  path: 'js/',
  blob: new Blob([js], {type: 'text/javascript'})
};