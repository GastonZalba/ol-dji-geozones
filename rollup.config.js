import babel from 'rollup-plugin-babel';

module.exports = {
    entry: 'src/ol-dji-geozone.js',
    targets: [
        {
            dest: 'dist/ol-dji-geozone.js',
            format: 'umd',
            moduleName: 'DjiGeozone'
        }
    ],
    plugins: [
        require('rollup-plugin-node-resolve')(),
        require('rollup-plugin-commonjs')(),
        require('rollup-plugin-node-builtins')(),
        require('rollup-plugin-node-globals')(),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        })
    ],
    external: function (id) {
        console.log('id', id);
        return /ol\//.test(id);
    },
    globals: {
        'ol/Map': 'ol.Map',
        'ol/source/Vector': 'ol.source.Vector',
        'ol/layer/Vector': 'ol.layer.Vector',
        'ol/geom/Point': 'ol.geom.Point',
        'ol/geom/Polygon': 'ol.geom.Polygon',   
        'ol/geom/Circle': 'ol.geom.Circle',     
        'ol/Feature': 'ol.Feature',
        'ol/style/Style': 'ol.style.Style',
        'ol/style/Fill': 'ol.style.Fill',
        'ol/style/Stroke': 'ol.style.Stroke',
        'ol/style/Icon': 'ol.style.Icon',
        'ol/control' : 'ol.control',
        'ol/proj': 'ol.proj',
        'ol/sphere': 'ol.sphere',
        'ol/color': 'ol.color'
    }
};