import factory from 'factory-girl'
import { expect } from 'chai'

import recordToFormData, { FORM_VALUE_EMPTY_OBJECT, FORM_VALUE_NULL, FORM_VALUE_EMPTY_ARRAY } from './params-to-form-data'
import '../../components/spec/record-json.factory'
import { RecordJSON } from '../../interfaces'

describe('recordToFormData', function () {
  const propertyKey = 'someProperty'

  it('converts objects to const', async function () {
    const record = await factory.build<RecordJSON>('RecordJSON', { params: {
      [propertyKey]: {},
    } })

    expect(recordToFormData(record.params).get(propertyKey)).to.equal(FORM_VALUE_EMPTY_OBJECT)
  })

  it('converts nulls to const', async function () {
    const record = await factory.build<RecordJSON>('RecordJSON', { params: {
      [propertyKey]: null,
    } })

    expect(recordToFormData(record.params).get(propertyKey)).to.equal(FORM_VALUE_NULL)
  })

  it('converts empty array to const', async function () {
    const record = await factory.build<RecordJSON>('RecordJSON', { params: {
      [propertyKey]: [],
    } })

    expect(recordToFormData(record.params).get(propertyKey)).to.equal(FORM_VALUE_EMPTY_ARRAY)
  })

  it('does not convert date to empty object', async () => {
    const date = new Date()
    const record = await factory.build<RecordJSON>('RecordJSON', { params: {
      [propertyKey]: date,
    } })

    expect(recordToFormData(record.params).get(propertyKey)).to.equal(date.toString())
  })
})
