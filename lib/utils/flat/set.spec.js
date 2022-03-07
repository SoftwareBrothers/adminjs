"use strict";

var _chai = require("chai");

var _set = require("./set");

describe('module:flat.set', () => {
  let params;
  let newParams;
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
      initiallyNull: null
    };
  });
  it('sets regular property when it is default type', () => {
    const age = 37;
    (0, _chai.expect)((0, _set.set)(params, 'age', age)).to.have.property('age', 37);
  });
  context('passing basic types', () => {
    const newPropertyName = 'newProperty';
    it('does not change the type when regular file is set', function () {
      const file = new File([], 'amazing.me');
      newParams = (0, _set.set)(params, newPropertyName, file);
      (0, _chai.expect)(newParams[newPropertyName]).to.equal(file);
    });
    it('does not change the type when Date is set', () => {
      const date = new Date();
      newParams = (0, _set.set)(params, newPropertyName, date);
      (0, _chai.expect)(newParams[newPropertyName]).to.equal(date);
    });
    it('sets null', () => {
      (0, _chai.expect)((0, _set.set)(params, newPropertyName, null)).to.have.property(newPropertyName, null);
    });
    it('sets empty object', () => {
      (0, _chai.expect)((0, _set.set)(params, newPropertyName, {})).to.deep.include({
        [newPropertyName]: {}
      });
    });
    it('sets empty array', () => {
      (0, _chai.expect)((0, _set.set)(params, newPropertyName, [])).to.deep.include({
        [newPropertyName]: []
      });
    });
    it('does nothing when setting undefined to some random key', () => {
      (0, _chai.expect)((0, _set.set)(params, newPropertyName, undefined)).to.deep.equal(params);
    });
  });
  context('passing array', () => {
    const interest = ['js', 'ts'];
    beforeEach(() => {
      newParams = (0, _set.set)(params, 'interest.OfMe', interest);
    });
    it('replaces sets values for all new arrays items', () => {
      (0, _chai.expect)(newParams).to.include({
        'interest.OfMe.0': 'js',
        'interest.OfMe.1': 'ts'
      });
    });
    it('removes old values', () => {
      (0, _chai.expect)(newParams).not.to.have.property('interest.OfMe.2');
    });
    it('leaves other values which name starts the same', () => {
      (0, _chai.expect)(newParams).to.have.property('interests', params.interests);
    });
  });
  context('value is undefined', () => {
    const property = 'meta';
    beforeEach(() => {
      newParams = (0, _set.set)(params, property);
    });
    it('removes all existing properties', () => {
      (0, _chai.expect)(newParams).not.to.have.keys('meta.position', 'meta.workingHours', 'meta.duties', 'meta.fun');
    });
    it('does not set any new key', () => {
      (0, _chai.expect)(Object.keys(newParams).length).to.eq(Object.keys(params).length - 4);
    });
  });
  context('mixed type was inside and should be updated', () => {
    const meta = {
      position: 'adminJSCEO',
      workingHours: '6:00-21:00'
    };
    beforeEach(() => {
      newParams = (0, _set.set)(params, 'meta', meta);
    });
    it('clears the previous value for nested string', () => {
      (0, _chai.expect)(newParams).not.to.have.keys('meta.duties', 'meta.fun');
    });
    it('sets the new value for nested string', () => {
      (0, _chai.expect)(newParams).to.include({
        'meta.position': meta.position,
        'meta.workingHours': meta.workingHours
      });
    });
  });
  context('user wants to set nested property for already given root property', () => {
    const newNestedNullValue = 'this is not null';
    beforeEach(() => {
      params = {
        id: '6e264607-ad0b-4480-8e25-1bf54063465b',
        title: 'Your new story',
        status: 'draft',
        postImage: null,
        blogImageKeys: null,
        blogImageMimeTypes: null,
        blogImageBuckets: null,
        blogImageSizes: null,
        postUrl: 'your-new-story'
      };
    });
    it('sets value for new nested property', () => {
      const newNestedNullKey = 'blogImageKeys.nested';
      newParams = (0, _set.set)(params, newNestedNullKey, newNestedNullValue);
      (0, _chai.expect)(newParams[newNestedNullKey]).to.eq(newNestedNullValue);
    });
    it('removes root property from keys', () => {
      const newNestedNullKey = 'blogImageKeys.nested';
      newParams = (0, _set.set)(params, newNestedNullKey, newNestedNullValue);
      (0, _chai.expect)(Object.keys(newParams)).not.to.include(newNestedNullKey.split('.')[0]);
    });
    it('removes value from keys if new value is an array', () => {
      const newNestedNullKey = 'blogImageKeys.0';
      newParams = (0, _set.set)(params, newNestedNullKey, newNestedNullValue);
      (0, _chai.expect)(Object.keys(newParams)).not.to.include(newNestedNullKey.split('.')[0]);
    });
  });
});