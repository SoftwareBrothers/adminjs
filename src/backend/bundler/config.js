/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const json = require('rollup-plugin-json')
const { terser } = require('rollup-plugin-terser')

const external = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'flat',
  'react-router',
  'react-router-dom',
  'react-datepicker',
  'styled-components',
  'styled-system',
  'prop-types',
  'admin-bro',
  // TODO remove next line in version 2.0, see comment in src/frontend/bundle-entry.jsx
  'admin-bro/components',
  'admin-bro/property-types',
  'admin-bro/types',
  'admin-bro/style',
  'axios',
  'recharts',
  '@carbon/icons-react',
  'react-select/lib/Async',
  'i18next',
  'react-i18next',
]

const globals = {
  react: 'React',
  redux: 'Redux',
  axios: 'axios',
  flat: 'flat',
  recharts: 'Recharts',
  'react-select/lib/Async': 'ReactSelect',
  '@carbon/icons-react': 'CarbonIcons',
  'react-datepicker': 'ReactDatepicker',
  'styled-components': 'styled',
  'styled-system': 'StyledSystem',
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
  i18next: 'i18n',
  'react-i18next': 'ReactI18Next',
}

const extensions = ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']

const plugins = ({ babelConfig = {}, commonJSConfig = {}, minify = false } = {}) => {
  const pluginStack = [
    resolve({
      extensions,
    }),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.IS_BROWSER': 'true',
      'process.env.': 'AdminBro.env.',
    }),
    commonjs({
      namedExports: {
        'node_modules/flat/index.js': ['flatten', 'unflatten'],
        '@material-ui/utils/node_modules/react-is': [
          'isValidElementType', 'isContextConsumer', 'isElement', 'ForwardRef',
        ],
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
