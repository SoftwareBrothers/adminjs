import PropertyDecorator from './property-decorator'
import BaseProperty from '../../adapters/property/base-property'
import AdminJS from '../../../adminjs'
import ResourceDecorator from '../resource/resource-decorator'
import { BaseResource } from '../../adapters'

describe('PropertyDecorator', () => {
  const translatedProperty = 'translated property'
  let stubbedAdmin: SinonStubbedInstance<AdminJS> & AdminJS
  let property: BaseProperty
  let args: {
    property: BaseProperty;
    admin: typeof stubbedAdmin;
    resource: ResourceDecorator;
  }

  beforeEach(() => {
    property = new BaseProperty({ path: 'name', type: 'string' })
    stubbedAdmin = sinon.createStubInstance(AdminJS)
    stubbedAdmin.translateProperty = jest.fn().mockReturnValue(translatedProperty) as any
    args = { property, admin: stubbedAdmin, resource: { id: () => 'someId' } as ResourceDecorator }
  })

  describe('#isSortable', () => {
    it('passes the execution to the base property', () => {
      jest.spyOn(BaseProperty.prototype, 'isSortable').mockClear().mockReturnValue(false)
      expect(new PropertyDecorator(args).isSortable()).toBe(false)
    })
  })

  describe('#isVisible', () => {
    it(
      'passes execution to BaseProperty.isVisible for list when no options are specified',
      () => {
        expect(new PropertyDecorator(args).isVisible('list')).toBe(property.isVisible())
      }
    )

    it(
      'passes execution to BaseProperty.isEditable for edit when no options are specified',
      () => {
        jest.spyOn(BaseProperty.prototype, 'isVisible').mockClear().mockReturnValue(false)
        expect(new PropertyDecorator(args).isVisible('edit')).toBe(property.isEditable())
      }
    )

    it(
      'sets new value when it is changed for all views by isVisible option',
      () => {
        const decorator = new PropertyDecorator({ ...args, options: { isVisible: false } })
        expect(decorator.isVisible('list')).toBe(false)
        expect(decorator.isVisible('edit')).toBe(false)
        expect(decorator.isVisible('show')).toBe(false)
      }
    )
  })

  describe('#label', () => {
    it('returns translated label', () => {
      jest.spyOn(BaseProperty.prototype, 'name').mockClear().mockReturnValue('normalName')
      expect(new PropertyDecorator(args).label()).toBe(translatedProperty)
    })
  })

  describe('#reference', () => {
    const rawReferenceValue = 'Article'
    const optionsReferenceValue = 'BlogPost'
    const ReferenceResource = 'OtherResource' as unknown as BaseResource

    beforeEach(() => {
      property = new BaseProperty({ path: 'externalId', type: 'reference' })
      jest.spyOn(property, 'reference').mockClear().mockReturnValue(rawReferenceValue)
      args.admin.findResource.mockReturnValue(ReferenceResource)
    })

    it('returns model from AdminJS for reference name in properties', () => {
      new PropertyDecorator({ ...args, property }).reference()

      expect(args.admin.findResource).toBeCalledWith(rawReferenceValue)
    })

    it('returns model from options when they are given', () => {
      new PropertyDecorator({
        ...args,
        property,
        options: {
          reference: optionsReferenceValue,
        },
      }).reference()

      expect(args.admin.findResource).toBeCalledWith(optionsReferenceValue)
    })
  })

  describe('#type', () => {
    const propertyType = 'boolean'

    beforeEach(() => {
      property = new BaseProperty({ path: 'externalId', type: propertyType })
    })

    it('returns `reference` type if reference is set in options', () => {
      const decorator = new PropertyDecorator({
        ...args,
        property,
        options: {
          reference: 'SomeReference',
        } })

      expect(decorator.type()).toBe('reference')
    })

    it('returns property reference when no options are given', () => {
      const decorator = new PropertyDecorator({ ...args, property })

      expect(decorator.type()).toBe(propertyType)
    })
  })

  describe('#availableValues', () => {
    it(
      'map default value to { value, label } object and uses translations',
      () => {
        jest.spyOn(BaseProperty.prototype, 'availableValues').mockClear().mockReturnValue(['val'])
        expect(new PropertyDecorator(args).availableValues()).toEqual([{
          value: 'val',
          label: translatedProperty,
        }])
      }
    )
  })

  describe('#position', () => {
    it('returns -1 for title field', () => {
      jest.spyOn(BaseProperty.prototype, 'isTitle').mockClear().mockReturnValue(true)
      expect(new PropertyDecorator(args).position()).toBe(-1)
    })

    it('returns 101 for second field', () => {
      jest.spyOn(BaseProperty.prototype, 'isTitle').mockClear().mockReturnValue(false)
      expect(new PropertyDecorator(args).position()).toBe(101)
    })

    it('returns 0 for an id field', () => {
      jest.spyOn(BaseProperty.prototype, 'isTitle').mockClear().mockReturnValue(false)
      jest.spyOn(BaseProperty.prototype, 'isId').mockClear().mockReturnValue(true)
      expect(new PropertyDecorator(args).position()).toBe(0)
    })
  })

  describe('#subProperties', () => {
    let propertyDecorator: PropertyDecorator
    const propertyName = 'super'
    const subPropertyName = 'nested'
    const subPropertyLabel = 'nestedLabel'

    beforeEach(() => {
      property = new BaseProperty({ path: propertyName, type: 'string' })
      jest.spyOn(property, 'subProperties').mockClear().mockReturnValue([
        new BaseProperty({ path: subPropertyName, type: 'string' }),
      ])

      propertyDecorator = new PropertyDecorator({
        ...args,
        property,
        resource: {
          id: () => 'resourceId',
          options: { properties: {
            [`${propertyName}.${subPropertyName}`]: { label: subPropertyLabel },
          } } } as unknown as ResourceDecorator,
      })
    })

    it('returns the array of decorated properties', () => {
      expect(propertyDecorator.subProperties()).toHaveLength(1)
      expect(propertyDecorator.subProperties()[0]).toBeInstanceOf(PropertyDecorator)
    })

    it(
      'changes label of the nested property to what was given in PropertyOptions',
      () => {
        const subProperty = propertyDecorator.subProperties()[0]

        expect(subProperty.label()).toBe(translatedProperty)
      }
    )
  })

  describe('#toJSON', () => {
    it('returns JSON representation of a property', () => {
      expect(Object.keys(new PropertyDecorator(args).toJSON())).toEqual(expect.arrayContaining([
        'isTitle',
        'isId',
        'position',
        'isSortable',
        'availableValues',
        'name',
        'label',
        'type',
        'reference',
        'components',
        'isDisabled',
        'subProperties',
        'isArray',
        'isDraggable',
        'custom',
        'resourceId',
        'propertyPath',
        'isRequired',
        'isVirtual',
        'props',
        'hideLabel',
        'description'
      ]))
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
