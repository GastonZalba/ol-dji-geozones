(function () {
    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            })],
        target: 'map',
        view: new ol.View({
            projection: 'EPSG:3857',
            center: [-6731501,-4403268 ],
            zoom: 7
        }),
    });
    var djiGeozone = new DjiGeozone(map);
})();