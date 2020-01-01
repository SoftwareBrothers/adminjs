import { factory } from 'factory-girl'
import convertParamsToArrayItems from './convert-params-to-array-items'

require('../../../../../spec/fixtures/record.factory')
require('../../../../../spec/fixtures/property.factory')

describe('convertParamsToArrayItems', function () {
  beforeEach(async function () {
    this.property = await factory.build('property', {
      name: 'stringArray',
      isArray: true,
    })
    this.record = await factory.build('record', {
      params: {
        anotherProperty: 'someValue',
        'stringArray.0': 'element 1',
        'stringArray.1': 'element 2',
        'stringArray.2': 'element last',
        'Item.0.imageVariants.0.dateCreated': '2019-09-19T10:00:00.000Z',
        'Item.0.imageVariants.0.imageURL': 'url to help',
        'Item.0.imageVariants.0.isApproved': true,
        'Item.0.imageVariants.0.isDeleted': false,
        'Item.0.imageVariants.1.dateCreated': '2019-09-19T19:10:34.919Z',
        'Item.0.imageVariants.1.imageURL': 'url 2',
        'otherProperty.with.stringArray.1': '1',
        'otherProperty.with.stringArray.2': '2',
      },
    })
  })

  it('extracts 3 array elements for given property', function () {
    const params = convertParamsToArrayItems(this.property, this.record)
    expect(params).to.deep.equal([
      'element 1', 'element 2', 'element last',
    ])
  })

  it('returns empty array for non existing property', async function () {
    this.property = await factory.build('property', {
      name: 'notExistingProperty',
      isArray: true,
    })
    const params = convertParamsToArrayItems(this.property, this.record)
    expect(params).to.deep.equal([])
  })

  it('works with nested arrays', async function () {
    this.property = await factory.build('property', {
      name: 'Item.0.imageVariants',
      isArray: true,
    })
    const params = convertParamsToArrayItems(this.property, this.record)
    expect(params).to.deep.equal([{
      dateCreated: '2019-09-19T10:00:00.000Z',
      imageURL: 'url to help',
      isApproved: true,
      isDeleted: false,
    }, {
      dateCreated: '2019-09-19T19:10:34.919Z',
      imageURL: 'url 2',
    }])
  })
})
