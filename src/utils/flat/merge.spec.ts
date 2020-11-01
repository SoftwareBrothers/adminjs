import { expect } from 'chai'
import { merge } from './merge'

describe('merge', () => {
  it('removes nulled arrays when nested items were found', () => {
    const object1 = { status: 'draft', postImage: null, blogImageSizes: null }
    const object2 = { 'blogImageSizes.0': 4130, 'blogImageMimeTypes.0': 'image/jpeg' }

    expect(merge(object1, object2)).to.deep.equal({
      status: 'draft',
      postImage: null,
      'blogImageSizes.0': 4130,
      'blogImageMimeTypes.0': 'image/jpeg',
    })
  })

  context('object with nested fields are given in the first argument', () => {
    const object1 = { status: {
      type: 'draft',
      updated: 'yesterday',
      tags: ['super'],
    } }

    it('flattens everything and changes just nested property when it was given nested', () => {
      const object2 = { 'status.type': 'newDraft' }

      expect(merge(object1, object2)).to.deep.equal({
        'status.type': object2['status.type'],
        'status.updated': 'yesterday',
        'status.tags.0': 'super',
      })
    })

    it('changes entire record when 2 objects are given', () => {
      const object2 = { status: {
        type: 'newType',
        updated: 'today',
      } }

      expect(merge(object1, object2)).to.deep.equal({
        'status.type': object2.status.type,
        'status.updated': 'today',
      })
    })
  })

  describe('multiple parameters', () => {
    const object1 = { status: { type: 'draft' } }

    it('returns flatten object when one other argument is given', () => {
      expect(merge(object1)).to.deep.equal({
        'status.type': 'draft',
      })
    })

    it('merges more then 2 arguments', () => {
      const object2 = {
        'status.type': 'status2',
        'status.age': '1 day',
      }
      const object3 = {
        'status.type': 'status3',
        names: [
          'Wojtek',
        ],
      }
      expect(merge(object1, object2, object3)).to.deep.equal({
        'status.type': 'status2',
        'status.age': '1 day',
        'names.0': 'Wojtek',
      })
    })
  })
})
