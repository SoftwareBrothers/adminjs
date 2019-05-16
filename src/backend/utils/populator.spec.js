const BaseRecord = require('../adapters/base-record')
const BaseResource = require('../adapters/base-resource')
const PropertyDecorator = require('../decorators/property-decorator')

const { populator } = require('./populator')

describe('populator', function () {
  context('empty array given as params', function () {
    it('returns empty array when no records are given', async function () {
      const records = await populator([])
      expect(records).to.have.lengthOf(0)
    })
  })

  context('one record with one reference given', function () {
    beforeEach(function () {
      this.referenceResource = new BaseResource()
      this.property = new PropertyDecorator({})
      this.property.reference = this.sinon.stub().returns(this.referenceResource)
      this.referenceResource.populate = this.sinon.stub()
      this.record = new BaseRecord()
      this.record.resource = new BaseResource()
      this.record.resource.decorate = this.sinon.stub().returns({
        properties: [this.property],
      })
    })

    it('calls the populate record for given resource', async function () {
      await populator([this.record])
      expect(this.referenceResource.populate).to.have.been.calledOnce
    })

    it('does not call the resource.populate() when no properties are given', async function () {
      await populator([this.record], [])
      expect(this.referenceResource.populate).not.to.have.been.called
    })
  })
})
