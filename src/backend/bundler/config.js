/* eslint-disable @typescript-eslint/explicit-function-return-type */
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

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

const plugins = ({ babelConfig = {}, commonJSConfig = {}, minify = false } = {}) => {
  const pluginStack = [
    resolve({
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.IS_BROWSER': 'true',
      'process.env.': 'AdminBro.env.',
    }),
    commonjs(commonJSConfig),
    babel({
      babelrc: false,
      presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-env')],
      ...babelConfig,
    }),
  ]
  if (minify) {
    pluginStack.push(terser())
  }
  return pluginStack
}

export {
  external,
  globals,
  plugins,
}
