(function () {
  
  var map = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'map',
    view: new ol.View({
      projection: 'EPSG:3857',
      center: [-6503744, -4115148],
      zoom: 11
    })
  });
  
  var opt_options = {
    urlProxy: 'https://cors-anywhere.herokuapp.com/', // You can use the public demo CORS Anywhere for testing
    drone: 'mavic-2',
    country: 'AR',
    levelsToDisplay: [2, 6, 1, 0, 3, 4, 7],
    levelsActive: [0, 1, 2, 3, 4, 6, 7],
    showPanel: true,
    language: 'en'
  };

  new DjiGeozones(map, opt_options);

})();
