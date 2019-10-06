/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const { terser } = require('rollup-plugin-terser')

const external = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'react-router',
  'react-router-dom',
  'styled-components',
  'prop-types',
  'admin-bro',
  // TODO remove next line in version 2.0, see comment in src/frontend/bundle-entry.jsx
  'admin-bro/components',
  'admin-bro/property-types',
  'admin-bro/types',
  'admin-bro/style',
  'axios',
  'recharts',
]

const globals = {
  react: 'React',
  redux: 'Redux',
  axios: 'axios',
  recharts: 'Recharts',
  'styled-components': 'styled',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'react-redux': 'ReactRedux',
  'react-router': 'ReactRouter',
  'react-router-dom': 'ReactRouterDOM',
  'admin-bro': 'AdminBro',
  'admin-bro/components': 'AdminBro.Components',
  'admin-bro/property-types': 'AdminBro.PropertyTypes',
  'admin-bro/types': 'AdminBro.types',
  'admin-bro/style': 'AdminBro.style',
}

const extensions = ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']

const plugins = ({ babelConfig = {}, commonJSConfig = {}, minify = false } = {}) => {
  const pluginStack = [
    resolve({
      extensions,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.IS_BROWSER': 'true',
      'process.env.': 'AdminBro.env.',
    }),
    commonjs({
      namedExports: {
        'node_modules/flat/index.js': ['flatten', 'unflatten'],
      },
      ...commonJSConfig,
    }),
    babel({
      extensions,
      babelrc: false,
      presets: [
        require.resolve('@babel/preset-react'),
        require.resolve('@babel/preset-env'),
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
