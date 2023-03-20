import sinon from 'sinon'
import { expect } from 'chai'

import { ActionContext } from '../../actions/action.interface.js'
import BaseResource from '../../adapters/resource/base-resource.js'
import { CurrentAdmin } from '../../../current-admin.interface.js'
import BaseRecord from '../../adapters/record/base-record.js'
import ValidationError from '../../utils/errors/validation-error.js'
import ActionErrorHandler from './action-error-handler.js'
import ForbiddenError from '../../utils/errors/forbidden-error.js'
import { ActionDecorator } from '../../decorators/index.js'

describe('ActionErrorHandler', function () {
  let resource: BaseResource
  let record: BaseRecord
  let context: ActionContext
  let action: ActionDecorator
  const notice = {
    message: 'thereWereValidationErrors',
    type: 'error',
  }
  const currentAdmin = {} as CurrentAdmin

  beforeEach(function () {
    resource = sinon.createStubInstance(BaseResource)
    record = sinon.createStubInstance(BaseRecord) as unknown as BaseRecord
    // translateMessage = sinon.stub().returns(notice.message)
    action = { name: 'myAction' } as ActionDecorator
    context = { resource, record, currentAdmin, action } as ActionContext
  })

  afterEach(function () {
    sinon.restore()
  })

  it('returns record with validation error when ValidationError is thrown', function () {
    const errors = {
      fieldWithError: {
        type: 'required', message: 'Field is required',
      },
    }
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
      },
    }
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
    const errorMessage = 'You cannot perform this action'
    const error = new ForbiddenError(errorMessage)

    expect(ActionErrorHandler(error, context)).to.deep.equal({
      record: {
        baseError: {
          message: errorMessage,
          type: 'ForbiddenError',
        },
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
    const errorMessage = 'You cannot perform this action'
    const error = new ForbiddenError(errorMessage)
    action.name = 'list'

    expect(ActionErrorHandler(error, context)).to.deep.equal({
      record: {
        baseError: {
          message: errorMessage,
          type: 'ForbiddenError',
        },
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
