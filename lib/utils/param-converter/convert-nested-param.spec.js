"use strict";

var _chai = require("chai");

var _convertNestedParam = require("./convert-nested-param");

const jsonField = {
  number: '123',
  date: '2020-11-08',
  nested: {
    number: '456'
  },
  nestedList: [{
    number: '789'
  }, {
    number: '111'
  }]
};
describe('module:paramConverter.convertNestedParam', () => {
  it('should convert number property of a JSON to actual number', () => {
    const property = {
      type: 'number',
      propertyPath: 'jsonField.number',
      subProperties: []
    };
    const convertedJson = (0, _convertNestedParam.convertNestedParam)(jsonField, property);
    (0, _chai.expect)(convertedJson.number).to.equal(123);
  });
  it('should convert date property of a JSON to actual number', () => {
    const property = {
      type: 'datetime',
      propertyPath: 'jsonField.date',
      subProperties: []
    };
    const convertedJson = (0, _convertNestedParam.convertNestedParam)(jsonField, property);
    (0, _chai.expect)(convertedJson.date.getTime()).to.equal(new Date('2020-11-08').getTime());
  });
  it('should convert a nested json property\'s number string to actual number', () => {
    const property = {
      type: 'mixed',
      propertyPath: 'jsonField.nested',
      isArray: false,
      subProperties: [{
        propertyPath: 'jsonField.nested.number',
        type: 'number'
      }]
    };
    const convertedJson = (0, _convertNestedParam.convertNestedParam)(jsonField, property);
    (0, _chai.expect)(convertedJson.nested.number).to.equal(456);
  });
  it('should convert a nested json array property\'s number string to actual number', () => {
    const property = {
      type: 'mixed',
      propertyPath: 'jsonField.nestedList',
      isArray: true,
      subProperties: [{
        propertyPath: 'jsonField.nestedList.number',
        type: 'number'
      }]
    };
    const convertedJson = (0, _convertNestedParam.convertNestedParam)(jsonField, property);
    (0, _chai.expect)(convertedJson.nestedList[0].number).to.equal(789);
    (0, _chai.expect)(convertedJson.nestedList[1].number).to.equal(111);
  });
});