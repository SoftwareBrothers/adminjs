import { expect } from 'chai'

import { FlattenParams } from './flat.types.js'
import { set } from './set.js'

describe('module:flat.set', () => {
  let params: FlattenParams
  let newParams: FlattenParams

  beforeEach(() => {
    params = {
      name: 'Wojtek',
      surname: 'Krysiak',
      age: 36,
      'interest.OfMe.0': 'javascript',
      'interest.OfMe.1': 'typescript',
      'interest.OfMe.2': 'brainTumor',
      interests: 'Generally everything',
      'meta.position': 'CTO',
      'meta.workingHours': '9:00-17:00',
      'meta.duties': 'everything',
      'meta.fun': '8/10',
      initiallyNull: null,
    }
  })

  it('sets regular property when it is default type', () => {
    const age = 37

    expect(set(params, 'age', age)).to.have.property('age', 37)
  })

  context('passing basic types', () => {
    const newPropertyName = 'newProperty'

    it('does not change the type when regular file is set', function () {
      const file = new File([], 'amazing.me')

      newParams = set(params, newPropertyName, file)

      expect(newParams[newPropertyName]).to.equal(file)
    })

    it('does not change the type when Date is set', () => {
      const date = new Date()

      newParams = set(params, newPropertyName, date)

      expect(newParams[newPropertyName]).to.equal(date)
    })

    it('sets null', () => {
      expect(set(params, newPropertyName, null)).to.have.property(newPropertyName, null)
    })

    it('sets empty object', () => {
      expect(set(params, newPropertyName, {})).to.deep.include({ [newPropertyName]: {} })
    })

    it('sets empty array', () => {
      expect(set(params, newPropertyName, [])).to.deep.include({ [newPropertyName]: [] })
    })

    it('does nothing when setting undefined to some random key', () => {
      expect(set(params, newPropertyName, undefined)).to.deep.equal(params)
    })
  })

  context('passing array', () => {
    const interest = ['js', 'ts']

    beforeEach(() => {
      newParams = set(params, 'interest.OfMe', interest)
    })

    it('replaces sets values for all new arrays items', () => {
      expect(newParams).to.include({
        'interest.OfMe.0': 'js',
        'interest.OfMe.1': 'ts',
      })
    })

    it('removes old values', () => {
      expect(newParams).not.to.have.property('interest.OfMe.2')
    })

    it('leaves other values which name starts the same', () => {
      expect(newParams).to.have.property('interests', params.interests)
    })
  })

  context('value is undefined', () => {
    const property = 'meta'

    beforeEach(() => {
      newParams = set(params, property)
    })

    it('removes all existing properties', () => {
      expect(newParams).not.to.have.keys(
        'meta.position',
        'meta.workingHours',
        'meta.duties',
        'meta.fun',
      )
    })

    it('does not set any new key', () => {
      expect(Object.keys(newParams).length).to.eq(Object.keys(params).length - 4)
    })
  })

  context('mixed type was inside and should be updated', () => {
    const meta = {
      position: 'adminJSCEO',
      workingHours: '6:00-21:00',
    }

    beforeEach(() => {
      newParams = set(params, 'meta', meta)
    })

    it('clears the previous value for nested string', () => {
      expect(newParams).not.to.have.keys('meta.duties', 'meta.fun')
    })

    it('sets the new value for nested string', () => {
      expect(newParams).to.include({
        'meta.position': meta.position,
        'meta.workingHours': meta.workingHours,
      })
    })
  })

  context('user wants to set nested property for already given root property', () => {
    const newNestedNullValue = 'this is not null'

    beforeEach(() => {
      params = {
        id: '6e264607-ad0b-4480-8e25-1bf54063465b',
        title: 'Your new story',
        status: 'draft',
        postImage: null,
        blogImageKeys: null,
        blogImageMimeTypes: null,
        blogImageBuckets: null,
        blogImageSizes: null,
        postUrl: 'your-new-story',
      }
    })

    it('sets value for new nested property', () => {
      const newNestedNullKey = 'blogImageKeys.nested'
      newParams = set(params, newNestedNullKey, newNestedNullValue)

      expect(newParams[newNestedNullKey]).to.eq(newNestedNullValue)
    })

    it('removes root property from keys', () => {
      const newNestedNullKey = 'blogImageKeys.nested'
      newParams = set(params, newNestedNullKey, newNestedNullValue)

      expect(Object.keys(newParams)).not.to.include(newNestedNullKey.split('.')[0])
    })

    it('removes value from keys if new value is an array', () => {
      const newNestedNullKey = 'blogImageKeys.0'
      newParams = set(params, newNestedNullKey, newNestedNullValue)

      expect(Object.keys(newParams)).not.to.include(newNestedNullKey.split('.')[0])
    })
  })
})
