import { expect } from 'chai'
import { FlattenParams } from '../flat'
import { get } from './get'

describe('module:flat.get', () => {
  let params: FlattenParams

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
      nulled: null,
      emptyArray: [],
      emptyObject: {},
    }
  })

  it('returns regular string', () => {
    expect(get(params, 'name')).to.eq(params.name)
  })

  it('returns undefined for non existing property', () => {
    expect(get(params, 'nameNotExisting')).to.be.undefined
  })

  it('returns nested array', () => {
    expect(get(params, 'interest.OfMe')).to.deep.equal([
      'javascript',
      'typescript',
      'brainTumor',
    ])
  })

  it('returns object with nested array', () => {
    expect(get(params, 'interest')).to.deep.equal({
      OfMe: [
        'javascript',
        'typescript',
        'brainTumor',
      ],
    })
  })

  it('returns undefined when not exact property is given', () => {
    expect(get(params, 'interest.Of')).to.be.undefined
  })

  it('returns null for null values', () => {
    expect(get(params, 'nulled')).to.eq(null)
  })
})
