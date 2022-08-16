import requestParser from './request-parser'
import { ActionRequest } from '../../actions/action.interface'
import BaseResource from '../../adapters/resource/base-resource'

const buildResourceWithProperty = (key, property) => {
  const resource = {
    _decorated: { getPropertyByKey: (path) => (key === path ? property : null) },
  } as unknown as BaseResource
  return resource
}

let resource

describe('RequestParser', () => {
  const baseRequest: ActionRequest = {
    params: { resourceId: 'resourceId', action: 'edit' },
    method: 'post',
    payload: {},
  }

  describe('boolean values', () => {
    beforeEach(() => {
      resource = buildResourceWithProperty('isHired', {
        type: () => 'boolean',
      })
    })

    it('sets value to `false` when empty string is given', () => {
      const request = { ...baseRequest, payload: { isHired: '' } }

      expect(requestParser(request, resource).payload?.isHired).toBe(false)
    })

    it('changes "true" string to true', () => {
      const request = { ...baseRequest, payload: { isHired: 'true' } }

      expect(requestParser(request, resource).payload?.isHired).toBe(true)
    })

    it('changes "false" string to true', () => {
      const request = { ...baseRequest, payload: { isHired: 'false' } }

      expect(requestParser(request, resource).payload?.isHired).toBe(false)
    })
  })
})
