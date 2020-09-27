import { expect } from 'chai'
import sinon, { SinonStubbedInstance } from 'sinon'
import { BaseProperty, BaseRecord, BaseResource } from '../../adapters'

import { PropertyDecorator, ResourceDecorator } from '../../decorators'
import { populateProperty } from './populate-property'

describe('populateProperty', () => {
  const userId = '1234'
  const path = 'userId'
  let resourceDecorator: SinonStubbedInstance<ResourceDecorator>
  let referenceResource: SinonStubbedInstance<BaseResource>
  let record: SinonStubbedInstance<BaseRecord>
  let userRecord: SinonStubbedInstance<BaseRecord>
  let property: SinonStubbedInstance<PropertyDecorator> & PropertyDecorator

  let populatedResponse: Array<BaseRecord> | null

  beforeEach(() => {
    resourceDecorator = sinon.createStubInstance(ResourceDecorator)
    referenceResource = sinon.createStubInstance(BaseResource)
    record = sinon.createStubInstance(BaseRecord)
    userRecord = sinon.createStubInstance(BaseRecord)
    property = sinon.createStubInstance(PropertyDecorator) as typeof property
    property.resource.returns(resourceDecorator as unknown as ResourceDecorator)
    property.reference.returns(referenceResource as unknown as BaseResource)
    property.property = { reference: 'someRawReference' } as unknown as BaseProperty
    property.path = path
  })

  afterEach(() => {
    sinon.restore()
  })

  it('returns empty array when no records are given', async () => {
    expect(await populateProperty([], property)).to.deep.eq([])
  })

  context('2 same records with reference key', () => {
    beforeEach(async () => {
      record.param.returns(userId)
      userRecord.id.returns(userId)
      referenceResource.findMany.resolves([userRecord])

      populatedResponse = await populateProperty([record, record], property)
    })

    it('returns 2 records', async () => {
      expect(populatedResponse?.length).to.eq(2)
    })

    it('calls findMany in with the list of userIds just once', () => {
      expect(referenceResource.findMany).to.have.been.calledOnceWith([userId])
    })

    it('adds reference resource to record.populated', () => {
      const populatedRecord = populatedResponse && populatedResponse[0]

      expect(populatedRecord?.populate).to.have.been.calledWith(path, userRecord)
    })
  })

  context('record with array property being also a reference', () => {
    const [userId1, userId2] = ['user1', 'user2']

    beforeEach(async () => {
      record.param.returns([userId1, userId2])
      // resourceDecorator
      userRecord.id.returns(userId)
      property.isArray.returns(true)
      referenceResource.findMany.resolves([userRecord])

      populatedResponse = await populateProperty([record, record], property)
    })

    it('properly finds references in arrays', () => {
      expect(referenceResource.findMany).to.have.been.calledOnceWith([userId1, userId2])
    })
  })
})
