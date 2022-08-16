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
      'nested.0.el.0.value': 'val0.0',
      'nested.0.el.1.value': 'val0.1',
      'nested.1.el.0.value': 'val1',
      'nested.1.el.1.value': 'val2',
    }
  })

  it('returns regular string', () => {
    expect(get(params, 'name')).toBe(params.name)
  })

  it('returns undefined for non existing property', () => {
    expect(get(params, 'nameNotExisting')).toBeUndefined()
  })

  it('returns undefined for property set to undefined', () => {
    expect(get({
      property: undefined as any,
    }, 'property')).toBeUndefined()
  })

  it('returns nested array', () => {
    expect(get(params, 'interest.OfMe')).toEqual([
      'javascript',
      'typescript',
      'brainTumor',
    ])
  })

  it('returns object with nested array', () => {
    expect(get(params, 'interest')).toEqual({
      OfMe: [
        'javascript',
        'typescript',
        'brainTumor',
      ],
    })
  })

  it('returns undefined when not exact property is given', () => {
    expect(get(params, 'interest.Of')).toBeUndefined()
  })

  it('returns null for null values', () => {
    expect(get(params, 'nulled')).toBe(null)
  })

  it('returns nested arrays', () => {
    expect(get(params, 'nested.0.el')).toEqual([
      { value: 'val0.0' },
      { value: 'val0.1' },
    ])
  })

  it(
    'returns nested arrays with siblings when `includeAllSiblings` is set',
    () => {
      expect(get(params, 'nested.el', { includeAllSiblings: true })).toEqual([
        { value: 'val0.0' },
        { value: 'val0.1' },
        { value: 'val1' },
        { value: 'val2' },
      ])
    }
  )

  describe('gets nested reference id', () => {
    const referenceId = '5f7462621eb3495ea0f0edd9'

    beforeEach(() => {
      params = {
        'Skills._id': '5f925f58016eab056c8c35a7',
        'Skills.softShills': [],
        'Skills.hardSkills.0._id': '5f925f58016eab056c8c35a8',
        'Skills.hardSkills.0.name': '123',
        'Skills.hardSkills.0.level': 'junior',
        'Skills.hardSkills.0.Profession': referenceId,
      }
    })

    it('returns referenceId when propertyPath is given', () => {
      const propertyPath = 'Skills.hardSkills.Profession'
      expect(get(params, propertyPath, { includeAllSiblings: true })).toEqual([referenceId])
    })
  })
})
