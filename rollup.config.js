import babel from '@rollup/plugin-babel';
import json from "@rollup/plugin-json";
import image from '@rollup/plugin-image';
import { writeFileSync } from 'fs';
import css from 'rollup-plugin-css-only';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete'
import path from 'path';

module.exports = {
    input: 'src/ol-dji-geozones.ts',
    output: [
        {
            dir: 'lib',
            format: 'es',
            sourcemap: true
        }
    ],
    plugins: [
        del({ targets: 'lib/*' }),
        typescript({
            outDir: './lib',
            declarationDir: './lib',
            outputToFilesystem: true
        }),
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
                writeFileSync('lib/ol-dji-geozones.css', styles)
            }
        })
    ],
    external: id => !(path.isAbsolute(id) || id.startsWith("."))
};