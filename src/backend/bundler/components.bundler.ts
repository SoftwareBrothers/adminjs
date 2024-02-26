import { InputOptions, OutputOptions } from 'rollup'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import * as commonjs from '@rollup/plugin-commonjs'
import * as replace from '@rollup/plugin-replace'
import * as json from '@rollup/plugin-json'
import { minify } from 'rollup-plugin-esbuild-minify'
import { babel } from '@rollup/plugin-babel'
import presetEnv from '@babel/preset-env'
import presetReact from '@babel/preset-react'
import presetTs from '@babel/preset-typescript'

import { AssetBundler } from './utils/asset-bundler.js'
import { COMPONENTS_ENTRY_PATH, COMPONENTS_OUTPUT_PATH, NODE_ENV } from './utils/constants.js'

const input: InputOptions = {
  input: COMPONENTS_ENTRY_PATH,
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
    babel({
      extensions: AssetBundler.DEFAULT_EXTENSIONS,
      babelrc: false,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**/*.js',
      presets: [
        [presetEnv, {
          targets: {
            node: '18',
          },
          loose: true,
          modules: false,
        }],
        presetReact,
        presetTs,
      ],
      plugins: ['@babel/plugin-syntax-import-assertions'],
    }),
    ...(NODE_ENV === 'production' ? [minify()] : []),
  ],
}

const output: OutputOptions = {
  name: 'AdminJSCustom',
  file: COMPONENTS_OUTPUT_PATH,
  inlineDynamicImports: true,
  globals: AssetBundler.DEFAULT_GLOBALS,
}

const bundler = new AssetBundler(input, output)

export default bundler
