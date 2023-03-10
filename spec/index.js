/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable func-names */
import * as url from 'url'
import path from 'path'
import register from '@babel/register'
import { importAll } from 'node-esm-import-all'
import presetReact from '@babel/preset-react'
import presetEnv from '@babel/preset-env'
import presetTs from '@babel/preset-typescript'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

register({
  presets: [
    presetReact,
    [presetEnv, {
      targets: {
        node: '18',
      },
      modules: false,
      loose: true,
    }],
    presetTs,
  ],
  extensions: ['.jsx', '.js', '.ts', '.tsx'],
  only: ['src/', 'spec/'],
})

import './setup.js'

await importAll({
  dirname: path.join(__dirname, '/../src'),
  filter: /spec\.(js|ts|tsx)$/i,
  recursive: true,
})
