"use strict";

var _chai = require("chai");

var _flat = require("flat");

var _updateRecord = _interopRequireDefault(require("./update-record"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('updateRecord', function () {
  const newPropertyName = 'newProperty';
  const propertyName = 'propertyName';
  const populatedPropertyName = 'populatedProperty';
  const arrayPropertyName = 'nestedArray';
  const previousRecord = {
    id: '1',
    title: 'Africa',
    recordActions: [],
    bulkActions: [],
    populated: {
      [populatedPropertyName]: {
        id: 'someId'
      }
    },
    errors: {},
    params: {
      email: 'john@doe.pl',
      [propertyName]: 'some filled data',
      [`${arrayPropertyName}.0`]: 'First value in an array',
      [`${arrayPropertyName}.1`]: 'Second value in an array'
    }
  };
  it('does not change the record when regular file is set', function () {
    const file = new File([], 'amazing.me');
    const update = (0, _updateRecord.default)(newPropertyName, file);
    (0, _chai.expect)(update(previousRecord).params[newPropertyName]).to.equal(file);
  });
  it('updates normal string', function () {
    const value = 'regular string value';
    const update = (0, _updateRecord.default)(newPropertyName, value);
    (0, _chai.expect)(update(previousRecord).params[newPropertyName]).to.equal(value);
  });
  it('updates populated data when reference object is given', function () {
    const id = '1821292';
    const refRecord = {
      id,
      title: 'Adolf',
      populated: {},
      errors: {},
      params: {
        name: 'Adolf'
      },
      recordActions: [],
      bulkActions: []
    };
    const update = (0, _updateRecord.default)(newPropertyName, id, refRecord);
    const updatedRecord = update(previousRecord);
    (0, _chai.expect)(updatedRecord.params[newPropertyName]).to.equal(id);
    (0, _chai.expect)(updatedRecord.populated[newPropertyName]).to.deep.equal(refRecord);
  });
  it('flattens value when object is given', function () {
    const value = {
      sub1: 'John',
      sub2: 'Doe'
    };
    const update = (0, _updateRecord.default)(newPropertyName, value);
    const updatedRecord = update(previousRecord);
    (0, _chai.expect)(updatedRecord.params[`${newPropertyName}.sub1`]).to.equal(value.sub1);
    (0, _chai.expect)(updatedRecord.params[`${newPropertyName}.sub2`]).to.equal(value.sub2);
  });
  it('removes all previous array values also if they were flatten', function () {
    const value = ['value3', 'value4', 'value5'];
    const update = (0, _updateRecord.default)(arrayPropertyName, value);
    const updatedRecord = update(previousRecord);
    const unflattenParams = (0, _flat.unflatten)(updatedRecord.params);
    (0, _chai.expect)(unflattenParams[arrayPropertyName]).to.deep.equal(value);
  });
  it('clears the populated value if it exists when no ref is given', function () {
    const value = undefined;
    const update = (0, _updateRecord.default)(populatedPropertyName, value);
    (0, _chai.expect)(update(previousRecord).populated[populatedPropertyName]).to.be.undefined;
  });
  it('does not clear the value when empty string was given', function () {
    const value = '';
    const update = (0, _updateRecord.default)(propertyName, value);
    (0, _chai.expect)(update(previousRecord).params[propertyName]).to.eq(value);
  });
  it('deletes the entire property when undefined was given', function () {
    const value = undefined;
    const update = (0, _updateRecord.default)(propertyName, value);
    const updatedRecord = update(previousRecord);
    (0, _chai.expect)(Object.keys(updatedRecord.params).find(key => key === propertyName)).to.be.undefined;
  });
  it('properly sets nulls', function () {
    const value = null;
    const update = (0, _updateRecord.default)(propertyName, value);
    const updatedRecord = update(previousRecord);
    (0, _chai.expect)(updatedRecord.params[propertyName]).to.be.null;
  });
  it('leaves {} when it was given', function () {
    const value = {};
    const update = (0, _updateRecord.default)(propertyName, value);
    const updatedRecord = update(previousRecord);
    (0, _chai.expect)(updatedRecord.params[propertyName]).to.deep.eq({});
  });
  it('leaves [] when it was given', function () {
    const value = [];
    const update = (0, _updateRecord.default)(propertyName, value);
    const updatedRecord = update(previousRecord);
    (0, _chai.expect)(updatedRecord.params[propertyName]).to.deep.eq([]);
  });
});