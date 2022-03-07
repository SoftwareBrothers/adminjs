"use strict";

var _chai = require("chai");

var _layoutElementParser = _interopRequireDefault(require("./layout-element-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('layoutElementParser', function () {
  const propertyName = 'name';
  const property2 = 'surname';
  const props = {
    mt: 'default',
    ml: 'xxxl'
  };
  it('parses regular string', function () {
    (0, _chai.expect)((0, _layoutElementParser.default)(propertyName)).to.deep.eq({
      properties: [propertyName],
      props: {},
      layoutElements: [],
      component: 'Box'
    });
  });
  it('parses list of strings', function () {
    (0, _chai.expect)((0, _layoutElementParser.default)([propertyName, property2])).to.deep.eq({
      properties: [propertyName, property2],
      props: {},
      layoutElements: [],
      component: 'Box'
    });
  });
  it('parses property and props', function () {
    (0, _chai.expect)((0, _layoutElementParser.default)([propertyName, props])).to.deep.eq({
      properties: [propertyName],
      props,
      layoutElements: [],
      component: 'Box'
    });
  });
  it('recursively parses and inner element as string', function () {
    const innerElement = ['string2', {
      width: 1 / 2
    }];
    (0, _chai.expect)((0, _layoutElementParser.default)([props, [innerElement]])).to.deep.eq({
      properties: [],
      props,
      layoutElements: [(0, _layoutElementParser.default)(innerElement)],
      component: 'Box'
    });
  });
  it('recursively parses nested objects', function () {
    const nested = [['companyName', {
      ml: 'xxl'
    }], 'email', ['address', 'profilePhotoLocation']];
    const complicatedElement = [props, nested];
    (0, _chai.expect)((0, _layoutElementParser.default)(complicatedElement)).to.deep.eq({
      properties: [],
      props,
      layoutElements: nested.map(el => (0, _layoutElementParser.default)(el)),
      component: 'Box'
    });
  });
  it('returns layoutElements when array is passed', function () {
    const arrayElements = [['string1', {
      width: 1 / 2
    }], ['string2', {
      width: 1 / 2
    }]];
    (0, _chai.expect)((0, _layoutElementParser.default)(arrayElements)).to.deep.eq({
      properties: [],
      props: {},
      component: 'Box',
      layoutElements: arrayElements.map(innerElement => (0, _layoutElementParser.default)(innerElement))
    });
  });
  it('changes the component when @ is appended', function () {
    const headerProps = {
      children: 'Welcome my boy'
    };
    const componentElements = ['@Header', headerProps];
    (0, _chai.expect)((0, _layoutElementParser.default)(componentElements)).to.deep.eq({
      properties: [],
      props: headerProps,
      component: 'Header',
      layoutElements: []
    });
  });
});