import path from 'path'
import { expect } from 'chai'
import * as url from 'url'

import AdminJS from './adminjs.js'
import BaseDatabase from './backend/adapters/database/base-database.js'
import BaseResource from './backend/adapters/resource/base-resource.js'
import { ComponentLoader } from './backend/utils/component-loader.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

describe('AdminJS', function () {
  beforeEach(function () {
    global.RegisteredAdapters = []
  })

  describe('#constructor', function () {
    it('sets default root path when no given', function () {
      expect(new AdminJS().options.rootPath).to.equal('/admin')
    })
  })

  describe('.AdminJS.registerAdapter', function () {
    beforeEach(function () {
      class Database extends BaseDatabase {}
      class Resource extends BaseResource {}
      this.DatabaseAdapter = { Database, Resource }
    })

    it('adds given adapter to list off all available adapters', function () {
      AdminJS.registerAdapter(this.DatabaseAdapter)
      expect(global.RegisteredAdapters).to.have.lengthOf(1)
    })

    it('throws an error when adapter is not full', function () {
      expect(() => {
        AdminJS.registerAdapter({
          Resource: BaseResource,
          Database: null as unknown as typeof BaseDatabase })
      }).to.throw('Adapter has to have both Database and Resource')
    })

    it('throws an error when adapter has elements not being subclassed from base adapter', function () {
      expect(() => {
        AdminJS.registerAdapter({
          Resource: {} as typeof BaseResource,
          Database: {} as typeof BaseDatabase,
        })
      }).to.throw('Adapter elements have to be a subclass of AdminJS.BaseResource and AdminJS.BaseDatabase')
    })
  })

  describe('resolveBabelConfigPath', function () {
    it('load .babelrc file', function () {
      const adminJS = new AdminJS({ bundler: { babelConfig: '../.babelrc.json' } })
      expect(adminJS.options.bundler.babelConfig).not.to.undefined
    })

    it('load with json object directly', function () {
      const adminJS = new AdminJS({ bundler: { babelConfig: {
        presets: [
          '@babel/preset-react',
          ['@babel/preset-env', {
            targets: {
              node: '18',
            },
            modules: false,
            loose: true,
          }],
          '@babel/preset-typescript',
        ],
        plugins: ['@babel/plugin-syntax-import-assertions'],
        only: ['src/', 'spec/'],
        ignore: [
          'src/frontend/assets/scripts/app-bundle.development.js',
          'src/frontend/assets/scripts/app-bundle.production.js',
          'src/frontend/assets/scripts/global-bundle.development.js',
          'src/frontend/assets/scripts/global-bundle.production.js',
        ],
      } } })
      expect(adminJS.options.bundler.babelConfig).not.to.undefined
    })

    it('load babel.config.cjs file', function () {
      const adminJS = new AdminJS({ bundler: { babelConfig: './babel.test.config.json' } })
      expect(adminJS.options.bundler.babelConfig).not.to.undefined
    })
  })

  describe('ComponentLoader', function () {
    const loader = new ComponentLoader()
    afterEach(function () {
      loader.clear()
    })
    context('file exists', function () {
      beforeEach(function () {
        this.result = loader.add('ExampleComponent', '../spec/fixtures/example-component')
      })

      it('adds given file to a UserComponents object', function () {
        expect(Object.keys(loader.getComponents())).to.have.lengthOf(1)
      })

      it('returns uniqe id', function () {
        expect(loader.getComponents()[this.result]).not.to.be.undefined
        expect(this.result).to.be.a('string')
      })

      it('converts relative path to absolute path', function () {
        expect(
          loader.getComponents()[this.result],
        ).to.equal(path.join(__dirname, '../spec/fixtures/example-component'))
      })
    })

    context('component name given', function () {
      it('returns the same component name as which was given', function () {
        const name = loader.add('Dashboard', '../spec/fixtures/example-component')
        expect(name).to.eq('Dashboard')
      })
    })

    it('throws an error when component doesn\'t exist', function () {
      expect(() => {
        loader.add('ExampleComponent', './fixtures/example-components')
      }).to.throw().property('name', 'ConfigurationError')
    })
  })
})
