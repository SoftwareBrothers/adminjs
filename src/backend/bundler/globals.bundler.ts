import path from 'path'
import * as url from 'url'

import { InputOptions, OutputOptions } from 'rollup'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import * as commonjs from '@rollup/plugin-commonjs'
import * as replace from '@rollup/plugin-replace'
import * as json from '@rollup/plugin-json'
import * as polyfills from 'rollup-plugin-polyfill-node'
import { minify } from 'rollup-plugin-esbuild-minify'

import { AssetBundler } from './utils/asset-bundler.js'
import { NODE_ENV } from './utils/constants.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const input: InputOptions = {
  input: path.join(__dirname, '../../frontend/global-entry.js'),
  plugins: [
    resolve({
      extensions: AssetBundler.DEFAULT_EXTENSIONS,
      mainFields: ['browser'],
      preferBuiltins: false,
      browser: true,
    }),
    (replace as any).default({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.IS_BROWSER': 'true',
      'process.stderr.fd': 'false',
      preventAssignment: true,
      'process.browser': true,
    }),
    (json as any).default(),
    (commonjs as any).default(),
    (polyfills as any).default(),
    ...(NODE_ENV === 'production' ? [minify()] : []),
  ],
}

const output: OutputOptions = {
  name: 'globals',
  inlineDynamicImports: true,
  file: path.join(__dirname, `../../frontend/assets/scripts/global-bundle.${NODE_ENV}.js`),
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
}

const bundler = new AssetBundler(input, output)

export default bundler
