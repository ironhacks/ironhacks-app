
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
    Below you will find a D3 demo, you can find all the JavaScript on the "visualization.js" file, in
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

const IndexHtmlTemplate = {
  name: 'index.html',
  path: '',
  blob: new Blob([indexHtml], { type: 'text/html' }),
}

export { IndexHtmlTemplate }
