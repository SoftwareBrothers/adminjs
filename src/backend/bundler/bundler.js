const { external, globals, plugins } = require('./config')

const rollup = require('rollup')

async function build({ name, input, babelConfig = {}}) {
  const inputOptions = {
    input,
    plugins: plugins(babelConfig),
    external,
  }

  const bundle = await rollup.rollup(inputOptions)

  const bundled = await bundle.generate({
    format: 'iife', name, globals
  })
  return bundled.output[0].code
}

module.exports = build
