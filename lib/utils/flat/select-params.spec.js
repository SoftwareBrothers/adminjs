"use strict";

var _chai = require("chai");

var _selectParams = require("./select-params");

describe('selectParams', () => {
  const params = {
    name: 'John',
    surname: 'Doe',
    age: 31,
    'meta.description': 'very ugly',
    'meta.title': 'cto',
    'meta.otherInfo': 'he stinks',
    metadetaksamosone: 'this is a steroid'
  };
  it('selects params for given property', () => {
    (0, _chai.expect)((0, _selectParams.selectParams)(params, 'age')).to.deep.equal({
      age: 31
    });
  });
  it('select params for nested property', () => {
    (0, _chai.expect)((0, _selectParams.selectParams)(params, 'meta')).to.deep.equal({
      'meta.description': 'very ugly',
      'meta.title': 'cto',
      'meta.otherInfo': 'he stinks'
    });
  });
  it('returns empty object when there is no match', () => {
    (0, _chai.expect)((0, _selectParams.selectParams)(params, 'nothingIsThere')).to.deep.eq({});
  });
  it('returns multiple properties when they are given', () => {
    (0, _chai.expect)((0, _selectParams.selectParams)(params, ['name', 'surname'])).to.deep.equal({
      name: 'John',
      surname: 'Doe'
    });
  });
  it('does not one property when is empty for multi-properties', () => {
    (0, _chai.expect)((0, _selectParams.selectParams)(params, ['name', 'surname', 'meta', 'empty'])).to.deep.equal({
      name: 'John',
      surname: 'Doe',
      'meta.description': 'very ugly',
      'meta.title': 'cto',
      'meta.otherInfo': 'he stinks'
    });
  });
  it('does not throw an error when user passes undefined as a propertyPath', () => {
    (0, _chai.expect)(() => {
      (0, _selectParams.selectParams)(params, ['name', undefined]);
    }).not.to.throw();
  });
});