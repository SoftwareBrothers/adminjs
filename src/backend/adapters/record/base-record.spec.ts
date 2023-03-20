import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'

import { ParamsType } from './params.type.js'
import BaseRecord from './base-record.js'
import BaseResource from '../resource/base-resource.js'
import BaseProperty from '../property/base-property.js'
import ValidationError, { PropertyErrors } from '../../utils/errors/validation-error.js'
import RecordError from '../../utils/errors/record-error.js'
import { ActionDecorator, ResourceDecorator } from '../../decorators/index.js'

chai.use(chaiAsPromised)
chai.use(chaiChange)
chai.use(sinonChai)

describe('Record', function () {
  let record: BaseRecord
  let params: BaseRecord['params'] = { param1: 'john' }

  afterEach(function () {
    sinon.restore()
  })

  describe('#get', function () {
    context('record with nested parameters', function () {
      const nested3level = 'value'

      beforeEach(function () {
        params = {
          nested1level: { nested2level: { nested3level } },
        }
        record = new BaseRecord(params, {} as BaseResource)
      })

      it('returns deepest field when all up-level keys are given', function () {
        expect(record.get('nested1level.nested2level.nested3level')).to.equal(nested3level)
      })

      it('returns object when all up-level keys are given except one', function () {
        expect(record.get('nested1level.nested2level')).to.deep.equal({ nested3level })
      })

      it('returns object when only first level key is given', function () {
        expect(record.get('nested1level')).to.deep.equal({
          nested2level: { nested3level },
        })
      })

      it('returns undefined when passing unknown param', function () {
        expect(record.get('nested1level.nested2')).to.be.undefined
      })
    })
  })

  describe('#constructor', function () {
    it('returns empty object if params are not passed to the constructor', function () {
      record = new BaseRecord({}, {} as BaseResource)
      expect((record as any).params).to.deep.equal({})
    })

    it('stores flatten object params', function () {
      record = new BaseRecord({ auth: { login: 'login' } }, {} as BaseResource)
      expect((record as any).params).to.deep.equal({ 'auth.login': 'login' })
    })
  })

  describe('#save', function () {
    const newParams = { param2: 'doe' }
    const properties = [new BaseProperty({ path: '_id', isId: true })]
    let resource: BaseResource

    beforeEach(function () {
      resource = sinon.createStubInstance(BaseResource, {
        properties: sinon.stub<[], BaseProperty[]>().returns(properties),
        create: sinon.stub<[Record<string, any>], Promise<ParamsType>>()
          .resolves(newParams),
        update: sinon.stub<[string, Record<string, any>], Promise<ParamsType>>()
          .resolves(newParams),
      })
    })

    it('uses BaseResource#create method when there is no id property', async function () {
      record = new BaseRecord(newParams, resource)

      record.save()

      expect(resource.create).to.have.been.calledWith(newParams)
    })

    it('uses BaseResource#update method when there is a id property', function () {
      const _id = '1231231313'
      record = new BaseRecord({ ...newParams, _id }, resource)

      record.save()

      expect(resource.update).to.have.been.calledWith(_id, { ...newParams, _id })
    })

    it('stores validation error when they happen', async function () {
      const baseError: RecordError = {
        message: 'test base error',
      }
      const propertyErrors: PropertyErrors = {
        param2: {
          type: 'required',
          message: 'Field is required',
        },
      }
      resource.create = sinon.stub().rejects(new ValidationError(propertyErrors, baseError))
      record = new BaseRecord(newParams, resource)

      await record.save()

      expect(record.error('param2')).to.deep.equal(propertyErrors.param2)
      expect(record.baseError).to.deep.equal(baseError)
    })

    it('stores validation error when they happen (even when there is no baseError specified)', async function () {
      const propertyErrors: PropertyErrors = {
        param2: {
          type: 'required',
          message: 'Field is required',
        },
      }
      resource.create = sinon.stub().rejects(new ValidationError(propertyErrors))
      record = new BaseRecord(newParams, resource)

      await record.save()

      expect(record.error('param2')).to.deep.equal(propertyErrors.param2)
      expect(record.baseError).to.be.null
    })
  })

  describe('#update', function () {
    const newParams = { param2: 'doe' }
    const properties = [new BaseProperty({ path: '_id', isId: true })]
    params = { param1: 'john', _id: '1381723981273' }
    let resource: BaseResource

    context('resource stores the value', function () {
      beforeEach(async function () {
        resource = sinon.createStubInstance(BaseResource, {
          properties: sinon.stub<[], BaseProperty[]>().returns(properties),
          update: sinon.stub<[string, Record<string, any>], Promise<ParamsType>>()
            .resolves(newParams),
        })

        record = new BaseRecord(params, resource)

        await record.update(newParams)
      })

      it('stores what was returned by BaseResource#update to this.params', function () {
        expect(record.get('param2')).to.equal(newParams.param2)
      })

      it('resets the baseError when there is none', function () {
        expect((record as any).baseError).to.deep.equal(null)
      })

      it('resets the errors when there are none', function () {
        expect((record as any).errors).to.deep.equal({})
      })

      it('calls the BaseResource#update function with the id and new params', function () {
        expect(resource.update).to.have.been.calledWith(params._id, newParams)
      })
    })

    context('resource throws validation error', function () {
      const baseError: RecordError = {
        message: 'test base error',
      }
      const propertyErrors: PropertyErrors = {
        param2: {
          type: 'required',
          message: 'Field is required',
        },
      }

      beforeEach(async function () {
        resource = sinon.createStubInstance(BaseResource, {
          properties: sinon.stub<[], BaseProperty[]>().returns(properties),
          update: sinon.stub<[string, Record<string, any>], Promise<ParamsType>>()
            .rejects(new ValidationError(propertyErrors, baseError)),
        })

        record = new BaseRecord(params, resource)

        this.returnedValue = await record.update(newParams)
      })

      it('stores validation baseError', function () {
        expect(record.baseError).to.deep.equal(baseError)
      })

      it('stores validation errors', function () {
        expect(record.error('param2')).to.deep.equal(propertyErrors.param2)
      })

      it('returns itself', function () {
        expect(this.returnedValue).to.equal(record)
      })
    })
  })

  describe('#isValid', function () {
    it('returns true when there are no errors', function () {
      (record as any).errors = {}

      expect(record.isValid()).to.equal(true)
    })

    it('returns false when there is at least on error', function () {
      (record as any).errors = {
        pathWithError: { type: 'required', message: 'I am error' },
      }

      expect(record.isValid()).to.equal(false)
    })
  })

  describe('#title', function () {
    const properties = [new BaseProperty({ path: 'name' })]
    params = { name: 'john', _id: '1381723981273' }

    it('returns value in title property', function () {
      const resource = sinon.createStubInstance(BaseResource, {
        properties: sinon.stub<[], BaseProperty[]>().returns(properties),
      })

      record = new BaseRecord(params, resource)

      expect(record.title()).to.equal(params.name)
    })
  })

  describe('#populate', function () {
    it('sets populated field', function () {
      const populated = { value: new BaseRecord({}, {} as BaseResource) }

      record = new BaseRecord(params, {} as BaseResource)
      record.populate('value', populated.value)

      expect((record as any).populated.value).to.equal(populated.value)
    })

    it('clears populated field when record is null or undefined', () => {
      record = new BaseRecord(params, {} as BaseResource)
      record.populate('value', 'something' as any)

      expect(() => {
        record.populate('value', null)
      }).to.alter(() => record.populated.value, { from: 'something', to: undefined })
    })
  })

  describe('#toJSON', () => {
    const param = 'populatedProperty'
    let resource: BaseResource

    beforeEach(() => {
      resource = sinon.createStubInstance(BaseResource, {
        properties: sinon.stub<[], BaseProperty[]>().returns([]),
        decorate: sinon.stub<[], ResourceDecorator>().returns(
          sinon.createStubInstance(ResourceDecorator, {
            recordActions: sinon.stub<[BaseRecord], ActionDecorator[]>().returns([]),
            bulkActions: sinon.stub<[BaseRecord], ActionDecorator[]>().returns([]),
          }) as unknown as ResourceDecorator,
        ),
      })
      record = new BaseRecord(params, resource)
    })

    it('changes populated records to JSON', () => {
      const refRecord = sinon.createStubInstance(BaseRecord, {
        toJSON: sinon.stub(),
      })
      record.populate(param, refRecord)
      sinon.stub(record, 'id').returns('1')

      record.toJSON()

      expect(refRecord.toJSON).to.have.been.calledOnce
    })

    it('does not changes to JSON when in populated there is something else than BaseRecord', () => {
      record.populate(param, 'something else' as unknown as BaseRecord)
      sinon.stub(record, 'id').returns('1')

      expect(() => {
        record.toJSON()
      }).not.to.throw()
    })
  })
})
