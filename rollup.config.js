import babel from '@rollup/plugin-babel';
import json from "@rollup/plugin-json";

module.exports = {
    input: 'src/ol-dji-geozone.js',
    output: [
        {
            file: 'dist/ol-dji-geozone.js',
            format: 'umd',
            name: 'DjiGeozone',
            globals: {
                'ol/Map': 'ol.Map',
                'ol/source/Vector': 'ol.source.Vector',
                'ol/layer/Vector': 'ol.layer.Vector',
                'ol/geom': 'ol.geom',
                'ol/Feature': 'ol.Feature',
                'ol/style': 'ol.style',
                'ol/control': 'ol.control',
                'ol/proj': 'ol.proj',
                'ol/sphere': 'ol.sphere',
                'ol/color': 'ol.color'
            }
        }
    ],
    plugins: [
        json({
            compact: true
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**' // only transpile our source code
        })
    ],
    external: function (id) {
        console.log('id', id);
        return /ol\//.test(id);
    }
};