import sortSetter from './sort-setter.js'

describe('sortSetter', function () {
  const defaultFieldName = 'someFieldName'
  const overriddenFieldName = 'otherField'
  const overriddenDirection = 'desc'
  const resourceOptions = {
    sort: {
      sortBy: overriddenFieldName,
      direction: overriddenDirection,
    },
  }
  it('returns query when it is passed', function () {
    const direction = 'asc'
    const sortBy = 'name'
    expect(sortSetter({ direction, sortBy }), defaultFieldName, {}).to.deep.equal({
      direction,
      sortBy,
    })
  })

  it('returns defaults when no query is given', function () {
    expect(sortSetter({}, defaultFieldName, {})).to.deep.equal({
      direction: sortSetter.DEFAULT_DIRECTION,
      sortBy: defaultFieldName,
    })
  })

  it('returns overridden sort settings when no defaults are given', function () {
    expect(sortSetter({}, defaultFieldName, resourceOptions)).to.deep.equal(
      resourceOptions.sort,
    )
  })

  it('throws an error when direction is not correct', function () {
    expect(() => {
      sortSetter({}, defaultFieldName, { sort: { direction: 'other' } })
    }).to.throw().property('name', 'ConfigurationError')
  })
})
