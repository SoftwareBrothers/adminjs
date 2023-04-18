/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { rollup, watch as rollupWatch } from 'rollup'
import ora from 'ora'
import util from 'util'
import { external, globals, plugins } from './config.js'

async function build({
  name, input, babelConfig = {}, commonJSConfig = {}, file, watch = false, minify,
}) {
  const inputOptions = {
    input,
    plugins: await plugins({ babelConfig, minify, commonJSConfig }),
    external,
  }

  const outputOptions = {
    format: 'iife', interop: 'auto', name, globals, inlineDynamicImports: true,
  }

  if (file) {
    outputOptions.file = file
  }

  if (!minify) {
    outputOptions.sourcemap = 'inline'
  }

  if (watch) {
    const bundle = await rollup(inputOptions)
    if (process.env.DEBUG_BUNDLER) {
      // eslint-disable-next-line no-console
      console.log(util.inspect(bundle.watchFiles, { maxArrayLength: null }))
    }
    const spinner = ora(`Bundling files in watchmode: ${JSON.stringify(inputOptions)}`)
    const watcher = rollupWatch({
      ...inputOptions,
      output: outputOptions,
    })
    watcher.on('event', (event) => {
      if (event.code === 'START') {
        spinner.start('Bundling files...')
      }
      if (event.code === 'ERROR' || event.code === 'FATAL') {
        spinner.fail('Bundle fail:')
        // eslint-disable-next-line no-console
        console.log(event)
      }

      if (event.code === 'END') {
        spinner.succeed(`Finish bundling: ${bundle.watchFiles.length} files`)
      }
    })
    return watcher
  }

  const bundle = await rollup(inputOptions)

  if (file) {
    return bundle.write(outputOptions)
  }
  const bundled = await bundle.generate(outputOptions)
  return bundled.output[0]
}

export default build
