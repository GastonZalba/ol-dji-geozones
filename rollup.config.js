import babel from '@rollup/plugin-babel';
import json from "@rollup/plugin-json";
import image from '@rollup/plugin-image';

module.exports = {
    input: 'tmp/ol-dji-geozones.js',
    output: [
        {
            file: 'dist/ol-dji-geozones.js',
            format: 'umd',
            name: 'DjiGeozones',
            globals: {
                'ol/Map': 'ol.Map',
                'ol/source/Vector': 'ol.source.Vector',
                'ol/layer/Vector': 'ol.layer.Vector',
                'ol/geom': 'ol.geom',
                'ol/geom/Polygon': 'ol.geom.Polygon',
                'ol/Feature': 'ol.Feature',
                'ol/Overlay': 'ol.Overlay',
                'ol/style': 'ol.style',
                'ol/control': 'ol.control',
                'ol/proj': 'ol.proj',
                'ol/sphere': 'ol.sphere',
                'ol/color': 'ol.color',
                'ol/extent' : 'ol.extent',
                'ol/Observable': 'ol.Observable'
            }
        }
    ],
    plugins: [
        json(),
        image(),
        babel({
            "babelHelpers": "bundled",
            "exclude": ["node_modules/**", "src/assets/**"]
        })
    ],
    external: function (id) {
        console.log('id', id);
        return /ol\//.test(id);
    }
};