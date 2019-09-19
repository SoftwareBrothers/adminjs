/**
 * @private
 * @fileoverview
 * This script runs process, which bundles all frontend files to `app.bundle.js`.
 * It reruns whenever user changes something.
 */

const runtime = require('@babel/plugin-transform-runtime')
const styled = require('babel-plugin-styled-components')
const bundler = require('../src/backend/bundler/bundler')

async function build() {
  bundler({
    name: 'AdminBro',
    input: `${__dirname}/../src/frontend/bundle-entry.jsx`,
    file: `${__dirname}/../src/frontend/assets/scripts/app-bundle.js`,
    minify: true,
    // minify: false,
    watch: true,
    babelConfig: {
      plugins: [runtime, styled],
      runtimeHelpers: true,
      include: `${__dirname}/../src/frontend/**`,
    },
  })
}

build()
