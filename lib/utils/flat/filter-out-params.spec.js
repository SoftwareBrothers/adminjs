"use strict";

var _chai = require("chai");

var _filterOutParams = require("./filter-out-params");

describe('filterOutParams', () => {
  const params = {
    name: 'John',
    surname: 'Doe',
    age: 31,
    'meta.description': 'very ugly',
    'meta.title': 'cto',
    'meta.otherInfo': 'he stinks',
    metadetaksamosone: 'this is a steroid'
  };
  it('filters params for given property', () => {
    (0, _chai.expect)((0, _filterOutParams.filterOutParams)(params, 'age')).to.deep.equal({
      name: 'John',
      surname: 'Doe',
      'meta.description': 'very ugly',
      'meta.title': 'cto',
      'meta.otherInfo': 'he stinks',
      metadetaksamosone: 'this is a steroid'
    });
  });
  it('filter params for nested property', () => {
    (0, _chai.expect)((0, _filterOutParams.filterOutParams)(params, 'meta')).to.deep.equal({
      name: 'John',
      surname: 'Doe',
      age: 31,
      metadetaksamosone: 'this is a steroid'
    });
  });
  it('returns all objects when there is no match', () => {
    (0, _chai.expect)((0, _filterOutParams.filterOutParams)(params, 'nothingIsThere')).to.deep.eq(params);
  });
  it('filter by multiple properties when they are given', () => {
    (0, _chai.expect)((0, _filterOutParams.filterOutParams)(params, ['name', 'meta'])).to.deep.equal({
      surname: 'Doe',
      age: 31,
      metadetaksamosone: 'this is a steroid'
    });
  });
  it('does not throw an error when user passes undefined as a propertyPath', () => {
    (0, _chai.expect)(() => {
      (0, _filterOutParams.filterOutParams)(params, ['name', undefined]);
    }).not.to.throw();
  });
});