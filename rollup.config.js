import rollupBabel from 'rollup-plugin-babel';
import rollupResolve from 'rollup-plugin-node-resolve';
import rollupEslint from 'rollup-plugin-eslint';
import rollupCommonjs from 'rollup-plugin-commonjs';
import rollupUglify from 'rollup-plugin-uglify';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
  entry: 'src/main.js',
  dest: 'public/bundle.js',
  format: 'iife', // immediately-invoked function expression — suitable for <script> tags
  plugins: [
    rollupResolve({ jsnext: true }), // tells Rollup how to find date-fns in node_modules
    rollupCommonjs(), // converts date-fns to ES modules
    rollupEslint({ exclude: 'node_modules/**' }),
    rollupBabel({ exclude: 'node_modules/**' }),
    production && rollupUglify(), // minify, but only in production
  ],
  sourceMap: true,
};
