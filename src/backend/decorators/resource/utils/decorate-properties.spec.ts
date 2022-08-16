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
    jest.restoreAllMocks()
  })

  describe('One property with options', () => {
    const isSortable = true
    const newIsSortable = false
    const type = 'boolean'

    beforeEach(() => {
      property = new BaseProperty({ path, type, isSortable })
      resource.properties.mockReturnValue([property])
      decorator.options = { properties: { [path]: { isSortable: newIsSortable } } }

      decoratedProperties = decorateProperties(resource, admin, decorator)
    })

    it('returns just this one property', () => {
      expect(Object.keys(decoratedProperties)).toHaveLength(1)
      expect(decoratedProperties[path]).toBeDefined()
    })

    it('decorates it that the isSortable is updated', () => {
      const decorated = decoratedProperties[path]

      expect(decorated.isSortable()).toBe(newIsSortable)
    })

    it('leaves all other fields like type unchanged', () => {
      const decorated = decoratedProperties[path]

      expect(decorated.type()).toBe(type)
    })

    it('does not set `isVirtual` property', () => {
      const decorated = decoratedProperties[path]

      expect(decorated.isVirtual).toBe(false)
    })
  })

  describe('just options without any properties', () => {
    const newType = 'string'
    const availableValues: PropertyOptions['availableValues'] = [
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' },
    ]

    beforeEach(() => {
      resource.properties.mockReturnValue([])
      decorator.options = { properties: { [path]: {
        type: newType,
        availableValues,
      } } }

      decoratedProperties = decorateProperties(resource, admin, decorator)
    })

    it('returns just this one property', () => {
      expect(Object.keys(decoratedProperties)).toHaveLength(1)
      expect(decoratedProperties[path]).toBeDefined()
    })

    it('decorates it that it has type and availableValues', () => {
      const decorated = decoratedProperties[path]

      expect(decorated.type()).toBe(newType)
      expect(decorated.availableValues()).toEqual(availableValues)
    })

    it('sets `isVirtual` property to true', () => {
      const decorated = decoratedProperties[path]

      expect(decorated.isVirtual).toBe(true)
    })
  })

  describe('nested properties in the database', () => {
    let subPropertyLevel1: BaseProperty
    let subPropertyLevel2: BaseProperty
    const newIsVisible = false
    const nestedPath = 'root.level1.level2'

    beforeEach(() => {
      property = new BaseProperty({ path: nestedPath.split('.')[0], type: 'mixed' })
      subPropertyLevel1 = new BaseProperty({ path: nestedPath.split('.')[1], type: 'mixed' })
      subPropertyLevel2 = new BaseProperty({ path: nestedPath.split('.')[2], type: 'mixed' })

      jest.spyOn(property, 'subProperties').mockClear().mockReturnValue([subPropertyLevel1])
      jest.spyOn(subPropertyLevel1, 'subProperties').mockClear().mockReturnValue([subPropertyLevel2])

      resource.properties.mockReturnValue([property])
    })

    describe('options were not set', () => {
      beforeEach(() => {
        decorator.options = { properties: { } }

        decoratedProperties = decorateProperties(resource, admin, decorator)
      })

      it('returns one property', () => {
        expect(Object.keys(decoratedProperties)).toHaveLength(1)
      })

      it('returns only root property which is not virtual', () => {
        expect(decoratedProperties[nestedPath.split('.')[0]]).toHaveProperty('isVirtual', false)
      })
    })

    describe('options were set for root property', () => {
      beforeEach(() => {
        decorator.options = { properties: { [nestedPath.split('.')[0]]: {
          isVisible: newIsVisible,
        } } }
        decoratedProperties = decorateProperties(resource, admin, decorator)
      })

      it('returns one property', () => {
        expect(Object.keys(decoratedProperties)).toHaveLength(1)
      })

      it('changes its param', () => {
        expect(
          decoratedProperties[nestedPath.split('.')[0]].isVisible('show'),
        ).toBe(newIsVisible)
      })
    })

    describe('options were set for nested property', () => {
      beforeEach(() => {
        decorator.options = { properties: { [nestedPath]: {
          isVisible: newIsVisible,
        } } }
        decoratedProperties = decorateProperties(resource, admin, decorator)
      })

      it('returns one property', () => {
        expect(Object.keys(decoratedProperties)).toHaveLength(1)
      })

      it('does not change the root property', () => {
        expect(
          decoratedProperties[nestedPath.split('.')[0]].isVisible('show'),
        ).not.toBe(newIsVisible)
      })
    })
  })

  describe('virtual nested properties and one db property', () => {
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
      resource.properties.mockReturnValue([property])
      decoratedProperties = decorateProperties(resource, admin, decorator)
    })

    it('returns root properties: one db property and 1 virtual', () => {
      expect(Object.keys(decoratedProperties)).toHaveLength(2)
    })

    it('nests 3 nested properties under the root mixed type', () => {
      const subProperties = decoratedProperties.root.subProperties()

      expect(subProperties).toHaveLength(4)
    })

    it('nests 2 properties under the root.nestedArray mixed type', () => {
      const subProperties = decoratedProperties.root.subProperties()[3].subProperties()

      expect(subProperties).toHaveLength(2)
    })

    it('nests 1 property under the `otherProperty` mixed dbProperty', () => {
      const subProperties = decoratedProperties.otherProperty.subProperties()

      expect(subProperties).toHaveLength(1)
    })
  })
})
