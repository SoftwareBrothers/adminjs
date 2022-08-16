import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import BaseResource from './base-resource'
import NotImplementedError from '../../utils/errors/not-implemented-error'
import Filter from '../../utils/filter/filter'
import BaseRecord from '../record/base-record'
import AdminJS from '../../../adminjs'
import ResourceDecorator from '../../decorators/resource/resource-decorator'

chai.use(chaiAsPromised)

describe('BaseResource', () => {
  let resource: BaseResource

  beforeEach(() => {
    resource = new BaseResource({})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('.isAdapterFor', () => {
    it('throws NotImplementedError', async () => {
      expect(() => BaseResource.isAdapterFor({})).to.throw(NotImplementedError)
    })
  })

  describe('#databaseName', () => {
    it('throws NotImplementedError', async () => {
      expect(() => resource.databaseName()).to.throw(NotImplementedError)
    })
  })

  describe('#databaseType', () => {
    it('returns "database" by default', async () => {
      expect(resource.databaseType()).to.eq('other')
    })
  })

  describe('#id', () => {
    it('throws NotImplementedError', async () => {
      expect(() => resource.id()).to.throw(NotImplementedError)
    })
  })

  describe('#properties', () => {
    it('throws NotImplementedError', async () => {
      expect(() => resource.properties()).to.throw(NotImplementedError)
    })
  })

  describe('#property', () => {
    it('throws NotImplementedError', async () => {
      expect(() => resource.property('someProperty')).to.throw(NotImplementedError)
    })
  })

  describe('#count', () => {
    it('throws NotImplementedError', async () => {
      expect(resource.count({} as Filter)).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#find', () => {
    it('throws NotImplementedError', async () => {
      expect(resource.find({} as Filter, {})).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#findOne', () => {
    it('throws NotImplementedError', async () => {
      expect(resource.findOne('someId')).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#build', () => {
    it('returns new BaseRecord', async () => {
      const params = { param: 'value' }
      expect(resource.build(params)).to.be.instanceOf(BaseRecord)
    })
  })

  describe('#create', () => {
    it('throws NotImplementedError', async () => {
      expect(resource.create({})).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#update', () => {
    it('throws NotImplementedError', async () => {
      expect(resource.update('id', {})).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#delete', () => {
    it('throws NotImplementedError', async () => {
      expect(resource.delete('id')).to.be.rejectedWith(NotImplementedError)
    })
  })

  describe('#decorate', () => {
    it('returns new Decorator when resource has been decorated', () => {
      jest.spyOn(resource, 'properties').mockClear().mockReturnValue([])
      resource.assignDecorator(new AdminJS(), {})

      expect(resource.decorate()).to.be.instanceOf(ResourceDecorator)
    })

    it('throws error when resource has not been decorated', () => {
      expect(() => resource.decorate()).to.throw('resource does not have any assigned decorator yet')
    })
  })
})
