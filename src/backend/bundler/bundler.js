const rollup = require('rollup')
const { external, globals, plugins } = require('./config')

async function build({ name, input, babelConfig = {}, commonJSConfig = {}, file, watch, minify }) {
  const inputOptions = {
    input,
    plugins: plugins({ babelConfig, minify, commonJSConfig }),
    external,
  }

  const outputOptions = {
    format: 'iife', name, globals,
  }

  if (file) {
    outputOptions.file = file
  }

  if (watch) {
    const watcher = rollup.watch({
      ...inputOptions,
      output: outputOptions,
    })
    watcher.on('event', (event) => {
      console.log(event.code)
      if (event.code === 'ERROR' || event.code === 'FATAL') {
        console.log(event)
      }
    })
    return watcher
  }

  const bundle = await rollup.rollup(inputOptions)

  if (file) {
    return bundle.write(outputOptions)
  }
  const bundled = await bundle.generate(outputOptions)
  return bundled.output[0].code
}

module.exports = build
