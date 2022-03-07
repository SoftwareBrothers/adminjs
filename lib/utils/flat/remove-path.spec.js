"use strict";

var _chai = require("chai");

var _removePath = require("./remove-path");

describe('removePath', () => {
  let params;
  beforeEach(() => {
    params = {
      name: 'value',
      'notPopulated.0': 'val1',
      'notPopulated.1': 'val2',
      'property.0': 'val1',
      'property.1': 'val2',
      'property.2': 'val3',
      'property.3.nested.0': 'val1',
      'property.3.nested.1': 'val2',
      'property.3.nested.2': 'val3',
      'property.3.nested.3.some': 'val3',
      'property.3.nested.4.some-other': 'val41',
      'property.4': 'val4',
      'property.5.nested.0': 'val5'
    };
  });
  it('removes regular property', () => {
    (0, _chai.expect)((0, _removePath.removePath)(params, 'name')).not.to.have.keys('name');
  });
  it('removes element from the array and updates other indexes', () => {
    const newParams = (0, _removePath.removePath)(params, 'property.1');
    (0, _chai.expect)(newParams).to.deep.equal({
      name: 'value',
      'notPopulated.0': 'val1',
      'notPopulated.1': 'val2',
      'property.0': 'val1',
      'property.1': 'val3',
      'property.2.nested.0': 'val1',
      'property.2.nested.1': 'val2',
      'property.2.nested.2': 'val3',
      'property.2.nested.3.some': 'val3',
      'property.2.nested.4.some-other': 'val41',
      'property.3': 'val4',
      'property.4.nested.0': 'val5'
    });
  });
  it('removes parent element from the array and updates other indexes', () => {
    const newParams = (0, _removePath.removePath)(params, 'property.3.nested.3.some');
    (0, _chai.expect)(newParams).to.deep.equal({
      name: 'value',
      'notPopulated.0': 'val1',
      'notPopulated.1': 'val2',
      'property.0': 'val1',
      'property.1': 'val2',
      'property.2': 'val3',
      'property.3.nested.0': 'val1',
      'property.3.nested.1': 'val2',
      'property.3.nested.2': 'val3',
      'property.3.nested.3.some-other': 'val41',
      'property.4': 'val4',
      'property.5.nested.0': 'val5'
    });
  });
  it('leaves empty array when removing last element', () => {
    let newParams = (0, _removePath.removePath)(params, 'notPopulated.0');
    newParams = (0, _removePath.removePath)(newParams, 'notPopulated.0');
    (0, _chai.expect)(newParams).to.deep.equal({
      name: 'value',
      notPopulated: [],
      'property.0': 'val1',
      'property.1': 'val2',
      'property.2': 'val3',
      'property.3.nested.0': 'val1',
      'property.3.nested.1': 'val2',
      'property.3.nested.2': 'val3',
      'property.3.nested.3.some': 'val3',
      'property.3.nested.4.some-other': 'val41',
      'property.4': 'val4',
      'property.5.nested.0': 'val5'
    });
  });
});