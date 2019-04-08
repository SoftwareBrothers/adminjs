const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')



async function build() {
  const inputOptions = {
    input: 'src/frontend/app.jsx',
    plugins: [
      resolve({
        extensions: [ '.mjs', '.js', '.jsx', '.json' ],
      }),
      commonjs(),
      babel({
        presets: ['@babel/preset-react', '@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime'],
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      })
    ],
    external: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-dom',
      'prop-types',
      'axios',
    ],
  }

  bundle = await rollup.rollup(inputOptions)

  console.log(bundle.watchFiles);

  b = await bundle.write({
    format: 'iife',
    file: 'src/frontend/assets/scripts/app.bundle2.js',
    globals: {
      'react': 'React',
      'redux': 'Redux',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'react-redux': 'ReactRedux',
      'react-router-dom': 'ReactRouterDOM',
      'axios': 'axios',
    }
  })

}

build().catch(e => console.log(e));