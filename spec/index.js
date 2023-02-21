/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable func-names */
import 'core-js/stable'
import register from '@babel/register'
import requireAll from 'require.all'

register({
  presets: [
    require.resolve('@babel/preset-react'),
    [require.resolve('@babel/preset-env'), {
      targets: {
        node: '8',
      },
    }],
    require.resolve('@babel/preset-typescript'),
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
