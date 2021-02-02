import 'ol/ol.css';
import 'ol-dji-geozones/dist/ol-dji-geozones.css';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';

import DjiGeozones from 'ol-dji-geozones';

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        })
    ],
    target: 'map',
    view: new View({
        projection: 'EPSG:3857',
        center: [-6503744, -4115148],
        zoom: 11
    }),
});

const opt_options = {
    // urlProxy: 'https://myserver.com/proxyendpoint/',
    drone: 'mavic-2',
    country: 'AR',
    displayLevels: [2, 6, 1, 0, 3, 4, 7],
    activeLevels: [0, 1, 2, 3, 4, 6, 7],
    createPanel: true,
    language: 'en'
};

new DjiGeozones(map, opt_options);