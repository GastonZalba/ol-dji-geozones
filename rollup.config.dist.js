import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from "@rollup/plugin-json";
import image from '@rollup/plugin-image';
import { terser } from "rollup-plugin-terser";
import CleanCss from 'clean-css';
import css from 'rollup-plugin-css-only';
import { writeFileSync } from 'fs';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete'
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

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
    'ol/extent': 'ol.extent',
    'ol/Observable': 'ol.Observable'
};

export default function (commandOptions) {
    return {
        input: 'src/ol-dji-geozones.ts',
        output: [
            {
                dir: 'dist',
                format: 'umd',
                name: 'DjiGeozones',
                globals: globals,
                sourcemap: true
            },
            !commandOptions.dev && {
                file: pkg.browser,
                format: 'umd',
                plugins: [terser()],
                name: 'DjiGeozones',
                globals: globals,
                sourcemap: true
            }
        ],
        plugins: [
            del({ targets: 'dist/*' }),
            typescript(
                {
                    outDir: './dist',
                    declarationDir: './dist',
                    outputToFilesystem: true
                }
            ),
            json(),
            resolve(),
            babel({
                babelrc: false,
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
                ],
                plugins: [
                    "@babel/plugin-transform-runtime"
                ]
            }),
            commonjs(),
            image(),
            css({
                output: function (styles, styleNodes) {
                    //mkdirSync('dist', { recursive: true });
                    writeFileSync('dist/ol-dji-geozones.css', styles)
                    if (!commandOptions.dev) {
                        const compressed = new CleanCss().minify(styles).styles;
                        writeFileSync('dist/ol-dji-geozones.min.css', compressed)
                    }
                }
            }),
            commandOptions.dev && serve({
                open: false,
                verbose: true,
                contentBase: ['', 'examples'],
                historyApiFallback: '/basic.html',
                host: 'localhost',
                port: 3000,
                // execute function after server has begun listening
                onListening: function (server) {
                    const address = server.address()
                    // by using a bound function, we can access options as `this`
                    const protocol = this.https ? 'https' : 'http'
                    console.log(`Server listening at ${protocol}://localhost:${address.port}/`)
                }
            }),
            commandOptions.dev && livereload({
                watch: ['src'],
                delay: 500
            })
        ],
        external: function (id) {
            // console.log('id', id);
            return /ol\//.test(id);
        }
    }
}