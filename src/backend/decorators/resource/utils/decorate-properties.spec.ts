import { expect } from 'chai'
import sinon, { SinonStubbedInstance } from 'sinon'
import { ResourceDecorator } from '..'
import AdminBro from '../../../../admin-bro'
import { BaseProperty, BaseResource } from '../../../adapters'
import { PropertyOptions } from '../../property'

import { DecoratedProperties, decorateProperties } from './decorate-properties'


describe('decorateProperties', () => {
  const path = 'propertyPath'

  let admin: AdminBro
  let resource: SinonStubbedInstance<BaseResource> & BaseResource
  let decorator: SinonStubbedInstance<ResourceDecorator> & ResourceDecorator
  let property: BaseProperty

  beforeEach(() => {
    admin = sinon.createStubInstance(AdminBro)
    resource = sinon.createStubInstance(BaseResource)
    decorator = sinon.createStubInstance(ResourceDecorator) as any
  })

  afterEach(() => {
    sinon.restore()
  })

  context('One property with options', () => {
    let decoratedProperties: DecoratedProperties
    const isSortable = true
    const newIsSortable = false
    const type = 'boolean'

    beforeEach(() => {
      property = new BaseProperty({ path, type, isSortable })
      resource.properties.returns([property])
      decorator.options = { properties: { [path]: { isSortable: newIsSortable } } }

      decoratedProperties = decorateProperties(resource, admin, decorator)
    })

    it('returns just this one property', () => {
      expect(Object.keys(decoratedProperties)).to.have.lengthOf(1)
      expect(decoratedProperties[path]).not.to.be.undefined
    })

    it('decorates it that the isSortable is updated', () => {
      const decorated = decoratedProperties[path]

      expect(decorated.isSortable()).to.eq(newIsSortable)
    })

    it('leaves all other fields like type unchanged', () => {
      const decorated = decoratedProperties[path]

      expect(decorated.type()).to.eq(type)
    })
  })

  context('just options without any properties', () => {
    let decoratedProperties: DecoratedProperties
    const newType = 'string'
    const availableValues: PropertyOptions['availableValues'] = [
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' },
    ]

    beforeEach(() => {
      resource.properties.returns([])
      decorator.options = { properties: { [path]: {
        type: newType,
        availableValues,
      } } }

      decoratedProperties = decorateProperties(resource, admin, decorator)
    })

    it('returns just this one property', () => {
      expect(Object.keys(decoratedProperties)).to.have.lengthOf(1)
      expect(decoratedProperties[path]).not.to.be.undefined
    })

    it('decorates it that it has type and availableValues', () => {
      const decorated = decoratedProperties[path]

      expect(decorated.type()).to.eq(newType)
      expect(decorated.availableValues()).to.deep.eq(availableValues)
    })
  })
})
