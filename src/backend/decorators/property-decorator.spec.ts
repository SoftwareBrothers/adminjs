import { expect } from 'chai'
import PropertyDecorator from './property-decorator'
import BaseProperty from '../adapters/base-property'
import AdminBro from '../../admin-bro'

describe('PropertyDecorator', function () {
  beforeEach(function () {
    this.property = new BaseProperty({ path: 'name', type: 'string' })
    this.stubbedAdmin = this.sinon.createStubInstance(AdminBro)
    this.stubbedAdmin.options = {}
    this.args = { property: this.property, admin: this.stubbedAdmin }
  })

  describe('#isSortable', function () {
    it('passes the execution to the base property', function () {
      this.sinon.stub(BaseProperty.prototype, 'isSortable').returns(false)
      expect(new PropertyDecorator(this.args).isSortable()).to.equal(false)
    })
  })

  describe('#isVisible', function () {
    it('passess execution to BaseProperty.isVisible for list when no options are specified', function () {
      expect(new PropertyDecorator(this.args).isVisible('list')).to.equal(this.property.isVisible())
    })

    it('passess execution to BaseProperty.isEditable for edit when no options are specified', function () {
      this.sinon.stub(BaseProperty.prototype, 'isVisible').returns(false)
      expect(new PropertyDecorator(this.args).isVisible('edit')).to.equal(this.property.isEditable())
    })

    it('sets new value when it is changed for all views by isVisible option', function () {
      const decorator = new PropertyDecorator({ ...this.args, options: { isVisible: false } })
      expect(decorator.isVisible('list')).to.equal(false)
      expect(decorator.isVisible('edit')).to.equal(false)
      expect(decorator.isVisible('show')).to.equal(false)
    })
  })

  const fields = ['isId', 'isTitle', 'type', 'name']

  fields.forEach((field) => {
    describe(`#${field}`, function () {
      it('passess the execution to the overrideFromOptions', function () {
        const stub = this.sinon.stub(PropertyDecorator.prototype, 'overrideFromOptions')
        new PropertyDecorator(this.args)[field]()
        // for some reason chai dont know that calledWith is a property
        const assertion = expect(stub).to.have.been as any
        assertion.calledWith(field)
      })
    })
  })

  describe('#overrideFromOptions', function () {
    beforeEach(function () {
      this.field = 'name'
      this.value = 'valueSetByAdapter'
      this.sinon.stub(BaseProperty.prototype, this.field).returns(this.value)
    })

    it('passess the execution to the BaseProperty when no option is given', function () {
      const res = new PropertyDecorator(this.args).overrideFromOptions(this.field)
      expect(res).to.equal(this.value)
    })

    it('returns the value from options when they were specified', function () {
      this.overridenValue = 'overridenValue'
      const res = new PropertyDecorator({
        ...this.args,
        options: { [this.field]: this.overridenValue } }).overrideFromOptions(this.field)
      expect(res).to.equal(this.overridenValue)
    })

    it('calls the modifier function when no options were given', function () {
      const newValue = 'someModifierFunctionValue'
      const res = new PropertyDecorator(this.args).overrideFromOptions(this.field, () => newValue)
      expect(res).to.equal(newValue)
    })
  })

  describe('#label', function () {
    it('returns camelcased name', function () {
      this.sinon.stub(BaseProperty.prototype, 'name').returns('normalname')
      expect(new PropertyDecorator(this.args).label()).to.equal('Normalname')
    })
  })

  describe('#availableValues', function () {
    it('map default value to { value, label } object', function () {
      this.sinon.stub(BaseProperty.prototype, 'availableValues').returns(['val'])
      expect(new PropertyDecorator(this.args).availableValues()).to.deep.equal([{
        value: 'val',
        label: 'val',
      }])
    })
  })

  describe('#position', function () {
    it('returns -1 for title field', function () {
      this.sinon.stub(BaseProperty.prototype, 'isTitle').returns(true)
      expect(new PropertyDecorator(this.args).position()).to.equal(-1)
    })

    it('returns 100 for all other fields', function () {
      this.sinon.stub(BaseProperty.prototype, 'isTitle').returns(false)
      expect(new PropertyDecorator(this.args).position()).to.equal(100)
    })

    it('returns 0 for an id field', function () {
      this.sinon.stub(BaseProperty.prototype, 'isTitle').returns(false)
      this.sinon.stub(BaseProperty.prototype, 'isId').returns(true)
      expect(new PropertyDecorator(this.args).position()).to.equal(0)
    })
  })

  describe('#toJSON', function () {
    it('returns JSON representation of a property', function () {
      expect(new PropertyDecorator(this.args).toJSON()).to.have.keys(
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
        'subProperties',
        'isArray',
      )
    })
  })
})
