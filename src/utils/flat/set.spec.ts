import { FlattenParams } from './flat.types'
import { set } from './set'

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

    expect(set(params, 'age', age)).toHaveProperty('age', 37)
  })

  describe('passing basic types', () => {
    const newPropertyName = 'newProperty'

    it('does not change the type when regular file is set', () => {
      const file = new File([], 'amazing.me')

      newParams = set(params, newPropertyName, file)

      expect(newParams[newPropertyName]).toBe(file)
    })

    it('does not change the type when Date is set', () => {
      const date = new Date()

      newParams = set(params, newPropertyName, date)

      expect(newParams[newPropertyName]).toBe(date)
    })

    it('sets null', () => {
      expect(set(params, newPropertyName, null)).toHaveProperty(newPropertyName, null)
    })

    it('sets empty object', () => {
      expect(set(params, newPropertyName, {})).toMatchObject({ [newPropertyName]: {} })
    })

    it('sets empty array', () => {
      expect(set(params, newPropertyName, [])).toMatchObject({ [newPropertyName]: [] })
    })

    it('does nothing when setting undefined to some random key', () => {
      expect(set(params, newPropertyName, undefined)).toEqual(params)
    })
  })

  describe('passing array', () => {
    const interest = ['js', 'ts']

    beforeEach(() => {
      newParams = set(params, 'interest.OfMe', interest)
    })

    it('replaces sets values for all new arrays items', () => {
      expect(newParams).toMatchObject({
        'interest.OfMe.0': 'js',
        'interest.OfMe.1': 'ts',
      })
    })

    it('removes old values', () => {
      expect(newParams).not.toHaveProperty('interest.OfMe.2')
    })

    it('leaves other values which name starts the same', () => {
      expect(newParams).toHaveProperty('interests', params.interests)
    })
  })

  describe('value is undefined', () => {
    const property = 'meta'

    beforeEach(() => {
      newParams = set(params, property)
    })

    it('removes all existing properties', () => {
      expect(Object.keys(newParams)).not.toEqual(
        expect.arrayContaining(['meta.position', 'meta.workingHours', 'meta.duties', 'meta.fun'])
      )
    })

    it('does not set any new key', () => {
      expect(Object.keys(newParams).length).toBe(Object.keys(params).length - 4)
    })
  })

  describe('mixed type was inside and should be updated', () => {
    const meta = {
      position: 'adminJSCEO',
      workingHours: '6:00-21:00',
    }

    beforeEach(() => {
      newParams = set(params, 'meta', meta)
    })

    it('clears the previous value for nested string', () => {
      expect(Object.keys(newParams)).not.toEqual(expect.arrayContaining(['meta.duties', 'meta.fun']))
    })

    it('sets the new value for nested string', () => {
      expect(newParams).toMatchObject({
        'meta.position': meta.position,
        'meta.workingHours': meta.workingHours,
      })
    })
  })

  describe(
    'user wants to set nested property for already given root property',
    () => {
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

        expect(newParams[newNestedNullKey]).toBe(newNestedNullValue)
      })

      it('removes root property from keys', () => {
        const newNestedNullKey = 'blogImageKeys.nested'
        newParams = set(params, newNestedNullKey, newNestedNullValue)

        expect(Object.keys(newParams)).toEqual(expect.not.arrayContaining([newNestedNullKey.split('.')[0]]))
      })

      it('removes value from keys if new value is an array', () => {
        const newNestedNullKey = 'blogImageKeys.0'
        newParams = set(params, newNestedNullKey, newNestedNullValue)

        expect(Object.keys(newParams)).toEqual(expect.not.arrayContaining([newNestedNullKey.split('.')[0]]))
      })
    }
  )
})
