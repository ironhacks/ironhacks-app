
// / New project template
const indexHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Ironhacks project</title>
  <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet"/>
  <link rel="stylesheet" href="./css/main.css"/>
</head>
<body>
  <h1>IronHacks Project editor demo</h1>

  <h2>D3.js demo:</h2>

  <p>
    Bellow you will find a D3 demo, you can find all the JavaScript on the "visualization.js" file, in
    the "js" folder.
  </p>

  <p>
    This diagram shows the distribution of age groups in the United States over the last
    150 years. Use the arrow keys to observe the changing population. Data from the Minnesota
    Population Center. Use the arrow keys to change the displayed year. The blue bars are the
    male population for each five-year age bracket, while the pink bars are the female population;
    the bars are partially transparent so that you can see how they overlap, unlike the traditional
    side-by-side display which makes it difficult to compare the relative distribution of the sexes.
  </p>

  <a href="https://bl.ocks.org/mbostock/4062085">Click here to check the full d3.js example.</a>

  <svg id="d3Example"></svg>

  <h2>Google Maps demo</h2>

  <p>
    Below you will find a GoogleMaps demo, PLEASE DO NOT MODIFY the google API key, other wise you
     will have to provide your own key.
    <br/> You can find all the JavaScript on the "map.js" on the "js" folder.
  </p>

  <div id="googleMapContainer"></div>

  <script type="text/javascript" src="//d3js.org/d3.v3.min.js"></script>
  <script type="text/javascript" src="./js/main.js"></script>
  <script type="text/javascript" src="./js/visualization.js"></script>
  <script type="text/javascript" src="./js/map.js"></script>
  <!-- Google Maps -->
 <script async defer src="https://maps.googleapis.com/maps/api/js?key=<YOUR_PERSONAL_GOOGLE_MAPS_API_KEY>&callback=onGoogleMapResponse"></script>
</body>
</html>`;



const customScriptJs = `
  // Feel free to put your custom js here.
  console.log("Hello Ironhacks!")`;

const initMapScriptJs = `
  var map;
  function onGoogleMapResponse(){
    map = new google.maps.Map(document.getElementById('googleMapContainer'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
}`;



const vizScriptJs = `
  var el   = document.getElementById("d3Example");
  var rect = el.getBoundingClientRect();

  var margin = {top: 20, right: 40, bottom: 30, left: 20},
      width = rect.width - margin.left - margin.right,
      height = rect.height - margin.top - margin.bottom,
      barWidth = Math.floor(width / 19) - 1;

  var x = d3.scale.linear()
      .range([barWidth / 2, width - barWidth / 2]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("right")
      .tickSize(-width)
      .tickFormat(function(d) { return Math.round(d / 1e6) + "M"; });

  // An SVG element with a bottom-right origin.
  var svg = d3.select("#d3Example").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // A sliding container to hold the bars by birthyear.
  var birthyears = svg.append("g")
      .attr("class", "birthyears");

  // A label for the current year.
  var title = svg.append("text")
      .attr("class", "title")
      .attr("dy", ".71em")
      .text(2000);

  d3.csv("./data/population.csv", function(error, data) {

    // Convert strings to numbers.
    data.forEach(function(d) {
      d.people = +d.people;
      d.year = +d.year;
      d.age = +d.age;
    });

    // Compute the extent of the data set in age and years.
    var age1 = d3.max(data, function(d) { return d.age; }),
        year0 = d3.min(data, function(d) { return d.year; }),
        year1 = d3.max(data, function(d) { return d.year; }),
        year = year1;

    // Update the scale domains.
    x.domain([year1 - age1, year1]);
    y.domain([0, d3.max(data, function(d) { return d.people; })]);

    // Produce a map from year and birthyear to [male, female].
    data = d3.nest()
        .key(function(d) { return d.year; })
        .key(function(d) { return d.year - d.age; })
        .rollup(function(v) { return v.map(function(d) { return d.people; }); })
        .map(data);

    // Add an axis to show the population values.
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ",0)")
        .call(yAxis)
      .selectAll("g")
      .filter(function(value) { return !value; })
        .classed("zero", true);

    // Add labeled rects for each birthyear (so that no enter or exit is required).
    var birthyear = birthyears.selectAll(".birthyear")
        .data(d3.range(year0 - age1, year1 + 1, 5))
      .enter().append("g")
        .attr("class", "birthyear")
        .attr("transform", function(birthyear) { return "translate(" + x(birthyear) + ",0)"; });

    birthyear.selectAll("rect")
        .data(function(birthyear) { return data[year][birthyear] || [0, 0]; })
      .enter().append("rect")
        .attr("x", -barWidth / 2)
        .attr("width", barWidth)
        .attr("y", y)
        .attr("height", function(value) { return height - y(value); });

    // Add labels to show birthyear.
    birthyear.append("text")
        .attr("y", height - 4)
        .text(function(birthyear) { return birthyear; });

    // Add labels to show age (separate; not animated).
    svg.selectAll(".age")
        .data(d3.range(0, age1 + 1, 5))
      .enter().append("text")
        .attr("class", "age")
        .attr("x", function(age) { return x(year - age); })
        .attr("y", height + 4)
        .attr("dy", ".71em")
        .text(function(age) { return age; });

    // Allow the arrow keys to change the displayed year.
    window.focus();
    d3.select(window).on("keydown", function() {
      switch (d3.event.keyCode) {
        case 37: year = Math.max(year0, year - 10); break;
        case 39: year = Math.min(year1, year + 10); break;
      }
      update();
    });

    function update() {
      if (!(year in data)) return;
      title.text(year);

      birthyears.transition()
          .duration(750)
          .attr("transform", "translate(" + (x(year1) - x(year)) + ",0)");

      birthyear.selectAll("rect")
          .data(function(birthyear) { return data[year][birthyear] || [0, 0]; })
        .transition()
          .duration(750)
          .attr("y", y)
          .attr("height", function(value) { return height - y(value); });
    }
  });`;

const mapStyleCss = `body {
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


export {
  indexHtml,
  customScriptJs,
  initMapScriptJs,
  vizScriptJs,
  mapStyleCss,
}
