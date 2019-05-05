const runtime = require('@babel/plugin-transform-runtime')
const styled = require('babel-plugin-styled-components')
const fs = require('fs')
const util = require('util')
const path = require('path')

const bundler = require('./bundler')

const OUTPUT_FILE = path.join(__dirname, '/../../frontend/assets/scripts/app-bundle.js')

async function build() {
  const exists = await util.promisify(fs.exists)(OUTPUT_FILE)
  if (exists) {
    return util.promisify(fs.readFile)(OUTPUT_FILE)
  }
  return bundler({
    name: 'AdminBro',
    input: path.join(__dirname, '/../../frontend/bundle-entry.jsx'),
    babelConfig: {
      plugins: [runtime, styled],
      runtimeHelpers: true,
      include: path.join(__dirname, '/../../frontend/**'),
    },
  })
}

module.exports = build
