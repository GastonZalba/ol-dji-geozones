import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from "@rollup/plugin-json";
import image from '@rollup/plugin-image';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete'
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import path from 'path';

const globals = (id) => {

    const globals = {}

    if (/ol(\\|\/)/.test(id)) {
        return id.replace(/\//g, '.').replace('.js', '');
    } else if (id in globals) {
        return globals[id];
    }

    return id;
}

export default function (commandOptions) {

    const outputs = [{
        input: 'src/ol-dji-geozones.ts',
        output: [
            {
                file: 'dist/ol-dji-geozones.js',
                format: 'umd',
                name: 'DjiGeozones',
                globals: globals,
                sourcemap: true
            },
            !commandOptions.dev && {
                file: 'dist/ol-dji-geozones.min.js',
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
            postcss({
                extensions: ['.css', '.sass', '.scss'],
                inject: commandOptions.dev,
                extract: commandOptions.dev ? false : path.resolve('dist/ol-dji-geozones.css'),
                config: {
                    path: './postcss.config.cjs',
                    ctx: {
                        isDev: commandOptions.dev ? true : false
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
    }];

    // Minified css
    if (!commandOptions.dev)
        outputs.push({
            input: path.resolve('dist/ol-dji-geozones.css'),
            plugins: [
                postcss({
                    extract: true,
                    minimize: true,
                    config: {
                        path: './postcss.config.cjs',
                        ctx: {
                            isDev: commandOptions.dev ? true : false
                        }
                    }
                }),
            ],
            output: {
                file: path.resolve('dist/ol-dji-geozones.min.css'),
            },
            onwarn(warning, warn) {
                if (warning.code === 'FILE_NAME_CONFLICT') return
                warn(warning)
            }
        });

    return outputs;
}