import { expect } from 'chai'
import { isPropertyPermitted } from './filter-record'

describe('isPropertyPermitted', () => {
  it('permit property when options are not set ', () => {
    expect(isPropertyPermitted('name')).to.equal(true)
  })

  it('permits property which included', () => {
    expect(isPropertyPermitted('name', {
      includeParams: ['name', 'age'],
    })).to.equal(true)
  })

  it('does not permit property when it is not included', () => {
    expect(isPropertyPermitted('name', {
      includeParams: ['surname', 'age'],
    })).to.equal(false)
  })

  it('does not permit property if it is a sub-property of not included property', () => {
    expect(isPropertyPermitted('name.first', {
      includeParams: ['surname', 'age'],
    })).to.equal(false)
  })

  it('permits sub property when root property is included', () => {
    expect(isPropertyPermitted('name.first', {
      includeParams: ['name', 'age'],
    })).to.equal(true)
  })

  it('permits sub property when root property is included and property is an array', () => {
    expect(isPropertyPermitted('name.first.0.name', {
      includeParams: ['name.first.name', 'age'],
    })).to.equal(true)
  })
})
