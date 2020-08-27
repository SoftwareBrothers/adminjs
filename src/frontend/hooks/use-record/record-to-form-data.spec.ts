import factory from 'factory-girl'
import { expect } from 'chai'

import recordToFormData, { FORM_VALUE_EMPTY_OBJECT, FORM_VALUE_NULL, FORM_VALUE_EMPTY_ARRAY } from './record-to-form-data'
import '../../components/spec/record-json.factory'
import RecordJSON from '../../../backend/decorators/record-json.interface'

describe('recordToFormData', function () {
  const propertyKey = 'someProperty'

  it('converts objects to const', async function () {
    const record = await factory.build<RecordJSON>('RecordJSON', { params: {
      [propertyKey]: {},
    } })

    expect(recordToFormData(record).get(propertyKey)).to.equal(FORM_VALUE_EMPTY_OBJECT)
  })

  it('converts nulls to const', async function () {
    const record = await factory.build<RecordJSON>('RecordJSON', { params: {
      [propertyKey]: null,
    } })

    expect(recordToFormData(record).get(propertyKey)).to.equal(FORM_VALUE_NULL)
  })

  it('converts empty array to const', async function () {
    const record = await factory.build<RecordJSON>('RecordJSON', { params: {
      [propertyKey]: [],
    } })

    expect(recordToFormData(record).get(propertyKey)).to.equal(FORM_VALUE_EMPTY_ARRAY)
  })
})
