import sinon from 'sinon'
import { expect } from 'chai'

import { ActionContext } from '../../actions/action.interface'
import BaseResource from '../../adapters/resource/base-resource'
import { CurrentAdmin } from '../../../current-admin.interface'
import BaseRecord from '../../adapters/record/base-record'
import ValidationError from '../../utils/errors/validation-error'

import ActionErrorHandler from './action-error-handler'
import ForbiddenError from '../../utils/errors/forbidden-error'

describe('ActionErrorHandler', function () {
  let resource: BaseResource
  let record: BaseRecord
  let translateMessage
  let context: ActionContext
  const notice = {
    message: 'stubbed translation message',
    type: 'error',
  }
  const currentAdmin = {} as CurrentAdmin

  beforeEach(function () {
    resource = sinon.createStubInstance(BaseResource)
    record = sinon.createStubInstance(BaseRecord) as unknown as BaseRecord
    translateMessage = sinon.stub().returns(notice.message)
    context = { resource, record, currentAdmin, translateMessage } as ActionContext
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
        errors,
        params: {},
        populated: {},
      },
      notice,
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
      notice: {
        message: errorMessage,
        type: 'error',
      },
    })
  })
})
