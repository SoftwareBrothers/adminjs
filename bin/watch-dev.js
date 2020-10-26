/**
 * @private
 * @fileoverview
 * This script runs process, which bundles all frontend files to `app.bundle.js`.
 * It reruns whenever user changes something.
 */

const { default: runtime } = require('@babel/plugin-transform-runtime')
const { default: styled } = require('babel-plugin-styled-components')
const bundler = require('../src/backend/bundler/bundler')
const env = require('../src/backend/bundler/bundler-env')

const once = !!process.env.ONCE

async function build() {
  return bundler({
    name: 'AdminBro',
    input: `${__dirname}/../src/frontend/bundle-entry.jsx`,
    file: `${__dirname}/../src/frontend/assets/scripts/app-bundle.${env}.js`,
    minify: env === 'production',
    watch: !once,
    babelConfig: {
      plugins: [runtime, styled],
      babelHelpers: 'runtime',
      include: [
        'src/frontend/**',
        'src/locale/*',
        'src/utils/**',
        'src/backend/utils/view-helpers/view-helpers.ts',
        'src/backend/utils/filter/filter.ts',
        'src/backend/decorators/**',
      ],
    },
  })
}

build().catch((error) => {
  console.log(error)
  process.exit(1)
})
