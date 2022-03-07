"use strict";

var _chai = require("chai");

var _filterRecord = require("./filter-record");

describe('isPropertyPermitted', () => {
  it('permit property when options are not set ', () => {
    (0, _chai.expect)((0, _filterRecord.isPropertyPermitted)('name')).to.equal(true);
  });
  it('permits property which included', () => {
    (0, _chai.expect)((0, _filterRecord.isPropertyPermitted)('name', {
      includeParams: ['name', 'age']
    })).to.equal(true);
  });
  it('does not permit property when it is not included', () => {
    (0, _chai.expect)((0, _filterRecord.isPropertyPermitted)('name', {
      includeParams: ['surname', 'age']
    })).to.equal(false);
  });
  it('does not permit property if it is a sub-property of not included property', () => {
    (0, _chai.expect)((0, _filterRecord.isPropertyPermitted)('name.first', {
      includeParams: ['surname', 'age']
    })).to.equal(false);
  });
  it('permits sub property when root property is included', () => {
    (0, _chai.expect)((0, _filterRecord.isPropertyPermitted)('name.first', {
      includeParams: ['name', 'age']
    })).to.equal(true);
  });
  it('permits sub property when root property is included and property is an array', () => {
    (0, _chai.expect)((0, _filterRecord.isPropertyPermitted)('name.first.0.name', {
      includeParams: ['name.first.name', 'age']
    })).to.equal(true);
  });
});