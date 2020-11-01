import { expect } from 'chai'
import sinon from 'sinon'
import { PropertyType } from '../../../adapters/property/base-property'
import { BaseProperty } from '../../../adapters'
import { overrideFromOptions } from './override-from-options'


describe('overrideFromOptions', () => {
  const propertyName = 'type'
  const rawValue = 'boolean'
  const optionsValue = 'string'
  let property: BaseProperty

  beforeEach(() => {
    property = sinon.createStubInstance(BaseProperty, {
      [propertyName]: sinon.stub<[], PropertyType>().returns(rawValue),
    }) as unknown as BaseProperty
  })

  it('returns value from BaseProperty function when options are not given', () => {
    expect(overrideFromOptions(propertyName, property, {})).to.eq(rawValue)
  })

  it('returns value from options it is given', () => {
    expect(overrideFromOptions(propertyName, property, {
      [propertyName]: optionsValue,
    })).to.eq(optionsValue)
  })
})
