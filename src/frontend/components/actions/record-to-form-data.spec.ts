import factory from 'factory-girl'
import { expect } from 'chai'

import recordToFormData from './record-to-form-data'
import '../spec/record-json.factory'
import RecordJSON from '../../../backend/decorators/record-json.interface'

describe('recordToFormData', function () {
  it('converts objects to empty string', async function () {
    const record = await factory.build<RecordJSON>('RecordJSON', { params: {
      someEmptyObject: {},
    } })
    expect(recordToFormData(record).get('someEmptyObject')).to.equal('')
  })

  it('removes duplicated root keys for nested arrays', async function () {
    const params = {
      'Item.0': '',
      'Item.0.imageVariants.0.imageURL': 'some-value',
    }
    const record = await factory.build<RecordJSON>('RecordJSON', { params })
    expect(recordToFormData(record).get('Item.0')).to.be.null
    expect(recordToFormData(record).get('Item.0.imageVariants.0.imageURL')).to.equal(
      params['Item.0.imageVariants.0.imageURL'],
    )
  })
})
