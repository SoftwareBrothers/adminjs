import { expect } from 'chai'
import sinon, { SinonStubbedInstance } from 'sinon'

import PropertyDecorator from './property-decorator'
import BaseProperty from '../../adapters/property/base-property'
import AdminBro from '../../../admin-bro'
import ResourceDecorator from '../resource/resource-decorator'
import { BaseResource } from '../../adapters'

describe('PropertyDecorator', () => {
  const translatedProperty = 'translated property'
  let stubbedAdmin: SinonStubbedInstance<AdminBro> & AdminBro
  let property: BaseProperty
  let args: {
    property: BaseProperty;
    admin: typeof stubbedAdmin;
    resource: ResourceDecorator;
  }

  beforeEach(() => {
    property = new BaseProperty({ path: 'name', type: 'string' })
    stubbedAdmin = sinon.createStubInstance(AdminBro)
    stubbedAdmin.translateProperty = sinon.stub().returns(translatedProperty) as any
    args = { property, admin: stubbedAdmin, resource: { id: () => 'someId' } as ResourceDecorator }
  })

  describe('#isSortable', () => {
    it('passes the execution to the base property', () => {
      sinon.stub(BaseProperty.prototype, 'isSortable').returns(false)
      expect(new PropertyDecorator(args).isSortable()).to.equal(false)
    })
  })

  describe('#isVisible', () => {
    it('passes execution to BaseProperty.isVisible for list when no options are specified', () => {
      expect(new PropertyDecorator(args).isVisible('list')).to.equal(property.isVisible())
    })

    it('passes execution to BaseProperty.isEditable for edit when no options are specified', () => {
      sinon.stub(BaseProperty.prototype, 'isVisible').returns(false)
      expect(new PropertyDecorator(args).isVisible('edit')).to.equal(property.isEditable())
    })

    it('sets new value when it is changed for all views by isVisible option', () => {
      const decorator = new PropertyDecorator({ ...args, options: { isVisible: false } })
      expect(decorator.isVisible('list')).to.equal(false)
      expect(decorator.isVisible('edit')).to.equal(false)
      expect(decorator.isVisible('show')).to.equal(false)
    })
  })

  describe('#label', () => {
    it('returns translated label', () => {
      sinon.stub(BaseProperty.prototype, 'name').returns('normalName')
      expect(new PropertyDecorator(args).label()).to.equal(translatedProperty)
    })
  })

  describe('#reference', () => {
    const rawReferenceValue = 'Article'
    const optionsReferenceValue = 'BlogPost'
    const ReferenceResource = 'OtherResource' as unknown as BaseResource

    beforeEach(() => {
      property = new BaseProperty({ path: 'externalId', type: 'reference' })
      sinon.stub(property, 'reference').returns(rawReferenceValue)
      args.admin.findResource.returns(ReferenceResource)
    })

    it('returns model from AdminBro for reference name in properties', () => {
      new PropertyDecorator({ ...args, property }).reference()

      expect(args.admin.findResource).to.have.been.calledWith(rawReferenceValue)
    })

    it('returns model from options when they are given', () => {
      new PropertyDecorator({
        ...args,
        property,
        options: {
          reference: optionsReferenceValue,
        },
      }).reference()

      expect(args.admin.findResource).to.have.been.calledWith(optionsReferenceValue)
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

      expect(decorator.type()).to.equal('reference')
    })

    it('returns property reference when no options are given', () => {
      const decorator = new PropertyDecorator({ ...args, property })

      expect(decorator.type()).to.equal(propertyType)
    })
  })


  describe('#availableValues', () => {
    it('map default value to { value, label } object and uses translations', () => {
      sinon.stub(BaseProperty.prototype, 'availableValues').returns(['val'])
      expect(new PropertyDecorator(args).availableValues()).to.deep.equal([{
        value: 'val',
        label: translatedProperty,
      }])
    })
  })

  describe('#position', () => {
    it('returns -1 for title field', () => {
      sinon.stub(BaseProperty.prototype, 'isTitle').returns(true)
      expect(new PropertyDecorator(args).position()).to.equal(-1)
    })

    it('returns 101 for second field', () => {
      sinon.stub(BaseProperty.prototype, 'isTitle').returns(false)
      expect(new PropertyDecorator(args).position()).to.equal(101)
    })

    it('returns 0 for an id field', () => {
      sinon.stub(BaseProperty.prototype, 'isTitle').returns(false)
      sinon.stub(BaseProperty.prototype, 'isId').returns(true)
      expect(new PropertyDecorator(args).position()).to.equal(0)
    })
  })

  describe('#subProperties', () => {
    let propertyDecorator: PropertyDecorator
    const propertyName = 'super'
    const subPropertyName = 'nested'
    const subPropertyLabel = 'nestedLabel'

    beforeEach(() => {
      property = new BaseProperty({ path: propertyName, type: 'string' })
      sinon.stub(property, 'subProperties').returns([
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
      expect(propertyDecorator.subProperties()).to.have.lengthOf(1)
      expect(propertyDecorator.subProperties()[0]).to.be.instanceOf(PropertyDecorator)
    })

    it('changes label of the nested property to what was given in PropertyOptions', () => {
      const subProperty = propertyDecorator.subProperties()[0]

      expect(subProperty.label()).to.eq(translatedProperty)
    })
  })

  describe('#toJSON', () => {
    it('returns JSON representation of a property', () => {
      expect(new PropertyDecorator(args).toJSON()).to.have.keys(
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
      )
    })
  })

  afterEach(() => {
    sinon.restore()
  })
})
