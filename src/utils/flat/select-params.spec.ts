import { selectParams } from './select-params'

describe('selectParams', () => {
  const params = {
    name: 'John',
    surname: 'Doe',
    age: 31,
    'meta.description': 'very ugly',
    'meta.title': 'cto',
    'meta.otherInfo': 'he stinks',
    metadetaksamosone: 'this is a steroid',
  }

  it('selects params for given property', () => {
    expect(selectParams(params, 'age')).toEqual({
      age: 31,
    })
  })

  it('select params for nested property', () => {
    expect(selectParams(params, 'meta')).toEqual({
      'meta.description': 'very ugly',
      'meta.title': 'cto',
      'meta.otherInfo': 'he stinks',
    })
  })

  it('returns empty object when there is no match', () => {
    expect(selectParams(params, 'nothingIsThere')).toEqual({})
  })

  it('returns multiple properties when they are given', () => {
    expect(selectParams(params, ['name', 'surname'])).toEqual({
      name: 'John',
      surname: 'Doe',
    })
  })

  it('does not one property when is empty for multi-properties', () => {
    expect(selectParams(params, ['name', 'surname', 'meta', 'empty'])).toEqual({
      name: 'John',
      surname: 'Doe',
      'meta.description': 'very ugly',
      'meta.title': 'cto',
      'meta.otherInfo': 'he stinks',
    })
  })

  it(
    'does not throw an error when user passes undefined as a propertyPath',
    () => {
      expect(() => {
        selectParams(params, ['name', undefined as unknown as string])
      }).not.toThrowError()
    }
  )
})
