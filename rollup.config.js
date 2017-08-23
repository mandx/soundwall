import path from 'path';

// Rollup-related imports
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeBuiltins from 'rollup-plugin-node-builtins';

// PostCSS-related imports
import cssnano from 'cssnano';
import cssUrl from 'postcss-url';
import cssUrlCopy from 'postcss-url/src/type/copy';
import cssAutoprefixer from 'autoprefixer';
import cssPreCss from 'precss';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const NODE_ENV = process.env.NODE_ENV || (
  process.env.ROLLUP_WATCH ? 'development' : 'production');


function noop(){}


export default {
  entry: 'src/main.js',
  dest: 'public/bundle.js',
  format: 'iife', // immediately-invoked function expression — suitable for <script> tags
  plugins: [
    postcss({
      plugins: [
        cssPreCss(),
        cssAutoprefixer(),
        production ? cssnano() : noop,
        cssUrl({
          basePath: path.resolve(__dirname, 'src/'),  // base path to search assets from
          assetsPath: path.resolve(__dirname, 'public/'),  // dir to copy assets
          useHash: true,  // using hash names for assets (generates from asset content)
          url() {
            const url = cssUrlCopy(...arguments);
            return url && path.basename(url);
          },
        }),
      ],
      extract: true,
    }),
    eslint({ exclude: 'node_modules/**' }),
    babel({ exclude: 'node_modules/**', }),
    nodeGlobals(),
    nodeBuiltins(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
    resolve({ jsnext: true }),  // tells Rollup how to find date-fns in node_modules
    commonjs(),  // converts CJS to ES modules
    production && uglify(),  // minify, but only in production
  ],
  sourceMap: true,
};
