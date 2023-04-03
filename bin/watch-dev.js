import * as url from 'url'
import runtime from '@babel/plugin-transform-runtime'
import importAssertions from '@babel/plugin-syntax-import-assertions'

import bundler from '../src/backend/bundler/bundler.js'
import env from '../src/backend/bundler/bundler-env.js'

const once = !!process.env.ONCE
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

async function build() {
  return bundler({
    name: 'AdminJS',
    input: `${__dirname}/../lib/frontend/bundle-entry.js`,
    file: `${__dirname}/../lib/frontend/assets/scripts/app-bundle.${env}.js`,
    minify: env === 'production',
    watch: !once,
    babelConfig: {
      plugins: [runtime, importAssertions],
      babelHelpers: 'runtime',
      include: [
        'lib/frontend/**',
        'lib/locale/*',
        'lib/utils/**',
        'lib/backend/utils/view-helpers/view-helpers.js',
        'lib/backend/utils/filter/filter.js',
        'lib/backend/decorators/**',
      ],
    },
  })
}

build().catch((error) => {
  console.log(error)
  process.exit(1)
})
