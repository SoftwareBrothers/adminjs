import { expect } from 'chai'

import AdminJS from './adminjs'
import BaseDatabase from './adapters/database/base-database'
import BaseResource from './adapters/resource/base-resource'

describe('AdminJS', function () {
  beforeEach(function () {
    global.RegisteredAdapters = []
  })

  describe('#constructor', function () {
    it('sets default root path when no given', function () {
      expect(new AdminJS().options.paths.rootPath).to.equal('/admin')
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
      expect(AdminJS.RegisteredAdapters).to.have.lengthOf(1)
    })

    it('throws an error when adapter is not full', function () {
      expect(() => {
        AdminJS.registerAdapter({
          Resource: BaseResource,
          Database: null as unknown as typeof BaseDatabase })
      }).to.throw('Adapter has to have both Database and Resource')
    })
  })
})
