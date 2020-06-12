const styleCss = `body {
  font-family: 'Muli', sans-serif;
  padding: 20px;
}

h2 { margin-left: 30px; }

#d3Example p {
  padding: 30px;
  font-size: 18px;
  text-align: justify;
}

a { margin-left: 30px; }

svg {
  width: 100%;
  height: 500px;
  font: 10px sans-serif;
}

.y.axis path { display: none; }

.y.axis line {
  stroke: #fff;
  stroke-opacity: .2;
  shape-rendering: crispEdges;
}

.y.axis .zero line {
  stroke: #000;
  stroke-opacity: 1;
}

.title {
  font: 300 78px Helvetica Neue;
  fill: #666;
}

.birthyear { text-anchor: middle; }
.age { text-anchor: middle; }

.birthyear { fill: #fff; }

rect {
  fill-opacity: .6;
  fill: #e377c2;
}

rect:first-child { fill: #1f77b4; }

#googleMapContainer {
  width: 100%;
  height: 500px;
}
`;

const StyleCssTemplate = {
  name: 'main.css',
  path: 'css/',
  blob: new Blob([styleCss], { type: 'text/css' }),
};

export { StyleCssTemplate }
