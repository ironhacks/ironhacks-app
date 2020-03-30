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
  blob: new Blob([index], {type: 'text/html'}),
};

export const ContestCssBlob = {
  name: 'main.css',
  path: 'css/',
  blob: new Blob([css], {type: 'text/css'}),
};

export const jsBlob = {
  name: 'main.js',
  path: 'js/',
  blob: new Blob([js], {type: 'text/javascript'}),
};

// Contest Template:

export const contestIndex = `<!DOCTYPE html>
<html>
<head>
  <title>UNAL-Ironhacks fall 2018</title>
</head>
<body>
  <nav>
    <a href="./map.html">Map section</a>
    <a href="./analytical.html">Analitical section</a>
    <a href="./visualization.html">Visualization section</a>
    <a href="./integration.html">Integration section</a>
  </nav>
</body>
</html>`;

export const contestAnalitycal = `<!DOCTYPE html>
<html>
<head>
  <title>Analitics</title>
</head>
<body>
  <h1>Analitics</h1>
</body>
</html>`;

export const contestMap = `<!DOCTYPE html>
<html>
<head>
  <title>Map Integration</title>
</head>
<body>
  <h1>Map Delvelop</h1>
</body>
</html>`;

export const contestVisualization = `<!DOCTYPE html>
<html>
<head>
  <title>Analitics</title>
</head>
<body>
  <h1>Analitics</h1>
</body>
</html>`;

export const contestIntegration = `<!DOCTYPE html>
<html>
<head>
  <title>Analitics</title>
</head>
<body>
  <h1>Analitics</h1>
</body>
</html>`;

export const contestMainJS = `console.log("You can add you custom js here.")
`;

export const contestMainCss = `/* Template file */
h1 {
  color: red;
}

p {
  color: blue;
}
`;

export const contestIndexBlob = {
  name: 'index.html',
  path: '',
  blob: new Blob([contestIndex], {type: 'text/html'}),
};

export const contestAnalitycalBlob = {
  name: 'analitycal.html',
  path: '',
  blob: new Blob([contestAnalitycal], {type: 'text/html'}),
};

export const contestMapBlob = {
  name: 'map.html',
  path: '',
  blob: new Blob([contestMap], {type: 'text/html'}),
};

export const contestVisualizationBlob = {
  name: 'visualization.html',
  path: '',
  blob: new Blob([contestVisualization], {type: 'text/html'}),
};

export const contestIntegrationBlob = {
  name: 'integration.html',
  path: '',
  blob: new Blob([contestIntegration], {type: 'text/html'}),
};

export const cssBlob = {
  name: 'main.css',
  path: 'css/',
  blob: new Blob([css], {type: 'text/css'}),
};

export const contestJsBlob = {
  name: 'main.js',
  path: 'js/',
  blob: new Blob([contestMainJS], {type: 'text/javascript'}),
};

export const contestMapJsBlob = {
  name: 'map.js',
  path: 'js/',
  blob: new Blob([contestMainJS], {type: 'text/javascript'}),
};

export const contestIntegrationJsBlob = {
  name: 'integration.js',
  path: 'js/',
  blob: new Blob([contestMainJS], {type: 'text/javascript'}),
};

export const contestAnalitycalJsBlob = {
  name: 'analitycal.js',
  path: 'js/',
  blob: new Blob([contestMainJS], {type: 'text/javascript'}),
};

export const contestVisualizationJsBlob = {
  name: 'visualization.js',
  path: 'js/',
  blob: new Blob([contestMainJS], {type: 'text/javascript'}),
};
