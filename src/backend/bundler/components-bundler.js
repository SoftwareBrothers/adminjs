const bundler = require('./bundler')
const fs = require('fs')
const path = require('path')
const util = require('util')

const tmpPath = '.adminbro'
const entryPath = path.join(tmpPath, '.entry.js')

async function build(admin) {
  const { Components } = admin.constructor
  const entryFile = Object.keys(Components).map(c => {
    return [`import ${c} from '${Components[c]}'`,
            `AdminBro.Components.${c} = ${c}`].join('\n')
  }).join('\n\n')
  try {
    await util.promisify(fs.mkdir)(tmpPath, { recursive: true })
  } catch (error) {
    if (error.code !== 'EEXIST') { throw error }
  }
  await util.promisify(fs.writeFile)(entryPath, entryFile)

  return bundler({
    name: 'AdminBroCustom',
    input: entryPath,
  })
}

module.exports = build
