import path from 'path'

import AdminJS from './adminjs'

import BaseDatabase from './backend/adapters/database/base-database'
import BaseResource from './backend/adapters/resource/base-resource'
import { OverridableComponent } from './frontend/utils/overridable-component'

describe('AdminJS', () => {
  let testContext: any;

  beforeEach(() => {
    testContext = {};
  });

  beforeEach(() => {
    global.RegisteredAdapters = []
  })

  describe('#constructor', () => {
    it('sets default root path when no given', () => {
      expect(new AdminJS().options.rootPath).toBe('/admin')
    })
  })

  describe('.AdminJS.registerAdapter', () => {
    beforeEach(() => {
      class Database extends BaseDatabase {}
      class Resource extends BaseResource {}
      testContext.DatabaseAdapter = { Database, Resource }
    })

    it('adds given adapter to list off all available adapters', () => {
      AdminJS.registerAdapter(testContext.DatabaseAdapter)
      expect(global.RegisteredAdapters).toHaveLength(1)
    })

    it('throws an error when adapter is not full', () => {
      expect(() => {
        AdminJS.registerAdapter({
          Resource: BaseResource,
          Database: null as unknown as typeof BaseDatabase })
      }).toThrowError('Adapter has to have both Database and Resource')
    })

    it(
      'throws an error when adapter has elements not being subclassed from base adapter',
      () => {
        expect(() => {
          AdminJS.registerAdapter({
            Resource: {} as typeof BaseResource,
            Database: {} as typeof BaseDatabase,
          })
        }).toThrowError(
          'Adapter elements have to be a subclass of AdminJS.BaseResource and AdminJS.BaseDatabase'
        )
      }
    )
  })

  describe('resolveBabelConfigPath', () => {
    it('load .babelrc file', () => {
      const adminJS = new AdminJS({ bundler: { babelConfig: '../.babelrc' } })
      expect(adminJS.options.bundler.babelConfig).toBeDefined()
    })

    it('load with json object directly', () => {
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
      expect(adminJS.options.bundler.babelConfig).toBeDefined()
    })

    it('load babel.config.js file', () => {
      const adminJS = new AdminJS({ bundler: { babelConfig: './babel.test.config.js' } })
      expect(adminJS.options.bundler.babelConfig).toBeDefined()
    })
  })

  describe('.bundle', () => {
    afterEach(() => {
      global.UserComponents = {}
    })
    describe('file exists', () => {
      beforeEach(() => {
        testContext.result = AdminJS.bundle('../spec/fixtures/example-component')
      })

      it('adds given file to a UserComponents object', () => {
        expect(Object.keys(global.UserComponents || {})).toHaveLength(1)
      })

      it('returns uniq id', () => {
        expect(global.UserComponents && global.UserComponents[testContext.result]).toBeDefined()
        expect(typeof testContext.result).toBe('string')
      })

      it('converts relative path to absolute path', () => {
        expect(
          global.UserComponents && global.UserComponents[testContext.result],
        ).toBe(path.join(__dirname, '../spec/fixtures/example-component'))
      })
    })

    describe('component name given', () => {
      const componentName = 'Dashboard'
      let result: string

      beforeEach(() => {
        result = AdminJS.bundle(
          '../spec/fixtures/example-component',
          componentName as OverridableComponent,
        )
      })

      it('returns the same component name as which was given', () => {
        expect(result).toBe(componentName)
      })
    })

    it('throws an error when component doesn\'t exist', () => {
      expect(() => {
        AdminJS.bundle('./fixtures/example-components')
      }).to.throw().toHaveProperty('name', 'ConfigurationError')
    })
  })
})
