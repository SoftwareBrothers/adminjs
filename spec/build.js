/* eslint-disable func-names */
require('./setup')

require('require.all')({
  dir: '../build/',
  match: /spec\.js$/i,
  recursive: true,
})
