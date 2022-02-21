/* eslint-disable import/no-extraneous-dependencies */
/**
 * @private
 * @fileoverview
 * This script runs process, which bundles all globals like React or ReactDOM
 * to the  `global-bundle.js`.
 */

const { rollup } = require('rollup')
const { nodeResolve: resolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const replace = require('@rollup/plugin-replace')
const json = require('@rollup/plugin-json')
const builtins = require('rollup-plugin-node-builtins')
const globals = require('rollup-plugin-node-globals')
const { terser } = require('rollup-plugin-terser')

const env = require('../src/backend/bundler/bundler-env')

const run = async () => {
  const inputOptions = {
    input: `${__dirname}/../src/frontend/global-entry.js`,
    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.jsx', '.json', '.scss'],
        mainFields: ['browser'],
        preferBuiltins: false,
        browser: true,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.IS_BROWSER': 'true',
        'process.stderr.fd': 'false',
        preventAssignment: true,
        'process.browser': true,
      }),
      json(),
      commonjs({
        include: ['node_modules/**', env === 'development' ? '../../node_modules/**' : ''],
        ignoreGlobal: true,
      }),
      globals(),
      builtins(),
      ...(env === 'production' ? [terser()] : []),
    ],
  }
  const bundle = await rollup(inputOptions)

  return bundle.write({
    format: 'iife',
    name: 'globals',
    globals: {
      react: 'React',
      redux: 'Redux',
      axios: 'axios',
      recharts: 'Recharts',
      punycode: 'punycode',
      uuid: 'uuid',
      'styled-components': 'styled',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'react-redux': 'ReactRedux',
      'react-router': 'ReactRouter',
      'react-router-dom': 'ReactRouterDOM',
    },
    file: `${__dirname}/../src/frontend/assets/scripts/global-bundle.${env}.js`,
  })
}

run().catch((error) => {
  console.log(error)
  process.exit(1)
}).finally(() => {
  process.exit()
})
