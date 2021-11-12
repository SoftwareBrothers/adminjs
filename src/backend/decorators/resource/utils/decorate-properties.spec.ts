import { expect } from 'chai'
import sinon, { SinonStubbedInstance } from 'sinon'
import { ResourceDecorator } from '..'
import AdminJS from '../../../../adminjs'
import { BaseProperty, BaseResource } from '../../../adapters'
import { PropertyOptions } from '../../property'

import { DecoratedProperties, decorateProperties } from './decorate-properties'


describe('decorateProperties', () => {
  const path = 'propertyPath'

  let admin: AdminJS
  let resource: SinonStubbedInstance<BaseResource> & BaseResource
  let decorator: SinonStubbedInstance<ResourceDecorator> & ResourceDecorator
  let property: BaseProperty

  let decoratedProperties: DecoratedProperties

  beforeEach(() => {
    admin = sinon.createStubInstance(AdminJS)
    resource = sinon.createStubInstance(BaseResource)
    decorator = sinon.createStubInstance(ResourceDecorator) as any
  })

  afterEach(() => {
    sinon.restore()
  })

  context('One property with options', () => {
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

    it('does not set `isVirtual` property', () => {
      const decorated = decoratedProperties[path]

      expect(decorated.isVirtual).to.eq(false)
    })
  })

  context('just options without any properties', () => {
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

    it('sets `isVirtual` property to true', () => {
      const decorated = decoratedProperties[path]

      expect(decorated.isVirtual).to.eq(true)
    })
  })

  context('nested properties in the database', () => {
    let subPropertyLevel1: BaseProperty
    let subPropertyLevel2: BaseProperty
    const newIsVisible = false
    const nestedPath = 'root.level1.level2'

    beforeEach(() => {
      property = new BaseProperty({ path: nestedPath.split('.')[0], type: 'mixed' })
      subPropertyLevel1 = new BaseProperty({ path: nestedPath.split('.')[1], type: 'mixed' })
      subPropertyLevel2 = new BaseProperty({ path: nestedPath.split('.')[2], type: 'mixed' })


      sinon.stub(property, 'subProperties').returns([subPropertyLevel1])
      sinon.stub(subPropertyLevel1, 'subProperties').returns([subPropertyLevel2])

      resource.properties.returns([property])
    })

    context('options were not set', () => {
      beforeEach(() => {
        decorator.options = { properties: { } }

        decoratedProperties = decorateProperties(resource, admin, decorator)
      })

      it('returns one property', () => {
        expect(Object.keys(decoratedProperties)).to.have.lengthOf(1)
      })

      it('returns only root property which is not virtual', () => {
        expect(decoratedProperties[nestedPath.split('.')[0]]).to.have.property('isVirtual', false)
      })
    })

    context('options were set for root property', () => {
      beforeEach(() => {
        decorator.options = { properties: { [nestedPath.split('.')[0]]: {
          isVisible: newIsVisible,
        } } }
        decoratedProperties = decorateProperties(resource, admin, decorator)
      })

      it('returns one property', () => {
        expect(Object.keys(decoratedProperties)).to.have.lengthOf(1)
      })

      it('changes its param', () => {
        expect(
          decoratedProperties[nestedPath.split('.')[0]].isVisible('show'),
        ).to.eq(newIsVisible)
      })
    })

    context('options were set for nested property', () => {
      beforeEach(() => {
        decorator.options = { properties: { [nestedPath]: {
          isVisible: newIsVisible,
        } } }
        decoratedProperties = decorateProperties(resource, admin, decorator)
      })

      it('returns one property', () => {
        expect(Object.keys(decoratedProperties)).to.have.lengthOf(1)
      })

      it('does not change the root property', () => {
        expect(
          decoratedProperties[nestedPath.split('.')[0]].isVisible('show'),
        ).not.to.eq(newIsVisible)
      })
    })
  })

  context('virtual nested properties and one db property', () => {
    beforeEach(() => {
      property = new BaseProperty({ path: 'otherProperty', type: 'mixed' })
      decorator.options = {
        properties: {
          root: {
            type: 'mixed',
          },
          'root.nested1': { type: 'string' },
          'root.nested2': { type: 'string' },
          'root.nested3': { type: 'string' },
          'root.nestedArray': {
            type: 'mixed',
            isArray: true,
          },
          'root.nestedArray.name': { type: 'string' },
          'root.nestedArray.surName': { type: 'string' },
          'otherProperty.name': { type: 'string' },
        },
      }
      resource.properties.returns([property])
      decoratedProperties = decorateProperties(resource, admin, decorator)
    })

    it('returns root properties: one db property and 1 virtual', () => {
      expect(Object.keys(decoratedProperties)).to.have.lengthOf(2)
    })

    it('nests 3 nested properties under the root mixed type', () => {
      const subProperties = decoratedProperties.root.subProperties()

      expect(subProperties).to.have.lengthOf(4)
    })

    it('nests 2 properties under the root.nestedArray mixed type', () => {
      const subProperties = decoratedProperties.root.subProperties()[3].subProperties()

      expect(subProperties).to.have.lengthOf(2)
    })

    it('nests 1 property under the `otherProperty` mixed dbProperty', () => {
      const subProperties = decoratedProperties.otherProperty.subProperties()

      expect(subProperties).to.have.lengthOf(1)
    })
  })
})
