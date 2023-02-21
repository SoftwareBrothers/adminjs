/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
import requireAll from 'require.all'

import './setup.js'

requireAll({
  dir: '../lib/',
  match: /spec\.js$/i,
  recursive: true,
})
