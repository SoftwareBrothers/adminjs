const fs = require('fs')
const path = require('path')
const util = require('util')
const bundler = require('./bundler')

const tmpPath = '.adminbro'
const entryPath = path.join(tmpPath, '.entry.js')
const outPath = path.join(tmpPath, 'bundle.js')
const generateEntry = require('./generate-user-component-entry')

async function build(admin, { write = false } = {}) {
  const entryFile = generateEntry(admin, tmpPath)

  try {
    await util.promisify(fs.mkdir)(tmpPath, { recursive: true })
  } catch (error) {
    if (error.code !== 'EEXIST') { throw error }
  }
  await util.promisify(fs.writeFile)(entryPath, entryFile)

  return bundler({
    name: 'AdminBroCustom',
    input: entryPath,
    file: write ? outPath : null,
    minify: process.env.NODE_ENV === 'production',
  })
}

build.outPath = outPath

module.exports = build
