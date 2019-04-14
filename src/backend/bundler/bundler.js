const rollup = require('rollup')
const { external, globals, plugins } = require('./config')

async function build({ name, input, babelConfig = {}, file }) {
  const inputOptions = {
    input,
    plugins: plugins(babelConfig),
    external,
  }

  if (file) {
    const watcher = rollup.watch({
      ...inputOptions,
      output: {
        format: 'iife', name, globals, file,
      },
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

  const bundled = await bundle.generate({
    format: 'iife', name, globals,
  })
  return bundled.output[0].code
}

module.exports = build
