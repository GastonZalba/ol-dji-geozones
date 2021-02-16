import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from "@rollup/plugin-json";
import image from '@rollup/plugin-image';
import { terser } from "rollup-plugin-terser";
import CleanCss from 'clean-css';
import css from 'rollup-plugin-css-only';
import { mkdirSync, writeFileSync } from 'fs';

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
    input: 'tmp-dist/ol-dji-geozones.js',
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'DjiGeozones',
            globals: globals
        },
        {
            file: pkg.browser,
            format: 'umd',
            plugins: [terser()],
            name: 'DjiGeozones',
            globals: globals
        }
    ],
    plugins: [    
        json(),
        resolve(),
        commonjs(),
        babel({
            babelrc: false,
            plugins: ["@babel/plugin-transform-runtime"],
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
            presets: [
                [
                    '@babel/preset-env',
                    {                        
                        targets: {
                            browsers: [
                                "Chrome >= 52",
                                "FireFox >= 44",
                                "Safari >= 7",
                                "Explorer 11",
                                "last 4 Edge versions"
                            ]
                        }
                    }
                ]
            ]
        }),
        image(),
        css({
            output: function (styles, styleNodes) {
                mkdirSync('dist', { recursive: true });
                writeFileSync('dist/ol-dji-geozones.css', styles)
                const compressed = new CleanCss().minify(styles).styles;
                writeFileSync('dist/ol-dji-geozones.min.css', compressed)
            }
        })
    ],
    external: function (id) {
        console.log('id', id);
        return /ol\//.test(id);
    }
};