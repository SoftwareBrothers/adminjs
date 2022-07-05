import sinon from 'sinon'
import { expect } from 'chai'

import { ActionContext } from '../../actions/action.interface'
import BaseResource from '../../adapters/resource/base-resource'
import { CurrentAdmin } from '../../../current-admin.interface'
import BaseRecord from '../../adapters/record/base-record'
import ValidationError from '../../utils/errors/validation-error'

import ActionErrorHandler from './action-error-handler'
import ForbiddenError from '../../utils/errors/forbidden-error'
import { ActionDecorator } from '../../decorators'

describe('ActionErrorHandler', function () {
  let resource: BaseResource
  let record: BaseRecord
  let translateMessage
  let context: ActionContext
  let action: ActionDecorator
  const notice = {
    message: 'stubbed translation message',
    type: 'error',
  }
  const currentAdmin = {} as CurrentAdmin

  beforeEach(function () {
    resource = sinon.createStubInstance(BaseResource)
    record = sinon.createStubInstance(BaseRecord) as unknown as BaseRecord
    translateMessage = sinon.stub().returns(notice.message)
    action = { name: 'myAction' } as ActionDecorator
    context = { resource, record, currentAdmin, translateMessage, action } as ActionContext
  })

  afterEach(function () {
    sinon.restore()
  })

  it('returns record with validation error when ValidationError is thrown', function () {
    const errors = {
      fieldWithError: {
        type: 'required', message: 'Field is required',
      } }
    const error = new ValidationError(errors)

    expect(ActionErrorHandler(error, context)).to.deep.equal({
      record: {
        baseError: null,
        errors,
        params: {},
        populated: {},
      },
      notice,
      records: [],
      meta: undefined,
    })
  })

  it('returns meta when ValidationError is thrown for the list action', function () {
    const errors = {
      fieldWithError: {
        type: 'required', message: 'Field is required',
      } }
    const error = new ValidationError(errors)
    action.name = 'list'

    expect(ActionErrorHandler(error, context)).to.deep.equal({
      record: {
        baseError: null,
        errors,
        params: {},
        populated: {},
      },
      notice,
      records: [],
      meta: {
        total: 0,
        perPage: 0,
        page: 0,
        direction: null,
        sortBy: null,
      },
    })
  })

  it('throws any undefined error back to the app', function () {
    const unknownError = new Error()

    expect(() => {
      ActionErrorHandler(unknownError, context)
    }).to.throw(unknownError)
  })

  it('returns record with forbidden error when ForbiddenError is thrown', function () {
    const errorMessage = 'you cannot perform this action'
    const error = new ForbiddenError(errorMessage)

    expect(ActionErrorHandler(error, context)).to.deep.equal({
      record: {
        baseError: null,
        errors: {},
        params: {},
        populated: {},
      },
      records: [],
      notice: {
        message: errorMessage,
        type: 'error',
      },
      meta: undefined,
    })
  })

  it('returns meta when ForbiddenError is thrown for the list action', function () {
    const errorMessage = 'you cannot perform this action'
    const error = new ForbiddenError(errorMessage)
    action.name = 'list'

    expect(ActionErrorHandler(error, context)).to.deep.equal({
      record: {
        baseError: null,
        errors: {},
        params: {},
        populated: {},
      },
      notice: {
        message: errorMessage,
        type: 'error',
      },
      records: [],
      meta: {
        total: 0,
        perPage: 0,
        page: 0,
        direction: null,
        sortBy: null,
      },
    })
  })
})
