#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import fs from 'fs'
import path from 'path'
import program from 'commander'
import AdminBro from './admin-bro'

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'))

program.version(pkg.version)

program
  .command('bundle <configFile>')
  .description([
    'Bundle all custom components addde by using AdminBro.bundle(filePath).',
    'method. <configFile> argument is the path to your js file where you',
    'export AdminBroOptions configuration object',
  ].join('\n                     '))
  .action((configFile) => {
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
    const bundler = require('../lib/backend/bundler/user-components-bundler').default
    bundler(new AdminBro(config), { watch: false, write: true })
  })

program.parse(process.argv)
