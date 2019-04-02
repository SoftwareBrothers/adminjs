const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const plugin = require('@babel/plugin-transform-runtime')

async function build() {
  const inputOptions = {
    input: __dirname + '/../../frontend/app.jsx',
    plugins: [
      resolve({
        extensions: [ '.mjs', '.js', '.jsx', '.json' ],
      }),
      commonjs(),
      babel({
        presets: ['@babel/preset-react', '@babel/preset-env'],
        plugins: [plugin],
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

  const bundle = await rollup.rollup(inputOptions)

  const bundled = await bundle.generate({
    format: 'iife',
    globals: {
      'react': 'React',
      'redux': 'Redux',
      'react-dom': 'ReactDOM',
      'react-redux': 'ReactRedux',
      'react-router-dom': 'ReactRouterDOM',
      'axios': 'axios',
    }
  })
  return bundled.output[0].code
}

module.exports = build
