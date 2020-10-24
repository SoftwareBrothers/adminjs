import { expect } from 'chai'
import { filterOutParams } from './filter-out-params'

describe('filterOutParams', () => {
  const params = {
    name: 'John',
    surname: 'Doe',
    age: 31,
    'meta.description': 'very ugly',
    'meta.title': 'cto',
    'meta.otherInfo': 'he stinks',
    metadetaksamosone: 'this is a steroid',
  }

  it('filters params for given property', () => {
    expect(filterOutParams(params, 'age')).to.deep.equal({
      name: 'John',
      surname: 'Doe',
      'meta.description': 'very ugly',
      'meta.title': 'cto',
      'meta.otherInfo': 'he stinks',
      metadetaksamosone: 'this is a steroid',
    })
  })

  it('filter params for nested property', () => {
    expect(filterOutParams(params, 'meta')).to.deep.equal({
      name: 'John',
      surname: 'Doe',
      age: 31,
      metadetaksamosone: 'this is a steroid',
    })
  })

  it('returns all objects when there is no match', () => {
    expect(filterOutParams(params, 'nothingIsThere')).to.deep.eq(params)
  })

  it('filter by multiple properties when they are given', () => {
    expect(filterOutParams(params, ['name', 'meta'])).to.deep.equal({
      surname: 'Doe',
      age: 31,
      metadetaksamosone: 'this is a steroid',
    })
  })

  it('does not throw an error when user passes undefined as a propertyPath', () => {
    expect(() => {
      filterOutParams(params, ['name', undefined as unknown as string])
    }).not.to.throw()
  })
})
