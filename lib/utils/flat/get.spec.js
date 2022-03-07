"use strict";

var _chai = require("chai");

var _get = require("./get");

describe('module:flat.get', () => {
  let params;
  beforeEach(() => {
    params = {
      name: 'Wojtek',
      surname: 'Krysiak',
      age: 36,
      'interest.OfMe.0': 'javascript',
      'interest.OfMe.1': 'typescript',
      'interest.OfMe.2': 'brainTumor',
      interests: 'Generally everything',
      'meta.position': 'CTO',
      'meta.workingHours': '9:00-17:00',
      'meta.duties': 'everything',
      'meta.fun': '8/10',
      nulled: null,
      emptyArray: [],
      emptyObject: {},
      'nested.0.el.0.value': 'val0.0',
      'nested.0.el.1.value': 'val0.1',
      'nested.1.el.0.value': 'val1',
      'nested.1.el.1.value': 'val2'
    };
  });
  it('returns regular string', () => {
    (0, _chai.expect)((0, _get.get)(params, 'name')).to.eq(params.name);
  });
  it('returns undefined for non existing property', () => {
    (0, _chai.expect)((0, _get.get)(params, 'nameNotExisting')).to.be.undefined;
  });
  it('returns undefined for property set to undefined', () => {
    (0, _chai.expect)((0, _get.get)({
      property: undefined
    }, 'property')).to.be.undefined;
  });
  it('returns nested array', () => {
    (0, _chai.expect)((0, _get.get)(params, 'interest.OfMe')).to.deep.equal(['javascript', 'typescript', 'brainTumor']);
  });
  it('returns object with nested array', () => {
    (0, _chai.expect)((0, _get.get)(params, 'interest')).to.deep.equal({
      OfMe: ['javascript', 'typescript', 'brainTumor']
    });
  });
  it('returns undefined when not exact property is given', () => {
    (0, _chai.expect)((0, _get.get)(params, 'interest.Of')).to.be.undefined;
  });
  it('returns null for null values', () => {
    (0, _chai.expect)((0, _get.get)(params, 'nulled')).to.eq(null);
  });
  it('returns nested arrays', () => {
    (0, _chai.expect)((0, _get.get)(params, 'nested.0.el')).to.deep.equal([{
      value: 'val0.0'
    }, {
      value: 'val0.1'
    }]);
  });
  it('returns nested arrays with siblings when `includeAllSiblings` is set', () => {
    (0, _chai.expect)((0, _get.get)(params, 'nested.el', {
      includeAllSiblings: true
    })).to.deep.equal([{
      value: 'val0.0'
    }, {
      value: 'val0.1'
    }, {
      value: 'val1'
    }, {
      value: 'val2'
    }]);
  });
  context('gets nested reference id', () => {
    const referenceId = '5f7462621eb3495ea0f0edd9';
    beforeEach(() => {
      params = {
        'Skills._id': '5f925f58016eab056c8c35a7',
        'Skills.softShills': [],
        'Skills.hardSkills.0._id': '5f925f58016eab056c8c35a8',
        'Skills.hardSkills.0.name': '123',
        'Skills.hardSkills.0.level': 'junior',
        'Skills.hardSkills.0.Profession': referenceId
      };
    });
    it('returns referenceId when propertyPath is given', () => {
      const propertyPath = 'Skills.hardSkills.Profession';
      (0, _chai.expect)((0, _get.get)(params, propertyPath, {
        includeAllSiblings: true
      })).to.deep.equal([referenceId]);
    });
  });
});