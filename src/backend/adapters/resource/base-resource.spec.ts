import chai, { expect } from 'chai'
import sinon from 'sinon'
import chaiAsPromised from 'chai-as-promised'

import BaseResource from './base-resource.js'
import NotImplementedError from '../../utils/errors/not-implemented-error.js'
import Filter from '../../utils/filter/filter.js'
import BaseRecord from '../record/base-record.js'
import AdminJS from '../../../adminjs.js'
import ResourceDecorator from '../../decorators/resource/resource-decorator.js'

chai.use(chaiAsPromised)

describe('BaseResource', function () {
  let resource: BaseResource

  beforeEach(function () {
    resource = new BaseResource({})
  })

  afterEach(function () {
    sinon.restore()
  })

  describe('.isAdapterFor', function () {
    it('throws NotImplementedError', async function () {
      expect(() => BaseResource.isAdapterFor({})).to.throw(NotImplementedError)
    })
  })

  describe('#databaseName', function () {
    it('throws NotImplementedError', async function () {
      expect(() => resource.databaseName()).to.throw(NotImplementedError)
    })
  })

  describe('#databaseType', function () {
    it('returns "database" by default', async function () {
      expect(resource.databaseType()).to.eq('other')
    })
  })

  describe('#id', function () {
    it('throws NotImplementedError', async function () {
      expect(() => resource.id()).to.throw(NotImplementedError)
    })
  })

  describe('#properties', function () {
    it('throws NotImplementedError', async function () {
      expect(() => resource.properties()).to.throw(NotImplementedError)
    })
  })

  describe('#property', function () {
    it('throws NotImplementedError', async function () {
      expect(() => resource.property('someProperty')).to.throw(NotImplementedError)
    })
  })

  describe('#count', function () {
    it('throws NotImplementedError', async function () {
      expect(resource.count({} as Filter)).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#find', function () {
    it('throws NotImplementedError', async function () {
      expect(resource.find({} as Filter, {})).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#findOne', function () {
    it('throws NotImplementedError', async function () {
      expect(resource.findOne('someId')).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#build', function () {
    it('returns new BaseRecord', async function () {
      const params = { param: 'value' }
      expect(resource.build(params)).to.be.instanceOf(BaseRecord)
    })
  })

  describe('#create', function () {
    it('throws NotImplementedError', async function () {
      expect(resource.create({})).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#update', function () {
    it('throws NotImplementedError', async function () {
      expect(resource.update('id', {})).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#delete', function () {
    it('throws NotImplementedError', async function () {
      expect(resource.delete('id')).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#decorate', function () {
    it('returns new Decorator when resource has been decorated', function () {
      sinon.stub(resource, 'properties').returns([])
      resource.assignDecorator(new AdminJS(), {})

      expect(resource.decorate()).to.be.instanceOf(ResourceDecorator)
    })

    it('throws error when resource has not been decorated', function () {
      expect(() => resource.decorate()).to.throw('resource does not have any assigned decorator yet')
    })
  })
})
