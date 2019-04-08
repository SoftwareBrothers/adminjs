const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const plugin = require('@babel/plugin-transform-runtime')

async function build() {
  const inputOptions = {
    input: __dirname + '/../../frontend/app.jsx',
    plugins: [
      resolve({
        extensions: [ '.mjs', '.js', '.jsx', '.json' ],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      commonjs(),
      babel({
        presets: ['@babel/preset-react', '@babel/preset-env'],
        plugins: [plugin],
        runtimeHelpers: true,
        include: __dirname + '/../../frontend/**',
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
      'prop-types': 'PropTypes',
      'react-redux': 'ReactRedux',
      'react-router': 'ReactRouter',
      'react-router-dom': 'ReactRouterDOM',
      'axios': 'axios',
    }
  })
  return bundled.output[0].code
}

module.exports = build
