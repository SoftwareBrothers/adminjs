const bundler = require('./bundler')
const runtime = require('@babel/plugin-transform-runtime')

async function build() {
  return bundler({
    name: 'AdminBro',
    input: __dirname + '/../../frontend/app.jsx',
    babelConfig: {
      plugins: [runtime],
      runtimeHelpers: true,
      include: __dirname + '/../../frontend/**',
    }
  })
}

module.exports = build
