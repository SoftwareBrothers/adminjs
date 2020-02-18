/**
 * @private
 * @fileoverview
 * This script runs process, which bundles all frontend files to `app.bundle.js`.
 * It reruns whenever user changes something.
 */

const runtime = require('@babel/plugin-transform-runtime')
const styled = require('babel-plugin-styled-components')
const bundler = require('../src/backend/bundler/bundler')
const env = require('../src/backend/bundler/bundler-env')

const once = !!process.env.ONCE

async function build() {
  bundler({
    name: 'AdminBro',
    input: `${__dirname}/../src/frontend/bundle-entry.jsx`,
    file: `${__dirname}/../src/frontend/assets/scripts/app-bundle.${env}.js`,
    minify: env === 'production',
    watch: !once,
    babelConfig: {
      plugins: [runtime, styled],
      runtimeHelpers: true,
      include: [
        `${__dirname}/../src/frontend/**`,
        `${__dirname}/../src/locale/*`,
        `${__dirname}/../src/utils/*`,
        `${__dirname}/../src/backend/utils/view-helpers.ts`,
        `${__dirname}/../src/backend/utils/filter.ts`,
        `${__dirname}/../src/backend/decorators/**`,
      ],
    },
  })
}

build()
