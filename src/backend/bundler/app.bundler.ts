import path from 'path'
import * as url from 'url'

import { InputOptions, OutputOptions } from 'rollup'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import * as commonjs from '@rollup/plugin-commonjs'
import * as replace from '@rollup/plugin-replace'
import * as json from '@rollup/plugin-json'
import { minify } from 'rollup-plugin-esbuild-minify'

import { AssetBundler } from './utils/asset-bundler.js'
import { NODE_ENV } from './utils/constants.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const input: InputOptions = {
  input: path.join(__dirname, '../../frontend/bundle-entry.js'),
  external: AssetBundler.DEFAULT_EXTERNALS,
  plugins: [
    resolve({
      extensions: AssetBundler.DEFAULT_EXTENSIONS,
      mainFields: ['browser', 'main', 'module', 'jsnext:main'],
      preferBuiltins: false,
    }),
    (json as any).default(),
    (replace as any).default({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.IS_BROWSER': 'true',
      'process.env.': 'AdminJS.env.',
      preventAssignment: true,
      'process.browser': true,
    }),
    (commonjs as any).default(),
    ...(NODE_ENV === 'production' ? [minify()] : []),
  ],
}

const output: OutputOptions = {
  name: 'AdminJS',
  file: path.join(__dirname, `../../frontend/assets/scripts/app-bundle.${NODE_ENV}.js`),
  inlineDynamicImports: true,
  globals: AssetBundler.DEFAULT_GLOBALS,
}

const bundler = new AssetBundler(input, output)

export default bundler
