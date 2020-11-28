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
    drone: 'mavic-2',
    country: 'AR',
    levelsToDisplay: [2, 6, 1, 0, 3, 4, 7],
    levelsActive: [1, 2, 4, 6, 7],
    showPanel: true,
    targetPanel: null,
    language: 'en'
  };

  let url_proxy = 'https://cors-anywhere.herokuapp.com/'; // You can use the public demo CORS Anywhere for testing

  new DjiGeozones(map, url_proxy, opt_options);
})();
