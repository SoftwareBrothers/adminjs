import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import { ParamsType } from './params.type'

import BaseRecord from './base-record'
import BaseResource from '../resource/base-resource'
import BaseProperty from '../property/base-property'
import ValidationError, { PropertyErrors, RecordError } from '../../utils/errors/validation-error'
import { ActionDecorator, ResourceDecorator } from '../../decorators'

chai.use(chaiAsPromised)
chai.use(chaiChange)
chai.use(sinonChai)

describe('Record', () => {
  let testContext: any;

  beforeEach(() => {
    testContext = {};
  });

  let record: BaseRecord
  let params: BaseRecord['params'] = { param1: 'john' }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('#get', () => {
    describe('record with nested parameters', () => {
      const nested3level = 'value'

      beforeEach(() => {
        params = {
          nested1level: { nested2level: { nested3level } },
        }
        record = new BaseRecord(params, {} as BaseResource)
      })

      it('returns deepest field when all up-level keys are given', () => {
        expect(record.get('nested1level.nested2level.nested3level')).to.equal(nested3level)
      })

      it(
        'returns object when all up-level keys are given except one',
        () => {
          expect(record.get('nested1level.nested2level')).to.deep.equal({ nested3level })
        }
      )

      it('returns object when only first level key is given', () => {
        expect(record.get('nested1level')).to.deep.equal({
          nested2level: { nested3level },
        })
      })

      it('returns undefined when passing unknown param', () => {
        expect(record.get('nested1level.nested2')).to.be.undefined
      })
    })
  })

  describe('#constructor', () => {
    it(
      'returns empty object if params are not passed to the constructor',
      () => {
        record = new BaseRecord({}, {} as BaseResource)
        expect((record as any).params).to.deep.equal({})
      }
    )

    it('stores flatten object params', () => {
      record = new BaseRecord({ auth: { login: 'login' } }, {} as BaseResource)
      expect((record as any).params).to.deep.equal({ 'auth.login': 'login' })
    })
  })

  describe('#save', () => {
    const newParams = { param2: 'doe' }
    const properties = [new BaseProperty({ path: '_id', isId: true })]
    let resource: BaseResource

    beforeEach(() => {
      resource = sinon.createStubInstance(BaseResource, {
        properties: jest.fn().mockReturnValue(properties),
        create: jest.fn()
          .resolves(newParams),
        update: jest.fn()
          .resolves(newParams),
      })
    })

    it(
      'uses BaseResource#create method when there is no id property',
      async () => {
        record = new BaseRecord(newParams, resource)

        record.save()

        expect(resource.create).to.have.been.calledWith(newParams)
      }
    )

    it(
      'uses BaseResource#update method when there is a id property',
      () => {
        const _id = '1231231313'
        record = new BaseRecord({ ...newParams, _id }, resource)

        record.save()

        expect(resource.update).to.have.been.calledWith(_id, { ...newParams, _id })
      }
    )

    it('stores validation error when they happen', async () => {
      const baseError: RecordError = {
        message: 'test base error',
      }
      const propertyErrors: PropertyErrors = {
        param2: {
          type: 'required',
          message: 'Field is required',
        },
      }
      resource.create = jest.fn().rejects(new ValidationError(propertyErrors, baseError))
      record = new BaseRecord(newParams, resource)

      await record.save()

      expect(record.error('param2')).to.deep.equal(propertyErrors.param2)
      expect(record.baseError).to.deep.equal(baseError)
    })

    it(
      'stores validation error when they happen (even when there is no baseError specified)',
      async () => {
        const propertyErrors: PropertyErrors = {
          param2: {
            type: 'required',
            message: 'Field is required',
          },
        }
        resource.create = jest.fn().rejects(new ValidationError(propertyErrors))
        record = new BaseRecord(newParams, resource)

        await record.save()

        expect(record.error('param2')).to.deep.equal(propertyErrors.param2)
        expect(record.baseError).to.be.null
      }
    )
  })

  describe('#update', () => {
    const newParams = { param2: 'doe' }
    const properties = [new BaseProperty({ path: '_id', isId: true })]
    params = { param1: 'john', _id: '1381723981273' }
    let resource: BaseResource

    describe('resource stores the value', () => {
      beforeEach(async () => {
        resource = sinon.createStubInstance(BaseResource, {
          properties: jest.fn().mockReturnValue(properties),
          update: jest.fn()
            .resolves(newParams),
        })

        record = new BaseRecord(params, resource)

        await record.update(newParams)
      })

      it(
        'stores what was returned by BaseResource#update to this.params',
        () => {
          expect(record.get('param2')).to.equal(newParams.param2)
        }
      )

      it('resets the baseError when there is none', () => {
        expect((record as any).baseError).to.deep.equal(null)
      })

      it('resets the errors when there are none', () => {
        expect((record as any).errors).to.deep.equal({})
      })

      it(
        'calls the BaseResource#update function with the id and new params',
        () => {
          expect(resource.update).to.have.been.calledWith(params._id, newParams)
        }
      )
    })

    describe('resource throws validation error', () => {
      const baseError: RecordError = {
        message: 'test base error',
      }
      const propertyErrors: PropertyErrors = {
        param2: {
          type: 'required',
          message: 'Field is required',
        },
      }

      beforeEach(async () => {
        resource = sinon.createStubInstance(BaseResource, {
          properties: jest.fn().mockReturnValue(properties),
          update: jest.fn()
            .rejects(new ValidationError(propertyErrors, baseError)),
        })

        record = new BaseRecord(params, resource)

        testContext.returnedValue = await record.update(newParams)
      })

      it('stores validation baseError', () => {
        expect(record.baseError).to.deep.equal(baseError)
      })

      it('stores validation errors', () => {
        expect(record.error('param2')).to.deep.equal(propertyErrors.param2)
      })

      it('returns itself', () => {
        expect(testContext.returnedValue).to.equal(record)
      })
    })
  })

  describe('#isValid', () => {
    it('returns true when there are no errors', () => {
      (record as any).errors = {}

      expect(record.isValid()).to.equal(true)
    })

    it('returns false when there is at least on error', () => {
      (record as any).errors = {
        pathWithError: { type: 'required', message: 'I am error' },
      }

      expect(record.isValid()).to.equal(false)
    })
  })

  describe('#title', () => {
    const properties = [new BaseProperty({ path: 'name' })]
    params = { name: 'john', _id: '1381723981273' }

    it('returns value in title property', () => {
      const resource = sinon.createStubInstance(BaseResource, {
        properties: jest.fn().mockReturnValue(properties),
      })

      record = new BaseRecord(params, resource)

      expect(record.title()).to.equal(params.name)
    })
  })

  describe('#populate', () => {
    it('sets populated field', () => {
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
        properties: jest.fn().mockReturnValue([]),
        decorate: jest.fn().mockReturnValue(
          sinon.createStubInstance(ResourceDecorator, {
            recordActions: jest.fn().mockReturnValue([]),
            bulkActions: jest.fn().mockReturnValue([]),
          }) as unknown as ResourceDecorator,
        ),
      })
      record = new BaseRecord(params, resource)
    })

    it('changes populated records to JSON', () => {
      const refRecord = sinon.createStubInstance(BaseRecord, {
        toJSON: jest.fn(),
      })
      record.populate(param, refRecord)
      jest.spyOn(record, 'id').mockClear().mockReturnValue('1')

      record.toJSON()

      expect(refRecord.toJSON).to.have.been.calledOnce
    })

    it(
      'does not changes to JSON when in populated there is something else than BaseRecord',
      () => {
        record.populate(param, 'something else' as unknown as BaseRecord)
        jest.spyOn(record, 'id').mockClear().mockReturnValue('1')

        expect(() => {
          record.toJSON()
        }).not.to.throw()
      }
    )
  })
})
