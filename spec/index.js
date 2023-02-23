/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable func-names */
import 'core-js/stable'
import * as url from 'url'
import register from '@babel/register'
import requireAll from 'require.all'
import buildResolver from 'esm-resolve'

const __filename = url.fileURLToPath(import.meta.url)
const resolve = buildResolver(__filename)

register({
  presets: [
    resolve('@babel/preset-react'),
    [resolve('@babel/preset-env'), {
      targets: {
        node: '8',
      },
    }],
    resolve('@babel/preset-typescript'),
  ],
  extensions: ['.jsx', '.js', '.ts', '.tsx'],
  only: ['src/', 'spec/'],
})

import './setup.js'

requireAll({
  dir: '../src/',
  match: /spec\.(js|ts|tsx)$/i,
  require: /\.(js|ts|tsx)$/,
  recursive: true,
})
