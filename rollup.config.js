import json from "@rollup/plugin-json";
import image from '@rollup/plugin-image';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete'
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import banner2 from 'rollup-plugin-banner2'
import { readFileSync } from 'fs';
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const banner =
`/*!
 * ${pkg.name} - v${pkg.version}
 * ${pkg.homepage}
 * Built: ${new Date()}
*/
`;

export default {
    input: 'src/ol-dji-geozones.ts',
    output: [
        {
            file: 'lib/ol-dji-geozones.js',
            format: 'es',
            sourcemap: true
        }
    ],
    plugins: [
        banner2(() => banner),
        del({ targets: 'lib/*' }),
        typescript({
            outDir: './lib',
            declarationDir: './lib',
            outputToFilesystem: true
        }),
        json(),
        image(),
        postcss({
            extensions: ['.css', '.sass', '.scss'],
            extract: path.resolve('lib/style/css/ol-dji-geozones.css'),
            config: {
                path: './postcss.config.cjs',
                ctx: {
                    isDev: false
                }
            }
        }),
        copy({
            targets: [
                { src: 'src/assets/scss', dest: 'lib/style' }
            ]
        })
    ],
    external: id => !(path.isAbsolute(id) || id.startsWith("."))
};