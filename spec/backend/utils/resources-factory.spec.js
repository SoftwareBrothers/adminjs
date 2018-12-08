const ResourcesFactory = require('@backend/utils/resources-factory')
const BaseDatabase = require('@backend/adapters/base-database')
const BaseResource = require('@backend/adapters/base-resource')
const BaseDecorator = require('@backend/utils/base-decorator')


describe('ResourcesFactory', function () {
  describe('._convertDatabases', function () {
    context('no adapter defined', function () {
      it('throws an error when there are no adapters and database is given', function () {
        expect(() => {
          new ResourcesFactory()._convertDatabases(['one'])
        }).to.throw().property('name', 'NoDatabaseAdapterError')
      })

      it('returns empty array when none databases were given', function () {
        expect(new ResourcesFactory()._convertDatabases([])).to.have.lengthOf(0)
      })
    })

    context('one adapter defined', function () {
      beforeEach(function () {
        this.resourcesInDatabase = 5
        class Database extends BaseDatabase {
          static isAdapterFor(database) { return database === 'supported' }

          resources() { return new Array(5) }
        }
        class Resource extends BaseResource {}
        this.resourcesFactory = new ResourcesFactory([{ Database, Resource }])
      })

      it('takes resources from databases', function () {
        expect(
          this.resourcesFactory._convertDatabases(['supported']),
        ).to.have.lengthOf(this.resourcesInDatabase)
      })

      it('throws an error when there are no adapters supporting given database', function () {
        expect(() => {
          this.resourcesFactory._convertDatabases(['not supported'])
        }).to.throw().property('name', 'NoDatabaseAdapterError')
      })
    })
  })

  describe('._convertResources', function () {
    context('there are no adapters', function () {
      it('throws an error when resource is not subclass from BaseResource', function () {
        expect(() => {
          new ResourcesFactory()._convertResources(['one'])
        }).to.throw().property('name', 'NoResourceAdapterError')
      })

      it('returns given resource when it is subclass from BaseResource', function () {
        class MyResource extends BaseResource {}
        expect(new ResourcesFactory()._convertResources([new MyResource()])).to.have.lengthOf(1)
      })
    })

    context('there is one adapter', function () {
      beforeEach(function () {
        class Database extends BaseDatabase {}
        class Resource extends BaseResource {
          static isAdapterFor(resource) { return resource === 'supported' }
        }
        this.resourcesFactory = new ResourcesFactory([{ Database, Resource }])
        this.Resource = Resource
      })

      it('throws an error when resource is not handled by the adapter', function () {
        expect(() => {
          this.resourcesFactory._convertResources(['not supported'])
        }).to.throw().property('name', 'NoResourceAdapterError')
      })

      it('throws an error when resource is not handled by the adapter and its provided with a decorator', function () {
        expect(() => {
          this.resourcesFactory._convertResources([{ resource: 'not supported', decorator: 'sth' }])
        }).to.throw().property('name', 'NoResourceAdapterError')
      })

      it('converts given resource to Resource class provided in the adapter', function () {
        const resources = this.resourcesFactory._convertResources(['supported'])
        expect(resources).to.have.lengthOf(1)
        expect(resources[0].resource).to.be.an.instanceOf(this.Resource)
      })

      it('converts to Resource class when resource when it is provided with a decorator', function () {
        const resources = this.resourcesFactory._convertResources([{ resource: 'supported', decorator: 'sth' }])
        expect(resources).to.have.lengthOf(1)
        expect(resources[0].resource).to.be.an.instanceOf(this.Resource)
        expect(resources[0].decorator).to.equal('sth')
      })
    })
  })

  describe('_decorateResources', function () {
    beforeEach(function () {
      this.resourcesFactory = new ResourcesFactory([])
    })

    it('assigns BaseDecorator when no other was given', function () {
      const resources = this.resourcesFactory._decorateResources([{ resource: new BaseResource() }])
      expect(resources[0]._Decorator).to.equal(BaseDecorator)
    })

    it('assigns OtherDecorator when it was given', function () {
      class MyDecorator extends BaseDecorator {}
      const resources = this.resourcesFactory._decorateResources([{
        resource: new BaseResource(), decorator: MyDecorator,
      }])
      expect(resources[0]._Decorator).to.equal(MyDecorator)
    })

    it('throws error when decorator given by user doesn not subclass from BaseDecorator', function () {
      class MyDecorator extends Object {}
      expect(() => {
        this.resourcesFactory._decorateResources([{ resource: new BaseResource(), decorator: MyDecorator }])
      }).to.throw().property('name', 'IncorrectDecorator')
    })
  })
})
