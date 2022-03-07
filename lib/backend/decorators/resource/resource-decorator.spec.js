"use strict";

var _sinon = _interopRequireDefault(require("sinon"));

var _chai = require("chai");

var _resourceDecorator = _interopRequireDefault(require("./resource-decorator"));

var _propertyDecorator = _interopRequireDefault(require("../property/property-decorator"));

var _adminjs = _interopRequireWildcard(require("../../../adminjs"));

var _resourceStub = _interopRequireWildcard(require("../../../../spec/backend/helpers/resource-stub"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const translatedLabel = 'translated label';
const currentAdmin = {
  email: 'some@email.com',
  name: 'someName',
  otherValue: 'someOther-value'
};

const stubAdminJS = () => {
  const stubbedAdmin = _sinon.default.createStubInstance(_adminjs.default);

  return Object.assign(stubbedAdmin, {
    translateLabel: _sinon.default.stub().returns(translatedLabel),
    translateProperty: _sinon.default.stub().returns('translated property'),
    translateAction: _sinon.default.stub().returns('translated action'),
    translateMessage: _sinon.default.stub().returns('translate message'),
    options: _objectSpread(_objectSpread({}, _adminjs.defaultOptions), {}, {
      rootPath: '/admin'
    })
  });
};

describe('ResourceDecorator', function () {
  let stubbedAdmin;
  let stubbedRecord;
  let stubbedResource;
  let args;
  beforeEach(function () {
    stubbedRecord = _sinon.default.stub();
    stubbedResource = (0, _resourceStub.default)();
    stubbedResource._decorated = {
      id: () => 'resourceId'
    };
    stubbedAdmin = stubAdminJS();
    args = {
      resource: stubbedResource,
      admin: stubbedAdmin
    };
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  describe('#getResourceName', function () {
    it('returns resource when name is not specified in options', function () {
      (0, _chai.expect)(new _resourceDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        options: {}
      })).getResourceName()).to.equal(translatedLabel);
    });
  });
  describe('#getNavigation', function () {
    it('returns custom name with icon when options were specified', function () {
      const options = {
        navigation: {
          name: 'someName',
          icon: 'someIcon',
          show: true
        }
      };
      (0, _chai.expect)(new _resourceDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        options
      })).getNavigation()).to.deep.equal(options.navigation);
    });
  });
  describe('#getProperties', function () {
    context('all properties are visible', function () {
      beforeEach(function () {
        _sinon.default.stub(_propertyDecorator.default.prototype, 'isVisible').returns(true);
      });
      it('returns first n items when limit is given', function () {
        const max = 3;
        const decorator = new _resourceDecorator.default(args);
        (0, _chai.expect)(decorator.getProperties({
          where: 'list',
          max
        })).to.have.lengthOf(max);
      });
      it('returns all properties when limit is not given', function () {
        const decorator = new _resourceDecorator.default(args);
        (0, _chai.expect)(decorator.getProperties({
          where: 'list'
        })).to.have.lengthOf(_resourceStub.expectedResult.properties.length);
      });
      it('returns only showProperties from options if they were given', function () {
        const path = _resourceStub.expectedResult.properties[0].path();

        const decorator = new _resourceDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
          options: {
            showProperties: [path]
          }
        }));
        (0, _chai.expect)(decorator.getProperties({
          where: 'show'
        })).to.have.lengthOf(1);
      });
    });
  });
  describe('#resourceActions', function () {
    context('no action were specified in custom settings', function () {
      let decorator;
      beforeEach(function () {
        const options = {};
        decorator = new _resourceDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
          options
        }));
      });
      it('returns 2 default resource actions', function () {
        const actions = decorator.resourceActions(currentAdmin);
        const [action] = actions;
        (0, _chai.expect)(actions).to.have.lengthOf(2);
        (0, _chai.expect)(action).to.have.property('name', 'new');
      });
    });
  });
  describe('#getPropertyByKey', function () {
    let decorator;
    beforeEach(function () {
      decorator = new _resourceDecorator.default(args);
    });
    it('returns property by giving its key', function () {
      const propertyPath = _resourceStub.expectedResult.properties[0].path();

      (0, _chai.expect)(decorator.getPropertyByKey(propertyPath)).to.be.an.instanceof(_propertyDecorator.default);
    });
    it('returns null when there is no property by given key', function () {
      (0, _chai.expect)(decorator.getPropertyByKey('some-unknown-name')).to.eq(null);
    });
    it('returns mixed property', function () {
      var _expectedResult$prope;

      const propertyPath = (_expectedResult$prope = _resourceStub.expectedResult.properties.find(p => p.type() === 'mixed')) === null || _expectedResult$prope === void 0 ? void 0 : _expectedResult$prope.path();
      (0, _chai.expect)(decorator.getPropertyByKey(propertyPath)).to.be.an.instanceof(_propertyDecorator.default);
    });
    it('returns nested property under mixed', function () {
      const property = _resourceStub.expectedResult.properties.find(p => p.type() === 'mixed');

      const nested1Property = property === null || property === void 0 ? void 0 : property.subProperties().find(p => p.type() !== 'mixed');
      const path = [property.path(), nested1Property.path()].join('.');
      const decoratedProperty = decorator.getPropertyByKey(path);
      (0, _chai.expect)(decoratedProperty).to.be.an.instanceof(_propertyDecorator.default);
      (0, _chai.expect)(decoratedProperty.propertyPath).to.eq(path);
    });
    it('returns nested property under 2 level nested mixed', function () {
      const property = _resourceStub.expectedResult.properties.find(p => p.type() === 'mixed');

      const nested1Property = property === null || property === void 0 ? void 0 : property.subProperties().find(p => p.type() === 'mixed');
      const nested2Property = nested1Property === null || nested1Property === void 0 ? void 0 : nested1Property.subProperties()[0];
      const path = [property.path(), nested1Property.path(), nested2Property.path()].join('.');
      const decoratedProperty = decorator.getPropertyByKey(path);
      (0, _chai.expect)(decoratedProperty).to.be.an.instanceof(_propertyDecorator.default);
      (0, _chai.expect)(decoratedProperty.propertyPath).to.eq(path);
    });
    it('returns property when it is an array', function () {
      const arrayProperty = _resourceStub.expectedResult.properties.find(p => p.isArray()); // checking of a property of first item in an array


      const path = [arrayProperty.path(), '0'].join('.');
      const decoratedProperty = decorator.getPropertyByKey(path);
      (0, _chai.expect)(decoratedProperty).to.be.an.instanceof(_propertyDecorator.default);
      (0, _chai.expect)(decoratedProperty.propertyPath).to.eq(arrayProperty.path());
    });
    it('returns property when it is an nested array', function () {
      const arrayProperty = _resourceStub.expectedResult.properties.find(p => p.isArray() && p.type() === 'mixed');

      const nested1Property = arrayProperty === null || arrayProperty === void 0 ? void 0 : arrayProperty.subProperties()[0]; // checking of a property of first item in an array

      const path = [arrayProperty.path(), '0', nested1Property.path()].join('.');
      const decoratedProperty = decorator.getPropertyByKey(path);
      (0, _chai.expect)(decoratedProperty).to.be.an.instanceof(_propertyDecorator.default);
      (0, _chai.expect)(decoratedProperty.propertyPath).to.eq([arrayProperty.path(), nested1Property.path()].join('.'));
    });
  });
  describe('#recordAction', function () {
    it('returns default actions', function () {
      const actions = new _resourceDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        options: {}
      })).recordActions(stubbedRecord, currentAdmin);
      (0, _chai.expect)(actions).to.have.lengthOf(3);
    });
    it('shows custom actions specified by the user', function () {
      const options = {
        actions: {
          customAction: {
            actionType: 'record'
          }
        }
      };
      const actions = new _resourceDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        options
      })).recordActions(stubbedRecord, currentAdmin);
      (0, _chai.expect)(actions).to.have.lengthOf(4);
    });
    it('hides the given action if user set isVisible to false', function () {
      const options = {
        actions: {
          show: {
            isVisible: false
          }
        }
      };
      const actions = new _resourceDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        options
      })).recordActions(stubbedRecord, currentAdmin);
      (0, _chai.expect)(actions).to.have.lengthOf(2);
    });
    it('passes properties to isVisible when it is a function', function () {
      const someRecord = {
        params: {
          param: 'someRecord'
        }
      };
      const options = {
        actions: {
          show: {
            isVisible: data => {
              // it passes current admin to the isVisible function
              (0, _chai.expect)(data.currentAdmin).to.deep.equal(currentAdmin);
              (0, _chai.expect)(data.resource.id).to.equal(stubbedResource.id);
              (0, _chai.expect)(data.action.name).to.equal('show');
              (0, _chai.expect)(data.record).to.equal(someRecord);
              return false;
            }
          }
        }
      };
      const actions = new _resourceDecorator.default(_objectSpread(_objectSpread({}, args), {}, {
        options
      })).recordActions(someRecord, currentAdmin);
      (0, _chai.expect)(actions).to.have.lengthOf(2);
    });
  });
  describe('#toJSON', function () {
    it('returns JSON representation of a resource', function () {
      const json = new _resourceDecorator.default(args).toJSON(currentAdmin);
      (0, _chai.expect)(json).to.have.keys('id', 'name', 'navigation', 'href', 'actions', 'titleProperty', 'resourceActions', 'listProperties', 'editProperties', 'showProperties', 'filterProperties', 'properties');
    });
    it('passes current admin to the resourceActions', function () {
      const resourceActionsSpy = _sinon.default.spy(_resourceDecorator.default.prototype, 'resourceActions');

      new _resourceDecorator.default(args).toJSON(currentAdmin);
      (0, _chai.expect)(resourceActionsSpy).to.have.been.calledWith(currentAdmin);
    });
  });
});