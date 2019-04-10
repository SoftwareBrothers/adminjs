const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const plugin = require('@babel/plugin-transform-runtime')
const fs = require('fs')
const util = require('util')

const entryPath = '.entry.js'

async function build(admin) {
  const { Components } = admin.constructor
  const entryFile = Object.keys(Components).map(c => {
    return `import ${c} from '${Components[c]}'\nAdminBro.Components.${c} = ${c}\n`
  }).join('')
  await util.promisify(fs.writeFile)(entryPath, entryFile)
  const inputOptions = {
    input: entryPath,
    plugins: [
      resolve({
        extensions: [ '.mjs', '.js', '.jsx', '.json' ],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.IS_BROWSER': 'true',
      }),
      commonjs(),
      babel({
        presets: ['@babel/preset-react', '@babel/preset-env'],
        plugins: [plugin],
        runtimeHelpers: true,
      })
    ],
    external: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-dom',
      'prop-types',
      'admin-bro',
      'axios',
    ],
  }

  const bundle = await rollup.rollup(inputOptions)

  const bundled = await bundle.generate({
    format: 'iife',
    globals: {
      'react': 'React',
      'redux': 'Redux',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'react-redux': 'ReactRedux',
      'react-router': 'ReactRouter',
      'react-router-dom': 'ReactRouterDOM',
      'axios': 'axios',
      'admin-bro': 'AdminBro',
    }
  })
  return bundled.output[0].code
}

module.exports = build
