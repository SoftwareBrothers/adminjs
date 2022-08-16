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
    property.resource.mockReturnValue(resourceDecorator as unknown as ResourceDecorator)
    property.reference.mockReturnValue(referenceResource as unknown as BaseResource)
    property.property = { reference: 'someRawReference' } as unknown as BaseProperty
    property.propertyPath = path
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns empty array when no records are given', async () => {
    expect(await populateProperty([], property)).toEqual([])
  })

  describe('2 same records with reference key', () => {
    beforeEach(async () => {
      record.get.mockReturnValue(userId)
      record.selectParams.mockReturnValue({ [path]: userId })
      userRecord.id.mockReturnValue(userId)
      referenceResource.findMany.resolves([userRecord])

      populatedResponse = await populateProperty([record, record], property)
    })

    it('returns 2 records', async () => {
      expect(populatedResponse?.length).toBe(2)
    })

    it('calls findMany in with the list of userIds just once', () => {
      expect(referenceResource.findMany).to.have.been.calledOnceWith([userId])
    })

    it('adds reference resource to record.populated', () => {
      const populatedRecord = populatedResponse && populatedResponse[0]

      expect(populatedRecord?.populate).toBeCalledWith(path, userRecord)
    })
  })

  describe('record with array property being also a reference', () => {
    const [userId1, userId2] = ['user1', 'user2']

    beforeEach(async () => {
      record.get.mockReturnValue([userId1, userId2])
      // resourceDecorator
      userRecord.id.mockReturnValue(userId)
      property.isArray.mockReturnValue(true)
      referenceResource.findMany.resolves([userRecord])
    })

    describe('filled array ', () => {
      beforeEach(async () => {
        record.get.mockReturnValue([userId1, userId2])
        populatedResponse = await populateProperty([record, record], property)
      })
      it('properly finds references in arrays', async () => {
        expect(referenceResource.findMany).to.have.been.calledOnceWith([userId1, userId2])
      })
    })

    describe('array value set to null', () => {
      beforeEach(async () => {
        record.get.mockReturnValue(undefined)
        populatedResponse = await populateProperty([record, record], property)
      })

      it('dees not look for any record', () => {
        expect(referenceResource.findMany).not.toBeCalled()
      })
    })
  })

  describe('empty references', () => {
    it('does not findMany for null values', async () => {
      record.get.mockReturnValue(null)

      populatedResponse = await populateProperty([record], property)

      expect(referenceResource.findMany).not.toBeCalled()
    })

    it('does not findMany for undefined values', async () => {
      record.get.mockReturnValue(undefined)

      populatedResponse = await populateProperty([record], property)

      expect(referenceResource.findMany).not.toBeCalled()
    })

    it('findMany for 0 values', async () => {
      record.get.mockReturnValue(0)

      populatedResponse = await populateProperty([record], property)

      expect(referenceResource.findMany).toBeCalled()
    })

    it('does not findMany for "" empty strings', async () => {
      record.get.mockReturnValue('')

      populatedResponse = await populateProperty([record], property)

      expect(referenceResource.findMany).not.toBeCalled()
    })

    it('does not findMany for "" empty strings in array', async () => {
      record.get.mockReturnValue([''])
      property.isArray.mockReturnValue(true)

      populatedResponse = await populateProperty([record], property)

      expect(referenceResource.findMany).not.toBeCalled()
    })
  })
})
