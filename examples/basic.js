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
    // You must use a proxy url to avoid CORS restrictions.
    // For testing, you can run `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security` to
    // use a Google Chrome instance with CORS disabled.
    // In this example, allOrigins is a free and open source javascript (use it only for testing) 
    // For production deploy a custom instance or use yor own proxy.
    urlProxy: 'https://api.allorigins.win/raw?url=',
    buffer: 10000,
    drone: 'mavic-2',
    country: 'AR',
    displayLevels: [2, 6, 1, 0, 3, 4, 7],
    activeLevels: [0, 1, 2, 3, 4, 6, 7],
    createPanel: 'full',
    language: 'en',
    startCollapsed: false,
    theme: 'light',
    i18n: {
      labels: {
        djiGeoZones: 'My Geozones'
      }
    }
  };

  var djiGeozones = new DjiGeozones(opt_options);
  map.addControl(djiGeozones);

  djiGeozones.on('error', (err) => {
    alert('An error ocurred: ' + err.message);
    console.log(err)
  });
})();
