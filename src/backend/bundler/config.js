/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import presetEnv from '@babel/preset-env'
import presetReact from '@babel/preset-react'
import presetTs from '@babel/preset-typescript'

export const external = [
  'prop-types',
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'react-router',
  'react-router-dom',
  'styled-components',
  'adminjs',
  '@adminjs/design-system',
  '@carbon/icons-react',
]

export const globals = {
  react: 'React',
  redux: 'Redux',
  '@carbon/icons-react': 'CarbonIcons',
  'styled-components': 'styled',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  'react-redux': 'ReactRedux',
  'react-router': 'ReactRouter',
  'react-router-dom': 'ReactRouterDOM',
  adminjs: 'AdminJS',
  '@adminjs/design-system': 'AdminJSDesignSystem',
}

export const extensions = ['.mjs', '.cjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss']

export const plugins = async ({ babelConfig = {}, commonJSConfig = {}, minify = false } = {}) => {
  const pluginStack = [
    resolve({
      extensions,
      mainFields: ['browser', 'main', 'module', 'jsnext:main'],
      preferBuiltins: false,
    }),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.IS_BROWSER': 'true',
      'process.env.': 'AdminJS.env.',
      preventAssignment: true,
      'process.browser': true,
    }),
    commonjs({
      ...commonJSConfig,
    }),
    babel({
      extensions,
      babelrc: false,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**/*.js',
      presets: [
        presetEnv,
        presetReact,
        presetTs,
      ],
      ...babelConfig,
    }),
  ]
  if (minify) {
    pluginStack.push(terser())
  }
  return pluginStack
}
