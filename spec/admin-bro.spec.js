const AdminBro = require('../src/admin-bro')

describe('AdminBro', function () {
  beforeEach(function () {
    AdminBro.registeredAdapters = []
  })

  describe('#constructor', function () {
    it('sets default root path when no given', function () {
      expect(new AdminBro().options.rootPath).to.equal('/admin')
    })
  })

  describe('.registerAdapter', function () {
    beforeEach(function () {
      class Database extends AdminBro.BaseDatabase {}
      class Resource extends AdminBro.BaseResource {}
      this.DatabaseAdapter = { Database, Resource }
    })

    it('adds given adapter to list off all available adapters', function () {
      AdminBro.registerAdapter(this.DatabaseAdapter)
      expect(AdminBro.registeredAdapters).to.have.lengthOf(1)
    })

    it('throws an error when adapter is not full', function () {
      expect(() => {
        AdminBro.registerAdapter({ Resource: AdminBro.BaseResource })
      }).to.throw('Adapter has to have both Database and Resource')
    })

    it('throws an error when adapter has elements not being subclassed from base adapter', function () {
      expect(() => {
        AdminBro.registerAdapter({ Resource: {}, Database: {} })
      }).to.throw('Adapter elements has to be subclassess of AdminBro.BaseResource and AdminBro.BaseDatabase')
    })
  })
})
