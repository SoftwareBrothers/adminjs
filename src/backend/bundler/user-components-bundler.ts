import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'
import bundler from './bundler'
import generateEntry from './generate-user-component-entry'

const tmpPath = '.adminbro'
const entryPath = path.join(tmpPath, '.entry.js')
const outPath = path.join(tmpPath, 'bundle.js')

async function build(admin, { write = false } = {}): Promise<string> {
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

export {
  build as default,
  outPath,
}
