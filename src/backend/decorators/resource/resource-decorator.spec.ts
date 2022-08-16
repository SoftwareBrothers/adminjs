import ResourceDecorator from './resource-decorator'
import PropertyDecorator from '../property/property-decorator'
import AdminJS, { defaultOptions } from '../../../adminjs'
import resourceStub, { expectedResult } from '../../../../spec/backend/helpers/resource-stub'
import BaseResource from '../../adapters/resource/base-resource'
import BaseRecord from '../../adapters/record/base-record'
import BaseProperty from '../../adapters/property/base-property'

const translatedLabel = 'translated label'
const currentAdmin = {
  email: 'some@email.com',
  name: 'someName',
  otherValue: 'someOther-value',
}

const stubAdminJS = (): AdminJS => {
  const stubbedAdmin = sinon.createStubInstance(AdminJS)
  return Object.assign(stubbedAdmin, {
    translateLabel: jest.fn().mockReturnValue(translatedLabel),
    translateProperty: jest.fn().mockReturnValue('translated property'),
    translateAction: jest.fn().mockReturnValue('translated action'),
    translateMessage: jest.fn().mockReturnValue('translate message'),
    options: { ...defaultOptions, rootPath: '/admin' },
  });
}

describe('ResourceDecorator', () => {
  let stubbedAdmin: AdminJS
  let stubbedRecord: any
  let stubbedResource: BaseResource
  let args

  beforeEach(() => {
    stubbedRecord = jest.fn()
    stubbedResource = resourceStub()
    stubbedResource._decorated = {
      id: () => 'resourceId',
    } as ResourceDecorator
    stubbedAdmin = stubAdminJS()
    args = {
      resource: stubbedResource, admin: stubbedAdmin,
    }
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('#getResourceName', () => {
    it('returns resource when name is not specified in options', () => {
      expect(
        new ResourceDecorator({ ...args, options: {} }).getResourceName(),
      ).toBe(translatedLabel)
    })
  })

  describe('#getNavigation', () => {
    it('returns custom name with icon when options were specified', () => {
      const options = {
        navigation: { name: 'someName', icon: 'someIcon', show: true },
      }
      expect(
        new ResourceDecorator({ ...args, options }).getNavigation(),
      ).toEqual(options.navigation)
    })
  })

  describe('#getProperties', () => {
    describe('all properties are visible', () => {
      beforeEach(() => {
        jest.spyOn(PropertyDecorator.prototype, 'isVisible').mockClear().mockReturnValue(true)
      })

      it('returns first n items when limit is given', () => {
        const max = 3
        const decorator = new ResourceDecorator(args)

        expect(
          decorator.getProperties({ where: 'list', max }),
        ).toHaveLength(max)
      })

      it('returns all properties when limit is not given', () => {
        const decorator = new ResourceDecorator(args)

        expect(
          decorator.getProperties({ where: 'list' }),
        ).toHaveLength(expectedResult.properties.length)
      })

      it(
        'returns only showProperties from options if they were given',
        () => {
          const path = expectedResult.properties[0].path()
          const decorator = new ResourceDecorator({ ...args,
            options: {
              showProperties: [path],
            } })

          expect(
            decorator.getProperties({ where: 'show' }),
          ).toHaveLength(1)
        }
      )
    })
  })

  describe('#resourceActions', () => {
    describe('no action were specified in custom settings', () => {
      let decorator: ResourceDecorator

      beforeEach(() => {
        const options = {}
        decorator = new ResourceDecorator({ ...args, options })
      })

      it('returns 2 default resource actions', () => {
        const actions = decorator.resourceActions(currentAdmin)
        const [action] = actions

        expect(actions).toHaveLength(2)
        expect(action).toHaveProperty('name', 'new')
      })
    })
  })

  describe('#getPropertyByKey', () => {
    let decorator: ResourceDecorator

    beforeEach(() => {
      decorator = new ResourceDecorator(args)
    })

    it('returns property by giving its key', () => {
      const propertyPath = expectedResult.properties[0].path()

      expect(
        decorator.getPropertyByKey(propertyPath),
      ).toBeInstanceOf(PropertyDecorator)
    })

    it('returns null when there is no property by given key', () => {
      expect(decorator.getPropertyByKey('some-unknown-name')).toBe(null)
    })

    it('returns mixed property', () => {
      const propertyPath = expectedResult.properties.find((p) => p.type() === 'mixed')?.path()

      expect(
        decorator.getPropertyByKey(propertyPath as string),
      ).toBeInstanceOf(PropertyDecorator)
    })

    it('returns nested property under mixed', () => {
      const property = expectedResult.properties.find((p) => p.type() === 'mixed') as BaseProperty
      const nested1Property = property?.subProperties().find((p) => p.type() !== 'mixed') as BaseProperty
      const path = [property.path(), nested1Property.path()].join('.')

      const decoratedProperty = decorator.getPropertyByKey(path) as PropertyDecorator

      expect(decoratedProperty).toBeInstanceOf(PropertyDecorator)
      expect(decoratedProperty.propertyPath).toBe(path)
    })

    it('returns nested property under 2 level nested mixed', () => {
      const property = expectedResult.properties.find((p) => p.type() === 'mixed') as BaseProperty
      const nested1Property = property?.subProperties().find((p) => p.type() === 'mixed') as BaseProperty
      const nested2Property = nested1Property?.subProperties()[0] as BaseProperty
      const path = [property.path(), nested1Property.path(), nested2Property.path()].join('.')

      const decoratedProperty = decorator.getPropertyByKey(path) as PropertyDecorator

      expect(decoratedProperty).toBeInstanceOf(PropertyDecorator)
      expect(decoratedProperty.propertyPath).toBe(path)
    })

    it('returns property when it is an array', () => {
      const arrayProperty = expectedResult.properties.find((p) => p.isArray()) as BaseProperty
      // checking of a property of first item in an array
      const path = [arrayProperty.path(), '0'].join('.')

      const decoratedProperty = decorator.getPropertyByKey(path) as PropertyDecorator

      expect(decoratedProperty).toBeInstanceOf(PropertyDecorator)
      expect(decoratedProperty.propertyPath).toBe(arrayProperty.path())
    })

    it('returns property when it is an nested array', () => {
      const arrayProperty = expectedResult.properties
        .find((p) => p.isArray() && p.type() === 'mixed') as BaseProperty
      const nested1Property = arrayProperty?.subProperties()[0] as BaseProperty

      // checking of a property of first item in an array
      const path = [arrayProperty.path(), '0', nested1Property.path()].join('.')

      const decoratedProperty = decorator.getPropertyByKey(path) as PropertyDecorator

      expect(decoratedProperty).toBeInstanceOf(PropertyDecorator)
      expect(decoratedProperty.propertyPath).toBe([arrayProperty.path(), nested1Property.path()].join('.'))
    })
  })

  describe('#recordAction', () => {
    it('returns default actions', () => {
      const actions = new ResourceDecorator({
        ...args, options: {},
      }).recordActions(stubbedRecord, currentAdmin)

      expect(actions).toHaveLength(3)
    })

    it('shows custom actions specified by the user', () => {
      const options = { actions: { customAction: { actionType: 'record' } } }
      const actions = new ResourceDecorator({
        ...args, options,
      }).recordActions(stubbedRecord, currentAdmin)

      expect(actions).toHaveLength(4)
    })

    it('hides the given action if user set isVisible to false', () => {
      const options = { actions: { show: { isVisible: false } } }
      const actions = new ResourceDecorator({
        ...args, options,
      }).recordActions(stubbedRecord, currentAdmin)

      expect(actions).toHaveLength(2)
    })

    it('passes properties to isVisible when it is a function', () => {
      const someRecord = { params: { param: 'someRecord' } } as unknown as BaseRecord
      const options = { actions: { show: { isVisible: (data) => {
        // it passes current admin to the isVisible function
        expect(data.currentAdmin).toEqual(currentAdmin)
        expect(data.resource.id).toBe(stubbedResource.id)
        expect(data.action.name).toBe('show')
        expect(data.record).toBe(someRecord)
        return false
      } } } }
      const actions = new ResourceDecorator({
        ...args, options,
      }).recordActions(someRecord, currentAdmin)

      expect(actions).toHaveLength(2)
    })
  })

  describe('#toJSON', () => {
    it('returns JSON representation of a resource', () => {
      const json = new ResourceDecorator(args).toJSON(currentAdmin)
      expect(Object.keys(json)).toEqual(expect.arrayContaining([
        'id',
        'name',
        'navigation',
        'href',
        'actions',
        'titleProperty',
        'resourceActions',
        'listProperties',
        'editProperties',
        'showProperties',
        'filterProperties',
        'properties'
      ]))
    })

    it('passes current admin to the resourceActions', () => {
      const resourceActionsSpy = jest.spyOn(ResourceDecorator.prototype, 'resourceActions').mockClear()

      new ResourceDecorator(args).toJSON(currentAdmin)

      expect(resourceActionsSpy).toBeCalledWith(currentAdmin)
    })
  })
})
