import { expect } from 'chai'
import { unflatten } from 'flat'

import updateRecord from './update-record'
import RecordJSON from '../../backend/decorators/record-json.interface'

describe('updateRecord', function () {
  const newPropertyName = 'newProperty'
  const propertyName = 'propertyName'
  const populatedPropertyName = 'populatedProperty'
  const arrayPropertyName = 'nestedArray'
  const previousRecord: RecordJSON = {
    id: '1',
    title: 'Africa',
    recordActions: [],
    bulkActions: [],
    populated: {
      [populatedPropertyName]: {
        id: 'someId',
      } as RecordJSON,
    },
    errors: {},
    params: {
      email: 'john@doe.pl',
      [propertyName]: 'some filled data',
      [`${arrayPropertyName}.0`]: 'First value in an array',
      [`${arrayPropertyName}.1`]: 'Second value in an array',
    },
  }

  it('does not change the record when regular file is set', function () {
    const file = new File([], 'amazing.me')
    const update = updateRecord(newPropertyName, file)

    expect(update(previousRecord).params[newPropertyName]).to.equal(file)
  })

  it('updates normal string', function () {
    const value = 'regular string value'
    const update = updateRecord(newPropertyName, value)

    expect(update(previousRecord).params[newPropertyName]).to.equal(value)
  })

  it('updates populated data when reference object is given', function () {
    const id = '1821292'
    const refRecord: RecordJSON = {
      id,
      title: 'Adolf',
      populated: {},
      errors: {},
      params: {
        name: 'Adolf',
      },
      recordActions: [],
      bulkActions: [],
    }

    const update = updateRecord(newPropertyName, id, refRecord)
    const updatedRecord = update(previousRecord)

    expect(updatedRecord.params[newPropertyName]).to.equal(id)
    expect(updatedRecord.populated[newPropertyName]).to.deep.equal(refRecord)
  })

  it('flattens value when object is given', function () {
    const value = {
      sub1: 'John',
      sub2: 'Doe',
    }

    const update = updateRecord(newPropertyName, value)
    const updatedRecord = update(previousRecord)

    expect(updatedRecord.params[`${newPropertyName}.sub1`]).to.equal(value.sub1)
    expect(updatedRecord.params[`${newPropertyName}.sub2`]).to.equal(value.sub2)
  })

  it('removes all previous array values also if they were flatten', function () {
    const value = ['value3', 'value4', 'value5']

    const update = updateRecord(arrayPropertyName, value)
    const updatedRecord = update(previousRecord)
    const unflattenParams = unflatten<Record<string, any>, any>(updatedRecord.params)

    expect(unflattenParams[arrayPropertyName]).to.deep.equal(value)
  })

  it('clears the populated value if it exists when no ref is given', function () {
    const value = undefined

    const update = updateRecord(populatedPropertyName, value)

    expect(update(previousRecord).populated[populatedPropertyName]).to.be.undefined
  })

  it('does not clear the value when empty string was given', function () {
    const value = ''

    const update = updateRecord(propertyName, value)

    expect(update(previousRecord).params[propertyName]).to.eq(value)
  })

  it('deletes the entire property when undefined was given', function () {
    const value = undefined

    const update = updateRecord(propertyName, value)
    const updatedRecord = update(previousRecord)

    expect(Object.keys(updatedRecord.params).find(key => key === propertyName)).to.be.undefined
  })

  it('properly sets nulls', function () {
    const value = null

    const update = updateRecord(propertyName, value)
    const updatedRecord = update(previousRecord)

    expect(updatedRecord.params[propertyName]).to.be.null
  })
})
