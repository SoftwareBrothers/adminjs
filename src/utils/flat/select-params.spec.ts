import { expect } from 'chai'

import { selectParams } from './select-params.js'

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
    expect(selectParams(params, 'age')).to.deep.equal({
      age: 31,
    })
  })

  it('select params for nested property', () => {
    expect(selectParams(params, 'meta')).to.deep.equal({
      'meta.description': 'very ugly',
      'meta.title': 'cto',
      'meta.otherInfo': 'he stinks',
    })
  })

  it('returns empty object when there is no match', () => {
    expect(selectParams(params, 'nothingIsThere')).to.deep.eq({})
  })

  it('returns multiple properties when they are given', () => {
    expect(selectParams(params, ['name', 'surname'])).to.deep.equal({
      name: 'John',
      surname: 'Doe',
    })
  })

  it('does not one property when is empty for multi-properties', () => {
    expect(selectParams(params, ['name', 'surname', 'meta', 'empty'])).to.deep.equal({
      name: 'John',
      surname: 'Doe',
      'meta.description': 'very ugly',
      'meta.title': 'cto',
      'meta.otherInfo': 'he stinks',
    })
  })

  it('does not throw an error when user passes undefined as a propertyPath', () => {
    expect(() => {
      selectParams(params, ['name', undefined as unknown as string])
    }).not.to.throw()
  })
})
