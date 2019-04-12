const bundler = require('./bundler')
const runtime = require('@babel/plugin-transform-runtime')
const fs = require('fs')
const util = require('util')

const OUTPUT_FILE = __dirname + '/../../frontend/assets/scripts/app-bundle.js'

async function build() {
  const exists = await util.promisify(fs.exists)(OUTPUT_FILE)
  if (exists) {
    return util.promisify(fs.readFile)(OUTPUT_FILE)
  }
  return bundler({
    name: 'AdminBro',
    input: __dirname + '/../../frontend/bundle-entry.jsx',
    babelConfig: {
      plugins: [runtime],
      runtimeHelpers: true,
      include: __dirname + '/../../frontend/**',
    },
  })
}

module.exports = build
