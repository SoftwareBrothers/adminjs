#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import fs from 'fs'
import path from 'path'
import { program } from 'commander'
import * as url from 'url'

import AdminJS from './adminjs.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))

program.version(pkg.version)

program
  .command('bundle <configFile>')
  .description([
    'Bundle all custom components added by using ComponentsLoader',
    'method. <configFile> argument is the path to your js file where you',
    'export AdminJSOptions configuration object',
  ].join('\n                     '))
  .action(async (configFile) => {
    const config = require(path.join(process.cwd(), configFile))
    if (!config.databases && !config.resources) {
      // eslint-disable-next-line no-console
      console.log([
        'Are you sure you pointed to the right configuration file?.',
        `'${path.join(process.cwd(), configFile)}' does not have neither`,
        '"databases" nor "resources" properties.',
      ].join('\n'))
      return
    }
    const bundler = await import('../lib/backend/bundler/user-components-bundler.js')
    bundler(new AdminJS(config), { watch: false, write: true })
  })

program.parse(process.argv)
