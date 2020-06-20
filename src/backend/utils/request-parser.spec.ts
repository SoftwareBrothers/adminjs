import { expect } from 'chai'
import requestParser from './request-parser'
import { ActionRequest } from '../actions/action.interface'
import BaseResource from '../adapters/base-resource'
import BaseProperty from '../adapters/base-property'

describe('RequestParser', function () {
  const baseRequest: ActionRequest = {
    params: { resourceId: 'resourceId', action: 'edit' },
    method: 'post',
    payload: {},
  }

  describe('array property', function () {
    const resource = {
      property: (name) => {
        const newProperty = new BaseProperty({ path: name, type: 'string' })
        newProperty.isArray = (): boolean => true
        return newProperty
      },
    } as BaseResource

    it('converts empty string to an empty array', function () {
      const request = { ...baseRequest, payload: { arrayed: '' } }

      expect(requestParser(request, resource).payload?.arrayed).to.deep.eq([])
    })
  })

  describe('boolean values', function () {
    const resource = {
      property: name => new BaseProperty({ path: name, type: 'boolean' }),
    } as BaseResource

    it('sets value to `false` when empty string is given', function () {
      const request = { ...baseRequest, payload: { isHired: '' } }

      expect(requestParser(request, resource).payload?.isHired).to.be.false
    })

    it('changes "true" string to true', function () {
      const request = { ...baseRequest, payload: { isHired: 'true' } }

      expect(requestParser(request, resource).payload?.isHired).to.be.true
    })

    it('changes "false" string to true', function () {
      const request = { ...baseRequest, payload: { isHired: 'false' } }

      expect(requestParser(request, resource).payload?.isHired).to.be.false
    })
  })
})
