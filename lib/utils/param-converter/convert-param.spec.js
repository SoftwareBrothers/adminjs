"use strict";

var _chai = require("chai");

var _convertParam = require("./convert-param");

describe('module:paramConverter.convertParam', () => {
  it('should convert numeric strings to Number', () => {
    (0, _chai.expect)((0, _convertParam.convertParam)('123', 'number')).to.equal(123);
  });
  it('should convert bool strings to Boolean', () => {
    /*
      This will actually evaluate any string with length > 0 to true
      Ideally, additional validation should be added to convertParam
    */
    (0, _chai.expect)((0, _convertParam.convertParam)('true', 'boolean')).to.equal(true);
  });
  it('should convert datetime strings to Date', () => {
    (0, _chai.expect)((0, _convertParam.convertParam)('2021-11-08', 'datetime').getTime()).to.equal(new Date('2021-11-08').getTime());
  });
  it('should leave other values unchanged', () => {
    (0, _chai.expect)((0, _convertParam.convertParam)(null, 'some other type')).to.equal(null);
  });
});