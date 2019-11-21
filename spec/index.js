/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable func-names */
require('@babel/polyfill')
require('@babel/register')({
  presets: [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-typescript'),
  ],
  extensions: ['.jsx', '.js', '.ts', '.tsx'],
  only: ['src/', 'spec/'],
})

require('./setup')

require('require.all')({
  dir: '../src/',
  match: /spec\.(js|ts|tsx)$/i,
  require: /\.(js|ts|tsx)$/,
  recursive: true,
})
