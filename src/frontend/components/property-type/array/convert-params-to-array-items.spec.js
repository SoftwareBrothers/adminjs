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
        anotherProperty: 'somevalue',
        'stringArray.0': 'element 1',
        'stringArray.1': 'element 2',
        'stringArray.2': 'element last',
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
      name: 'unexistingProperty',
      isArray: true,
    })
    const params = convertParamsToArrayItems(this.property, this.record)
    expect(params).to.deep.equal([])
  })
})
