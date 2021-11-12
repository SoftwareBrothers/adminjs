import * as fs from 'fs'
import * as path from 'path'
import * as util from 'util'
import bundler from './bundler'
import generateEntry from './generate-user-component-entry'
import { ADMIN_JS_TMP_DIR } from '../../constants'
import env from './bundler-env'

const entryPath = path.join(ADMIN_JS_TMP_DIR, '.entry.js')
const outPath = path.join(ADMIN_JS_TMP_DIR, 'bundle.js')

async function build(admin, { write = false, watch = false } = {}): Promise<string> {
  const { options: { bundler: bundlerOptions } } = admin
  const entryFile = generateEntry(admin, ADMIN_JS_TMP_DIR)

  try {
    await util.promisify(fs.mkdir)(ADMIN_JS_TMP_DIR, { recursive: true })
  } catch (error) {
    if (error.code !== 'EEXIST') { throw error }
  }

  // if components bundle was requested and there are already bundled - return
  // that instead of bundling them again
  if (!write) {
    try {
      const existingBundle = await util.promisify(fs.readFile)(outPath, 'utf-8')
      return existingBundle
    } catch (error) {
      if (error.code !== 'ENOENT') { throw error }
    }
  }

  await util.promisify(fs.writeFile)(entryPath, entryFile)

  const output = await bundler({
    name: 'AdminJSCustom',
    input: entryPath,
    watch,
    file: write ? outPath : null,
    minify: env === 'production',
    ...bundlerOptions,
  })

  let jsOutput = output.code
  if (output.map) {
    jsOutput += `
//# sourceMappingURL=data:application/json;charset=utf-8;base64,${Buffer.from(JSON.stringify(output.map)).toString('base64')}
    `
  }
  return jsOutput
}

export {
  build as default,
  outPath,
}
