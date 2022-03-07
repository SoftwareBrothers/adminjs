"use strict";

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _propertyDecorator = _interopRequireDefault(require("./property-decorator"));

var _baseProperty = _interopRequireDefault(require("../../adapters/property/base-property"));

var _adminjs = _interopRequireDefault(require("../../../adminjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('PropertyDecorator', () => {
  const translatedProperty = 'translated property';
  let stubbedAdmin;
  let property;
  let args;
  beforeEach(() => {
    property = new _baseProperty.default({
      path: 'name',
      type: 'string'
    });
    stubbedAdmin = _sinon.default.createStubInstance(_adminjs.default);
    stubbedAdmin.translateProperty = _sinon.default.stub().returns(translatedProperty);
    args = {
      property,
      admin: stubbedAdmin,
      resource: {
        id: () => 'someId'
      }
    };
  });
  describe('#isSortable', () => {
    it('passes the execution to the base property', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'isSortable').returns(false);

      (0, _chai.expect)(new _propertyDecorator.default(args).isSortable()).to.equal(false);
    });
  });
  describe('#isVisible', () => {
    it('passes execution to BaseProperty.isVisible for list when no options are specified', () => {
      (0, _chai.expect)(new _propertyDecorator.default(args).isVisible('list')).to.equal(property.isVisible());
    });
    it('passes execution to BaseProperty.isEditable for edit when no options are specified', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'isVisible').returns(false);

      (0, _chai.expect)(new _propertyDecorator.default(args).isVisible('edit')).to.equal(property.isEditable());
    });
    it('sets new value when it is changed for all views by isVisible option', () => {
      const decorator = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        options: {
          isVisible: false
        }
      }));
      (0, _chai.expect)(decorator.isVisible('list')).to.equal(false);
      (0, _chai.expect)(decorator.isVisible('edit')).to.equal(false);
      (0, _chai.expect)(decorator.isVisible('show')).to.equal(false);
    });
  });
  describe('#label', () => {
    it('returns translated label', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'name').returns('normalName');

      (0, _chai.expect)(new _propertyDecorator.default(args).label()).to.equal(translatedProperty);
    });
  });
  describe('#reference', () => {
    const rawReferenceValue = 'Article';
    const optionsReferenceValue = 'BlogPost';
    const ReferenceResource = 'OtherResource';
    beforeEach(() => {
      property = new _baseProperty.default({
        path: 'externalId',
        type: 'reference'
      });

      _sinon.default.stub(property, 'reference').returns(rawReferenceValue);

      args.admin.findResource.returns(ReferenceResource);
    });
    it('returns model from AdminJS for reference name in properties', () => {
      new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property
      })).reference();
      (0, _chai.expect)(args.admin.findResource).to.have.been.calledWith(rawReferenceValue);
    });
    it('returns model from options when they are given', () => {
      new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property,
        options: {
          reference: optionsReferenceValue
        }
      })).reference();
      (0, _chai.expect)(args.admin.findResource).to.have.been.calledWith(optionsReferenceValue);
    });
  });
  describe('#type', () => {
    const propertyType = 'boolean';
    beforeEach(() => {
      property = new _baseProperty.default({
        path: 'externalId',
        type: propertyType
      });
    });
    it('returns `reference` type if reference is set in options', () => {
      const decorator = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property,
        options: {
          reference: 'SomeReference'
        }
      }));
      (0, _chai.expect)(decorator.type()).to.equal('reference');
    });
    it('returns property reference when no options are given', () => {
      const decorator = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property
      }));
      (0, _chai.expect)(decorator.type()).to.equal(propertyType);
    });
  });
  describe('#availableValues', () => {
    it('map default value to { value, label } object and uses translations', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'availableValues').returns(['val']);

      (0, _chai.expect)(new _propertyDecorator.default(args).availableValues()).to.deep.equal([{
        value: 'val',
        label: translatedProperty
      }]);
    });
  });
  describe('#position', () => {
    it('returns -1 for title field', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'isTitle').returns(true);

      (0, _chai.expect)(new _propertyDecorator.default(args).position()).to.equal(-1);
    });
    it('returns 101 for second field', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'isTitle').returns(false);

      (0, _chai.expect)(new _propertyDecorator.default(args).position()).to.equal(101);
    });
    it('returns 0 for an id field', () => {
      _sinon.default.stub(_baseProperty.default.prototype, 'isTitle').returns(false);

      _sinon.default.stub(_baseProperty.default.prototype, 'isId').returns(true);

      (0, _chai.expect)(new _propertyDecorator.default(args).position()).to.equal(0);
    });
  });
  describe('#subProperties', () => {
    let propertyDecorator;
    const propertyName = 'super';
    const subPropertyName = 'nested';
    const subPropertyLabel = 'nestedLabel';
    beforeEach(() => {
      property = new _baseProperty.default({
        path: propertyName,
        type: 'string'
      });

      _sinon.default.stub(property, 'subProperties').returns([new _baseProperty.default({
        path: subPropertyName,
        type: 'string'
      })]);

      propertyDecorator = new _propertyDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        property,
        resource: {
          id: () => 'resourceId',
          options: {
            properties: {
              [`${propertyName}.${subPropertyName}`]: {
                label: subPropertyLabel
              }
            }
          }
        }
      }));
    });
    it('returns the array of decorated properties', () => {
      (0, _chai.expect)(propertyDecorator.subProperties()).to.have.lengthOf(1);
      (0, _chai.expect)(propertyDecorator.subProperties()[0]).to.be.instanceOf(_propertyDecorator.default);
    });
    it('changes label of the nested property to what was given in PropertyOptions', () => {
      const subProperty = propertyDecorator.subProperties()[0];
      (0, _chai.expect)(subProperty.label()).to.eq(translatedProperty);
    });
  });
  describe('#toJSON', () => {
    it('returns JSON representation of a property', () => {
      (0, _chai.expect)(new _propertyDecorator.default(args).toJSON()).to.have.keys('isTitle', 'isId', 'position', 'isSortable', 'availableValues', 'name', 'label', 'type', 'reference', 'components', 'isDisabled', 'subProperties', 'isArray', 'isDraggable', 'custom', 'resourceId', 'propertyPath', 'isRequired', 'isVirtual', 'props', 'hideLabel', 'description');
    });
  });
  afterEach(() => {
    _sinon.default.restore();
  });
});