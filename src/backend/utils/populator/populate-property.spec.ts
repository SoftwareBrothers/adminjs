import { expect } from 'chai'
import sinon, { SinonStubbedInstance } from 'sinon'
import { BaseProperty, BaseRecord, BaseResource } from '../../adapters'

import { ResourceDecorator } from '../../decorators'
import { populateProperty, PopulatorNarrowedProperty } from './populate-property'

describe('populateProperty', () => {
  const userId = '1234'
  const path = 'userId'
  let property: PopulatorNarrowedProperty
  let resourceDecorator: SinonStubbedInstance<ResourceDecorator>
  let referenceResource: SinonStubbedInstance<BaseResource>
  let record: SinonStubbedInstance<BaseRecord>
  let userRecord: SinonStubbedInstance<BaseRecord>


  beforeEach(() => {
    resourceDecorator = sinon.createStubInstance(ResourceDecorator)
    referenceResource = sinon.createStubInstance(BaseResource)
    record = sinon.createStubInstance(BaseRecord)
    userRecord = sinon.createStubInstance(BaseRecord)

    property = {
      resource: () => resourceDecorator as unknown as ResourceDecorator,
      reference: () => referenceResource as unknown as BaseResource,
      property: { reference: 'someRawReference' } as unknown as BaseProperty,
      path,
    }
  })

  it('returns empty array when no records are given', async () => {
    expect(await populateProperty([], property)).to.deep.eq([])
  })

  context('2 same records having with reference key', () => {
    let populatedResponse: Array<BaseRecord> | null

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
})
