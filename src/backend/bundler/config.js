/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { babel } = require('@rollup/plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve: resolve } = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')
const json = require('@rollup/plugin-json')
const { terser } = require('rollup-plugin-terser')


const external = [
  'lodash',
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'flat',
  'react-router',
  'react-router-dom',
  'react-datepicker',
  'styled-components',
  'prop-types',
  'admin-bro',
  '@admin-bro/design-system',
  'admin-bro/property-types',
  'admin-bro/types',
  'admin-bro/style',
  'axios',
  'recharts',
  '@carbon/icons-react',
  'react-select',
  'react-select/async',
  'react-select/creatable',
  'i18next',
  'react-i18next',
]

const globals = {
  lodash: 'Lodash',
  react: 'React',
  redux: 'Redux',
  axios: 'axios',
  flat: 'flat',
  recharts: 'Recharts',
  'react-select': 'ReactSelect',
  'react-select/async': 'ReactSelectAsync',
  'react-select/creatable': 'ReactSelectCreatable',
  '@carbon/icons-react': 'CarbonIcons',
  'react-datepicker': 'ReactDatepicker',
  'styled-components': 'styled',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'react-redux': 'ReactRedux',
  'react-router': 'ReactRouter',
  'react-router-dom': 'ReactRouterDOM',
  'admin-bro': 'AdminBro',
  '@admin-bro/design-system': 'AdminBroDesignSystem',
  'admin-bro/property-types': 'AdminBro.PropertyTypes',
  'admin-bro/types': 'AdminBro.types',
  'admin-bro/style': 'AdminBro.style',
  i18next: 'i18n',
  'react-i18next': 'ReactI18Next',
  Quill: 'Quill',
}

const extensions = ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']

const plugins = ({ babelConfig = {}, commonJSConfig = {}, minify = false } = {}) => {
  const pluginStack = [
    resolve({
      extensions,
      mainFields: ['main', 'module', 'jsnext:main'],
    }),
    json(),
    // typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.IS_BROWSER': 'true',
      'process.env.': 'AdminBro.env.',
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
        require.resolve('@babel/preset-env'),
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
