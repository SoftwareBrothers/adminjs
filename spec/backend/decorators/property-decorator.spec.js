const PropertyDecorator = require('../../../src/backend/decorators/property-decorator')
const BaseProperty = require('../../../src/backend/adapters/base-property')
const AdminBro = require('../../../src/admin-bro')

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

  const fields = ['isId', 'isTitle', 'type']

  fields.forEach((field) => {
    describe(`#${field}`, function () {
      it('passess the execution to the BaseProperty when no option is given', function () {
        this.sinon.stub(BaseProperty.prototype, field).returns(true)
        expect(new PropertyDecorator(this.args)[field]()).to.equal(this.property[field]())
      })

      it('returns the value from options when they were specified', function () {
        this.sinon.stub(BaseProperty.prototype, field).returns(false)
        expect(
          new PropertyDecorator({ ...this.args, options: { [field]: true } })[field](),
        ).to.equal(true)
      })
    })
  })
})
