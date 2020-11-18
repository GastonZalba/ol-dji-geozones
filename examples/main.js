(function () {
    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            })],
        target: 'map',
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [-57.953497, -34.922232 ],
            zoom: 8
        }),
    });
    var djiGeozone = new DjiGeozone(map);
})();