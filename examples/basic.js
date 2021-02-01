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
      zoom: 10
    })
  });
  
  var opt_options = {
    // This proxy url is a public demo of CORS Anywhere, use it only for testing. 
    // For production deploy a custom instance (visit https://github.com/Rob--W/cors-anywhere/)
    // or use yor own proxy.
    urlProxy: 'https://cors-anywhere.herokuapp.com/',
    drone: 'mavic-2',
    country: 'AR',
    displayLevels: [2, 6, 1, 0, 3, 4, 7],
    activeLevels: [0, 1, 2, 3, 4, 6, 7],
    showPanel: true,
    language: 'en',
    startCollapsed: false,
    startActive: false,
    theme: 'light'
  };

  var djiGeozones = new DjiGeozones(map, opt_options);

  setTimeout(function(){
    djiGeozones.show();
  },4000)


  console.log(djiGeozones);

})();
