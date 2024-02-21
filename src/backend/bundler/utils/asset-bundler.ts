/* eslint-disable import/no-extraneous-dependencies */
import { readFile, mkdir, writeFile } from 'fs/promises'
import { rollup, watch, InputOptions, OutputOptions } from 'rollup'
import isUndefined from 'lodash/isUndefined.js'
import ora from 'ora'

import { ADMIN_JS_TMP_DIR, NODE_ENV } from './constants.js'

export class AssetBundler {
  static DEFAULT_EXTENSIONS = ['.mjs', '.cjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss']

  static DEFAULT_GLOBALS = {
    react: 'React',
    redux: 'Redux',
    'react-feather': 'FeatherIcons',
    '@adminjs/design-system/styled-components': 'styled',
    'prop-types': 'PropTypes',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    adminjs: 'AdminJS',
    '@adminjs/design-system': 'AdminJSDesignSystem',
  }

  static DEFAULT_EXTERNALS = [
    'prop-types',
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'react-router',
    'react-router-dom',
    '@adminjs/design-system/styled-components',
    'adminjs',
    '@adminjs/design-system',
    'react-feather',
  ]

  protected inputOptions: InputOptions = {}

  protected outputOptions: OutputOptions = {}

  constructor(input: InputOptions, output: OutputOptions) {
    this.createConfiguration(input, output)
  }

  public async build() {
    const bundle = await rollup(this.inputOptions)

    await bundle.write(this.outputOptions)
    await bundle.generate(this.outputOptions)
  }

  public async watch() {
    const bundle = await rollup(this.inputOptions)

    const spinner = ora(`Bundling files in watchmode: ${JSON.stringify(this.inputOptions)}`)

    const watcher = watch({
      ...this.inputOptions,
      output: this.outputOptions,
    })

    watcher.on('event', (event) => {
      if (event.code === 'START') {
        spinner.start('Bundling files...')
      }
      if (event.code === 'ERROR') {
        spinner.fail('Bundle fail:')
        // eslint-disable-next-line no-console
        console.log(event)
      }

      if (event.code === 'END') {
        spinner.succeed(`Finish bundling: ${bundle.watchFiles.length} files`)
      }
    })
  }

  public async createEntry({
    dir = ADMIN_JS_TMP_DIR,
    content,
  }: {
    write?: boolean
    dir?: string
    content: string
  }) {
    try {
      await mkdir(dir, { recursive: true })
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error
      }
    }
    await writeFile(this.inputOptions.input as string, content)
  }

  public async getOutput(): Promise<string | null> {
    try {
      return await readFile(this.outputOptions.file as string, 'utf-8')
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }
    }

    return null
  }

  public createConfiguration(input: InputOptions, output: OutputOptions): void {
    this.inputOptions = input
    this.outputOptions = output

    if (isUndefined(this.inputOptions.input)) {
      throw new Error('InputOptions#input must be defined')
    }

    if (typeof this.inputOptions.input !== 'string') {
      throw new Error('InputOptions#input must be a "string"')
    }

    if (isUndefined(this.outputOptions.file)) {
      throw new Error('OutputOptions#file must be defined')
    }

    if (isUndefined(this.outputOptions.name)) {
      throw new Error('OutputOptions#name must be defined')
    }

    if (isUndefined(this.outputOptions.format)) {
      this.outputOptions.format = 'iife'
    }

    if (isUndefined(this.outputOptions.interop)) {
      this.outputOptions.interop = 'auto'
    }

    if (isUndefined(this.outputOptions.sourcemap)) {
      this.outputOptions.sourcemap = NODE_ENV === 'production' ? false : 'inline'
    }
  }

  public setInputOption<T = any>(key: string, value: T) {
    this.inputOptions[key] = value

    return this
  }

  public setOutputOption<T = any>(key: string, value: T) {
    this.outputOptions[key] = value

    return this
  }
}
