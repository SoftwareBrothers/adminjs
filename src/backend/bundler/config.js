/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve: resolve } = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')
const json = require('@rollup/plugin-json')
const { terser } = require('rollup-plugin-terser')

const external = [
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

const globals = {
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

const extensions = ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss']

const plugins = ({ babelConfig = {}, commonJSConfig = {}, minify = false } = {}) => {
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
        require.resolve('@babel/preset-env', {
          corejs: 3,
          useBuiltIns: 'usage',
        }),
        require.resolve('@babel/preset-react'),
        require.resolve('@babel/preset-typescript'),
      ],
      ...babelConfig,
    }),
  ]
  if (minify) {
    pluginStack.push(terser())
  }
  return pluginStack
}

module.exports = {
  external,
  globals,
  plugins,
}
