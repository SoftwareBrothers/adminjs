import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

import DeleteAction from './delete-action.js'
import { ActionContext, ActionRequest, ActionHandler, RecordActionResponse } from '../action.interface.js'
import BaseRecord from '../../adapters/record/base-record.js'
import AdminJS from '../../../adminjs.js'
import ViewHelpers from '../../utils/view-helpers/view-helpers.js'
import BaseResource from '../../adapters/resource/base-resource.js'
import ActionDecorator from '../../decorators/action/action-decorator.js'
import NotFoundError from '../../utils/errors/not-found-error.js'
import { ValidationError } from '../../utils/errors/validation-error.js'
import { RecordJSON } from '../../../frontend/interfaces/index.js'
import { CurrentAdmin } from '../../../current-admin.interface.js'

chai.use(chaiAsPromised)

describe('DeleteAction', function () {
  let data: ActionContext
  const request = {
    params: {},
    method: 'post',
  } as ActionRequest
  let response: any

  describe('.handler', function () {
    afterEach(function () {
      sinon.restore()
    })

    beforeEach(async function () {
      data = {
        _admin: sinon.createStubInstance(AdminJS),
        h: sinon.createStubInstance(ViewHelpers),
        resource: sinon.createStubInstance(BaseResource),
        action: sinon.createStubInstance(ActionDecorator) as unknown as ActionDecorator,
      } as unknown as ActionContext
    })

    it('throws error when no records are given', async function () {
      await expect(
        (DeleteAction.handler as ActionHandler<RecordActionResponse>)(request, response, data),
      ).to.rejectedWith(NotFoundError)
    })

    context('A record has been selected', function () {
      let record: BaseRecord
      let recordJSON: RecordJSON

      beforeEach(function () {
        recordJSON = { id: 'someId' } as RecordJSON
        record = sinon.createStubInstance(BaseRecord, {
          toJSON: sinon.stub<[(CurrentAdmin)?]>().returns(recordJSON),
        }) as unknown as BaseRecord

        request.params.recordId = recordJSON.id
        data.record = record
      })

      it('returns deleted record, notice and redirectUrl', async function () {
        const actionResponse = await (
          DeleteAction.handler as ActionHandler<RecordActionResponse>
        )(request, response, data)

        expect(actionResponse).to.have.property('notice')
        expect(actionResponse).to.have.property('redirectUrl')
        expect(actionResponse).to.have.property('record')
      })

      context('ValidationError is thrown by Resource.delete', function () {
        it('returns error notice', async function () {
          const errorMessage = 'test validation error'
          data.resource = sinon.createStubInstance(BaseResource, {
            delete: sinon.stub().rejects(new ValidationError({}, { message: errorMessage })) as any,
          })

          const actionResponse = await (
            DeleteAction.handler as ActionHandler<RecordActionResponse>
          )(request, response, data)

          expect(actionResponse).to.have.property('notice')
          expect(actionResponse.notice).to.deep.equal({
            message: errorMessage,
            type: 'error',
          })
          expect(actionResponse).to.have.property('record')
        })

        it('returns error notice with default message when ValidationError has no baseError', async function () {
          data.resource = sinon.createStubInstance(BaseResource, {
            delete: sinon.stub().rejects(new ValidationError({})) as any,
          })

          const actionResponse = await (
            DeleteAction.handler as ActionHandler<RecordActionResponse>
          )(request, response, data)

          expect(actionResponse).to.have.property('notice')
          expect(actionResponse.notice).to.deep.equal({
            message: 'thereWereValidationErrors',
            type: 'error',
          })
          expect(actionResponse).to.have.property('record')
        })
      })
    })
  })
})
