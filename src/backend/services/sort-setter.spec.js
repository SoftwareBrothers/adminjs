import sortSetter from './sort-setter'

describe('sortSetter', function () {
  const defautlFieldName = 'someFieldName'
  const overridenFieldName = 'otherField'
  const overridenDirection = 'desc'
  const resourceOptions = {
    sort: {
      sortBy: overridenFieldName,
      direction: overridenDirection,
    },
  }
  it('returns query when it is passed', function () {
    const direction = 'asc'
    const sortBy = 'name'
    expect(sortSetter({ direction, sortBy }), defautlFieldName, {}).to.deep.equal({
      direction,
      sortBy,
    })
  })

  it('returns defaults when no query is given', function () {
    expect(sortSetter({}, defautlFieldName, {})).to.deep.equal({
      direction: sortSetter.DEFAULT_DIRECTION,
      sortBy: defautlFieldName,
    })
  })

  it('returns overriden sort settings when no defaults are given', function () {
    expect(sortSetter({}, defautlFieldName, resourceOptions)).to.deep.equal(
      resourceOptions.sort,
    )
  })

  it('throws an error when direction is not correct', function () {
    expect(() => {
      sortSetter({}, defautlFieldName, { sort: { direction: 'other' } })
    }).to.throw().property('name', 'ConfigurationError')
  })
})
