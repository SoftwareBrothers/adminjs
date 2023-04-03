/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import { rollup } from 'rollup'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import polyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'
import * as url from 'url'

import env from '../lib/backend/bundler/bundler-env.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const run = async () => {
  const inputOptions = {
    input: path.join(__dirname, '../lib/frontend/global-entry.js'),
    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.cjs', '.mjs', '.jsx', '.json', '.scss'],
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
      polyfills(),
      ...(env === 'production' ? [terser()] : []),
    ],
  }
  const bundle = await rollup(inputOptions)

  return bundle.write({
    format: 'iife',
    interop: 'auto',
    name: 'globals',
    globals: {
      react: 'React',
      redux: 'Redux',
      axios: 'axios',
      punycode: 'punycode',
      uuid: 'uuid',
      '@adminjs/design-system/styled-components': 'styled',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'react-redux': 'ReactRedux',
      'react-router': 'ReactRouter',
      'react-router-dom': 'ReactRouterDOM',
    },
    file: path.join(__dirname, `../lib/frontend/assets/scripts/global-bundle.${env}.js`),
  })
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.log(error)
  process.exit(1)
}).finally(() => {
  process.exit()
})
