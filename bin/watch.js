const runtime = require('@babel/plugin-transform-runtime')
const bundler = require('../src/backend/bundler/bundler')

async function build() {
  bundler({
    name: 'AdminBro',
    input: __dirname + '/../src/frontend/bundle-entry.jsx',
    file: __dirname + '/../src/frontend/assets/scripts/app-bundle.js',
    babelConfig: {
      plugins: [runtime],
      runtimeHelpers: true,
      include: __dirname + '/../src/frontend/**',
    },
  })
}

build()
