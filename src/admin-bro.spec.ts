import path from 'path'
import { expect } from 'chai'

import AdminBro from './admin-bro'

import BaseDatabase from './backend/adapters/base-database'
import BaseResource from './backend/adapters/base-resource'


describe('AdminBro', function () {
  beforeEach(function () {
    AdminBro.registeredAdapters = []
  })

  describe('#constructor', function () {
    it('sets default root path when no given', function () {
      expect(new AdminBro().options.rootPath).to.equal('/admin')
    })
  })

  describe('.AdminBro.registerAdapter', function () {
    beforeEach(function () {
      class Database extends BaseDatabase {}
      class Resource extends BaseResource {}
      this.DatabaseAdapter = { Database, Resource }
    })

    it('adds given adapter to list off all available adapters', function () {
      AdminBro.registerAdapter(this.DatabaseAdapter)
      expect(AdminBro.registeredAdapters).to.have.lengthOf(1)
    })

    it('throws an error when adapter is not full', function () {
      expect(() => {
        AdminBro.registerAdapter({
          Resource: AdminBro.BaseResource,
          Database: {} as typeof BaseDatabase })
      }).to.throw('Adapter has to have both Database and Resource')
    })

    it('throws an error when adapter has elements not being subclassed from base adapter', function () {
      expect(() => {
        AdminBro.registerAdapter({
          Resource: {} as typeof BaseResource,
          Database: {} as typeof BaseDatabase,
        })
      }).to.throw('Adapter elements has to be a subclass of AdminBro.BaseResource and AdminBro.BaseDatabase')
    })
  })

  describe('.bundle', function () {
    afterEach(function () {
      AdminBro.UserComponents = {}
    })
    context('file exists', function () {
      beforeEach(function () {
        this.result = AdminBro.bundle('../spec/fixtures/example-component')
      })

      it('adds given file to a UserComponents object', function () {
        expect(Object.keys(AdminBro.UserComponents)).to.have.lengthOf(1)
      })

      it('returns uniq id', function () {
        expect(AdminBro.UserComponents[this.result]).not.to.be.undefined
        expect(this.result).to.be.a('string')
      })

      it('converts relative path to absolute path', function () {
        expect(
          AdminBro.UserComponents[this.result],
        ).to.equal(path.join(__dirname, '../spec/fixtures/example-component'))
      })
    })

    it('throws an error when component doesn\'t exist', function () {
      expect(() => {
        AdminBro.bundle('./fixtures/example-components')
      }).to.throw().property('name', 'ConfigurationError')
    })
  })
})
