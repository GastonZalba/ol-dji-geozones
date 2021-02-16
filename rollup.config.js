import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import json from "@rollup/plugin-json";
import image from '@rollup/plugin-image';
import { mkdirSync, writeFileSync } from 'fs';
import css from 'rollup-plugin-css-only';

let globals = {
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
};

module.exports = {
    input: 'tmp-lib/ol-dji-geozones.js',
    output: [
        {
            file: pkg.module,
            format: 'es',
            name: 'DjiGeozones',
            globals: globals
        }
    ],
    plugins: [
        json(),
        image(),
        babel({            
            presets: [
                [
                    "@babel/preset-env",
                    {
                        "targets": {
                            "esmodules": true
                        }
                    }
                ]
                ],
            babelHelpers: 'bundled',
            exclude: ["node_modules/**", "src/assets/**"]
        }),
        css({
            output: function (styles, styleNodes) {
                mkdirSync('lib', { recursive: true });
                writeFileSync('lib/ol-dji-geozones.css', styles)
            }
        })
    ],
    external: function (id) {
        console.log('id', id);
        return /ol\//.test(id);
    }
};