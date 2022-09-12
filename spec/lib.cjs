/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
require('./setup.cjs')

require('require.all')({
  dir: '../lib/',
  match: /spec\.js$/i,
  recursive: true,
})
