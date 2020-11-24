(function () {

    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            })],
        target: 'map',
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [-6731501, -4403268],
            zoom: 12
        }),
    });

    var opt_options = {
        drone: 'mavic-2',
        country: 'AR',
        levelsToDisplay: [2, 6, 1, 0, 3, 4, 7],
        levelsActive: [1, 2, 4, 6, 7],
        control: true, // Create or not the control
        targetControl: null // {HTMLElement | string} Optional Element to create the control outside the map
    }

    let url_proxy = 'https://cors-anywhere.herokuapp.com/'; // You can use the public demo CORS Anywhere for testing

    var djiGeozone = new DjiGeozones(map, url_proxy, opt_options);

})();