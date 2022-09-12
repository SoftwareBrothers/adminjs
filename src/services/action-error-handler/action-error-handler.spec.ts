import sinon from 'sinon'
import { expect } from 'chai'
import { CurrentAdmin } from '@adminjs/common/interfaces'
import { ValidationError, ForbiddenError } from '@adminjs/common/errors'

import { ActionContext } from '../../actions/action.interface'
import BaseResource from '../../adapters/resource/base-resource'
import BaseRecord from '../../adapters/record/base-record'
import ActionErrorHandler from './action-error-handler'
import { ActionDecorator } from '../../decorators'

describe('ActionErrorHandler', function () {
  let resource: BaseResource
  let record: BaseRecord
  let context: ActionContext
  let action: ActionDecorator
  const notice = {
    message: 'thereWereValidationErrors',
    resourceId: 'resourceId',
    type: 'error',
  }
  const currentAdmin = {} as CurrentAdmin

  beforeEach(function () {
    resource = sinon.createStubInstance(BaseResource, { id: 'resourceId' })
    record = sinon.createStubInstance(BaseRecord) as unknown as BaseRecord
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
        resourceId: 'resourceId',
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
        resourceId: 'resourceId',
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
