import path from 'path'
import { expect } from 'chai'

import AdminJS from './adminjs'

import BaseDatabase from './backend/adapters/database/base-database'
import BaseResource from './backend/adapters/resource/base-resource'
import { OverridableComponent } from './frontend/utils/overridable-component'


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
      }).to.throw('Adapter elements has to be a subclass of AdminJS.BaseResource and AdminJS.BaseDatabase')
    })
  })

  describe('resolveBabelConfigPath', function () {
    it('load .babelrc file', function () {
      const adminJS = new AdminJS({ bundler: { babelConfig: '../.babelrc' } })
      expect(adminJS.options.bundler.babelConfig).not.to.undefined
    })

    it('load with json object directly', function () {
      const adminJS = new AdminJS({ bundler: { babelConfig: {
        presets: [
          '@babel/preset-react',
          ['@babel/preset-env', {
            targets: {
              node: '8',
            },
          }],
          '@babel/preset-typescript',
        ],
        plugins: ['babel-plugin-styled-components'],
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

    it('load babel.config.js file', function () {
      const adminJS = new AdminJS({ bundler: { babelConfig: './babel.test.config.js' } })
      expect(adminJS.options.bundler.babelConfig).not.to.undefined
    })
  })

  describe('.bundle', function () {
    afterEach(function () {
      global.UserComponents = {}
    })
    context('file exists', function () {
      beforeEach(function () {
        this.result = AdminJS.bundle('../spec/fixtures/example-component')
      })

      it('adds given file to a UserComponents object', function () {
        expect(Object.keys(global.UserComponents || {})).to.have.lengthOf(1)
      })

      it('returns uniq id', function () {
        expect(global.UserComponents && global.UserComponents[this.result]).not.to.be.undefined
        expect(this.result).to.be.a('string')
      })

      it('converts relative path to absolute path', function () {
        expect(
          global.UserComponents && global.UserComponents[this.result],
        ).to.equal(path.join(__dirname, '../spec/fixtures/example-component'))
      })
    })

    context('component name given', function () {
      const componentName = 'Dashboard'
      let result: string

      beforeEach(function () {
        result = AdminJS.bundle(
          '../spec/fixtures/example-component',
          componentName as OverridableComponent,
        )
      })

      it('returns the same component name as which was given', function () {
        expect(result).to.eq(componentName)
      })
    })

    it('throws an error when component doesn\'t exist', function () {
      expect(() => {
        AdminJS.bundle('./fixtures/example-components')
      }).to.throw().property('name', 'ConfigurationError')
    })
  })
})
