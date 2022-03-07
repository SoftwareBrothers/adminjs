"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const {
  babel
} = require('@rollup/plugin-babel');

const commonjs = require('@rollup/plugin-commonjs');

const {
  nodeResolve: resolve
} = require('@rollup/plugin-node-resolve');

const replace = require('@rollup/plugin-replace');

const json = require('@rollup/plugin-json');

const {
  terser
} = require('rollup-plugin-terser');

const external = ['lodash', 'react', 'react-dom', 'redux', 'react-redux', 'flat', 'react-router', 'react-router-dom', 'react-datepicker', 'styled-components', 'prop-types', 'adminjs', '@adminjs/design-system', 'adminjs/property-types', 'adminjs/types', 'adminjs/style', 'axios', 'recharts', '@carbon/icons-react', 'react-select', 'react-select/async', 'react-select/creatable', 'i18next', 'react-i18next', 'punycode', 'uuid'];
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
  adminjs: 'AdminJS',
  '@adminjs/design-system': 'AdminJSDesignSystem',
  'adminjs/property-types': 'AdminJS.PropertyTypes',
  'adminjs/types': 'AdminJS.types',
  'adminjs/style': 'AdminJS.style',
  i18next: 'i18n',
  'react-i18next': 'ReactI18Next',
  Quill: 'Quill',
  punycode: 'punycode'
};
const extensions = ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss'];

const plugins = ({
  babelConfig = {},
  commonJSConfig = {},
  minify = false
} = {}) => {
  const pluginStack = [resolve({
    extensions,
    mainFields: ['browser', 'main', 'module', 'jsnext:main'],
    preferBuiltins: false
  }), json(), // typescript(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.IS_BROWSER': 'true',
    'process.env.': 'AdminJS.env.',
    preventAssignment: true,
    'process.browser': true
  }), commonjs(_objectSpread({}, commonJSConfig)), babel(_objectSpread({
    extensions,
    babelrc: false,
    babelHelpers: 'bundled',
    exclude: 'node_modules/**/*.js',
    presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react'), require.resolve('@babel/preset-typescript')]
  }, babelConfig))];

  if (minify) {
    pluginStack.push(terser());
  }

  return pluginStack;
};

module.exports = {
  external,
  globals,
  plugins
};