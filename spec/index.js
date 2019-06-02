/* eslint-disable func-names */
require('@babel/polyfill')
require('@babel/register')({
  presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-env')],
  extensions: ['.jsx', '.js'],
  only: [/src\/frontend/],
})

require('./setup')

require('require.all')({
  dir: '../src/',
  match: /spec\.js$/i,
  recursive: true,
})
