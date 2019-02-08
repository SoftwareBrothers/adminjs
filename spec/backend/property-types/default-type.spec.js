const defaultType = require('@backend/property-types/default-type')
const PropertyDecorator = require('@backend/decorators/property-decorator')
const BaseProperty = require('@backend/adapters/base-property')
const BaseRecord = require('@backend/adapters/base-record')
const AdminBro = require('@root/src/admin-bro')
const helperStub = require('../helpers/helper-stub')

describe('PropertyTypes.defaultType', function () {
  beforeEach(function () {
    this.h = helperStub(this.sinon)
    this.path = 'name'
    this.value = '<span>value</span>'
    this.escaped = '&lt;span&gt;value&lt;/span&gt;'
    this.record = new BaseRecord({ [this.path]: this.value })
    this.args = {
      property: new BaseProperty({ path: this.path, type: 'unknown' }),
      admin: new AdminBro(),
    }
  })

  describe('.list', function () {
    it('returns escaped value', function () {
      const decoratedProperty = new PropertyDecorator({ ...this.args, options: { isTitle: false } })
      expect(defaultType.list(decoratedProperty, this.record, this.h)).to.equal(this.escaped)
    })

    it('returns link when field is a title field', function () {
      const decoratedProperty = new PropertyDecorator({ ...this.args, options: { isTitle: true } })
      expect(defaultType.list(decoratedProperty, this.record, this.h)).to.equal(
        `<a href="${helperStub.expectedResult.showRecordUrl}">${this.escaped}</a>`,
      )
    })
  })

  describe('.show', function () {
    it('renders html', function () {
      const decoratedProperty = new PropertyDecorator(this.args)
      expect(defaultType.show(decoratedProperty, this.record, this.h)).to.have.string(this.escaped)
    })
  })

  describe('.edit', function () {
    it('renders label for an input', function () {
      const decoratedProperty = new PropertyDecorator(this.args)
      expect(defaultType.edit(decoratedProperty, this.record, this.h)).to.have.string('Name')
    })
  })

  describe('.filter', function () {
    it('renders label for an input', function () {
      const decoratedProperty = new PropertyDecorator(this.args)
      expect(defaultType.filter(decoratedProperty, {}, this.h)).to.have.string('Name')
    })
  })
})
