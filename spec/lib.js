/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
import { importAll } from 'node-esm-import-all'

import './setup.js'

await importAll({
  dirname: '../lib/',
  filter: /spec\.js$/i,
  recursive: true,
})
