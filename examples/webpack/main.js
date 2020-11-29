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
        center: [0, 0],
        zoom: 2,
    }),
});

const opt_options = {
    urlProxy: 'https://cors-anywhere.herokuapp.com/', // You can use the public demo CORS Anywhere for testing
    drone: 'mavic-2',
    country: 'AR',
    levelsToDisplay: [2, 6, 1, 0, 3, 4, 7],
    levelsActive: [0, 1, 2, 3, 4, 6, 7],
    showPanel: true,
    language: 'en'
};

new DjiGeozones(map, opt_options);