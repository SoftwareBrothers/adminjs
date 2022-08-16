/* eslint-disable @typescript-eslint/explicit-function-return-type */
import ActionDecorator from './action-decorator';
import AdminJS from '../../../adminjs'
import BaseResource from '../../adapters/resource/base-resource'
import { ActionRequest, ActionContext, ActionResponse, Before, After } from '../../actions/action.interface'
import ForbiddenError from '../../utils/errors/forbidden-error'
import ValidationError from '../../utils/errors/validation-error'

describe('ActionDecorator', () => {
  const request = { response: true } as unknown as ActionRequest
  let admin: AdminJS
  let resource: BaseResource
  let context: ActionContext
  let action: ActionDecorator
  let handler: sinon.SinonStub<any, Promise<ActionResponse>>

  beforeEach(() => {
    admin = sinon.createStubInstance(AdminJS)
    resource = sinon.createStubInstance(BaseResource)
    action = { name: 'myAction' } as ActionDecorator
    context = { resource, _admin: admin, action } as ActionContext
    handler = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('#before', () => {
    it('calls all functions if they were given as an array', async () => {
      // 3 hooks one adding response1 key and the other adding response2 key
      // and finally one async adding response3
      const before = [
        () => ({ response1: true }),
        (response) => ({
          ...response,
          response2: true,
        }),
        async (response) => ({ ...response, response3: true }),
      ] as unknown as Array<Before>
      const decorator = new ActionDecorator({
        action: { before, handler, name: 'myAction', actionType: 'resource' },
        admin,
        resource,
      })

      const ret = await decorator.invokeBeforeHook({} as ActionRequest, {} as ActionContext)

      expect(ret).toEqual({
        response1: true,
        response2: true,
        response3: true,
      })
    })
  })

  describe('#after', () => {
    it('calls all functions if they were given as an array', async () => {
      // 2 hooks one adding response1 key and the other adding response2 key
      const after = [
        () => ({ response1: true }),
        (response) => ({
          ...response,
          response2: true,
        }),
        async (response) => ({ ...response, response3: true }),
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

      expect(ret).toEqual({
        response1: true,
        response2: true,
        response3: true,
      })
    })
  })

  describe('#handler', () => {
    it('calls the before action when it is given', async () => {
      const mockedRequest = { response: true }
      const before = jest.fn().mockReturnValue(mockedRequest)

      const decorator = new ActionDecorator({
        action: { before, handler, name: 'myAction', actionType: 'resource' },
        admin,
        resource,
      })

      await decorator.handler(request, 'res', context)

      expect(before).toBeCalledWith(request)
      expect(handler).toBeCalledWith(expect.objectContaining(mockedRequest))
    })

    it('calls the after action when it is given', async () => {
      const modifiedData = { records: false }
      const data = {}
      const after = jest.fn().mockReturnValue(modifiedData)
      handler = handler.resolves(data)
      const decorator = new ActionDecorator({
        action: { name: 'myAction', handler, after, actionType: 'resource' },
        admin,
        resource,
      })

      const ret = await decorator.handler(request, 'res', context)

      expect(ret).toBe(modifiedData)
      expect(handler).toBeCalled()
      expect(after).toBeCalledWith(data)
    })

    it('returns forbidden error when its thrown', async () => {
      const errorMessage = 'you cannot edit this resource'
      const before = jest.fn().throws(new ForbiddenError(errorMessage))

      const decorator = new ActionDecorator({
        action: { before, handler, name: 'myAction', actionType: 'record' },
        admin,
        resource,
      })

      const ret = await decorator.handler(request, 'res', context)

      expect(before).toBeCalledWith(request)
      expect(ret).toHaveProperty('notice')
      expect(ret.notice).toEqual({
        message: errorMessage,
        type: 'error',
      })
      expect(handler).not.toBeCalled()
    })

    it(
      'returns record with validation errors when they are thrown',
      async () => {
        const errors = {
          email: {
            message: 'Wrong email',
            type: 'notGood',
          },
        }
        const notice = { message: 'There are validation errors', type: 'validationError' }
        const before = jest.fn().throws(new ValidationError(errors, notice))

        const decorator = new ActionDecorator({
          action: { before, handler, name: 'myAction', actionType: 'record' },
          admin,
          resource,
        })

        const ret = await decorator.handler(request, 'res', context)

        expect(before).toBeCalledWith(request)
        expect(ret).toHaveProperty('notice')
        expect(ret.notice).toEqual({
          message: notice.message,
          type: 'error',
        })
        expect(ret).toHaveProperty('record')
        expect(ret.record).toHaveProperty('errors')
        expect(ret.record.errors).toEqual(errors)
        expect(handler).not.toBeCalled()
      }
    )
  })
})
