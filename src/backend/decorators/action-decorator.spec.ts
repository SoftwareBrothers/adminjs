/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { expect } from 'chai'
import sinon from 'sinon'
import ActionDecorator from './action-decorator'
import AdminBro from '../../admin-bro'
import BaseResource from '../adapters/base-resource'
import { ActionRequest, ActionContext, ActionResponse, Before, After } from '../actions/action.interface'
import ForbiddenError from '../utils/forbidden-error'
import ValidationError from '../utils/validation-error'

describe('ActionDecorator', function () {
  const request = { response: true } as unknown as ActionRequest
  let admin: AdminBro
  let resource: BaseResource
  let context: ActionContext
  let handler: sinon.SinonStub<any, Promise<ActionResponse>>

  beforeEach(function () {
    admin = sinon.createStubInstance(AdminBro)
    resource = sinon.createStubInstance(BaseResource)
    context = { resource, _admin: admin } as ActionContext
    handler = sinon.stub()
  })

  afterEach(function () {
    sinon.restore()
  })

  describe('#before', function () {
    it('calls all functions if they were given as an array', async function () {
      // 3 hooks one adding response1 key and the other adding response2 key
      // and finally one async adding response3
      const before = [
        () => ({ response1: true }),
        response => ({
          ...response,
          response2: true,
        }),
        async response => ({ ...response, response3: true }),
      ] as unknown as Array<Before>
      const decorator = new ActionDecorator({
        action: { before, handler, name: 'myAction', actionType: 'resource' },
        admin,
        resource,
      })

      const ret = await decorator.invokeBeforeHook({} as ActionRequest, {} as ActionContext)

      expect(ret).to.deep.eq({
        response1: true,
        response2: true,
        response3: true,
      })
    })
  })

  describe('#after', function () {
    it('calls all functions if they were given as an array', async function () {
      // 2 hooks one adding response1 key and the other adding response2 key
      const after = [
        () => ({ response1: true }),
        response => ({
          ...response,
          response2: true,
        }),
        async response => ({ ...response, response3: true }),
      ] as unknown as Array<After<ActionResponse>>
      const decorator = new ActionDecorator({
        action: { after, handler, name: 'myAction', actionType: 'resource' },
        admin,
        resource,
      })

      const ret = await decorator.invokeAfterHook(
        {} as ActionResponse,
        {} as ActionRequest,
        {} as ActionContext,
      )

      expect(ret).to.deep.eq({
        response1: true,
        response2: true,
        response3: true,
      })
    })
  })

  describe('#handler', function () {
    it('calls the before action when it is given', async function () {
      const mockedRequest = { response: true }
      const before = sinon.stub().returns(mockedRequest)

      const decorator = new ActionDecorator({
        action: { before, handler, name: 'myAction', actionType: 'resource' },
        admin,
        resource,
      })

      await decorator.handler(request, 'res', context)

      expect(before).to.have.been.calledWith(request)
      expect(handler).to.have.been.calledWith(
        sinon.match(mockedRequest),
      )
    })

    it('calls the after action when it is given', async function () {
      const modifiedData = { records: false }
      const data = {}
      const after = sinon.stub().returns(modifiedData)
      handler = handler.resolves(data)
      const decorator = new ActionDecorator({
        action: { name: 'myAction', handler, after, actionType: 'resource' },
        admin,
        resource,
      })

      const ret = await decorator.handler(request, 'res', context)

      expect(ret).to.equal(modifiedData)
      expect(handler).to.have.been.called
      expect(after).to.have.been.calledWith(data)
    })

    it('returns forbidden error when its thrown', async function () {
      const errorMessage = 'you cannot edit this resource'
      const before = sinon.stub().throws(new ForbiddenError(errorMessage))

      const decorator = new ActionDecorator({
        action: { before, handler, name: 'myAction', actionType: 'record' },
        admin,
        resource,
      })

      const ret = await decorator.handler(request, 'res', context)

      expect(before).to.have.been.calledWith(request)
      expect(ret).to.deep.equal({
        notice: {
          message: errorMessage,
          type: 'error',
        },
      })
      expect(handler).not.to.have.been.called
    })

    it('returns record with validation errors when they are thrown', async function () {
      const errors = {
        email: {
          message: 'Wrong email',
          type: 'notGood',
        },
      }
      const notice = { message: 'There are validation errors', type: 'validationError' }
      const before = sinon.stub().throws(new ValidationError(errors, notice))

      const decorator = new ActionDecorator({
        action: { before, handler, name: 'myAction', actionType: 'record' },
        admin,
        resource,
      })

      const ret = await decorator.handler(request, 'res', context)

      expect(before).to.have.been.calledWith(request)
      expect(ret).to.deep.equal({
        notice: {
          message: notice.message,
          type: 'error',
        },
        record: {
          errors,
          params: {},
          populated: {},
        },
      })
      expect(handler).not.to.have.been.called
    })
  })
})
