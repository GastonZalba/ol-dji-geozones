import babel from '@rollup/plugin-babel';
import json from "@rollup/plugin-json";

module.exports = {
    input: 'src/ol-dji-geozones.js',
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
                'ol/extent' : 'ol.extent'
            }
        }
    ],
    plugins: [
        json(),
        babel({
            "babelHelpers": "bundled",
            "exclude": "node_modules/**" // only transpile our source code
        })
    ],
    external: function (id) {
        console.log('id', id);
        return /ol\//.test(id);
    }
};