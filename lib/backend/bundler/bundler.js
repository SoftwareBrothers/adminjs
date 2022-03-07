"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const rollup = require('rollup');

const ora = require('ora');

const util = require('util');

const {
  external,
  globals,
  plugins
} = require('./config');

async function build({
  name,
  input,
  babelConfig = {},
  commonJSConfig = {},
  file,
  watch = false,
  minify
}) {
  const inputOptions = {
    input,
    plugins: plugins({
      babelConfig,
      minify,
      commonJSConfig
    }),
    external
  };
  const outputOptions = {
    format: 'iife',
    name,
    globals
  };

  if (file) {
    outputOptions.file = file;
  }

  if (!minify) {
    outputOptions.sourcemap = 'inline';
  }

  if (watch) {
    const bundle = await rollup.rollup(inputOptions);

    if (process.env.DEBUG_BUNDLER) {
      // eslint-disable-next-line no-console
      console.log(util.inspect(bundle.watchFiles, {
        maxArrayLength: null
      }));
    }

    const spinner = ora(`Bundling files in watchmode: ${JSON.stringify(inputOptions)}`);
    const watcher = rollup.watch(_objectSpread(_objectSpread({}, inputOptions), {}, {
      output: outputOptions
    }));
    watcher.on('event', event => {
      if (event.code === 'START') {
        spinner.start('Bundling files...');
      }

      if (event.code === 'ERROR' || event.code === 'FATAL') {
        spinner.fail('Bundle fail:'); // eslint-disable-next-line no-console

        console.log(event);
      }

      if (event.code === 'END') {
        spinner.succeed(`Finish bundling: ${bundle.watchFiles.length} files`);
      }
    });
    return watcher;
  }

  const bundle = await rollup.rollup(inputOptions);

  if (file) {
    return bundle.write(outputOptions);
  }

  const bundled = await bundle.generate(outputOptions);
  return bundled.output[0];
}

module.exports = build;