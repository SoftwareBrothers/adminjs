"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiChange = _interopRequireDefault(require("chai-change"));

var _sinon = _interopRequireDefault(require("sinon"));

var _sinonChai = _interopRequireDefault(require("sinon-chai"));

var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));

var _baseRecord = _interopRequireDefault(require("./base-record"));

var _baseResource = _interopRequireDefault(require("../resource/base-resource"));

var _baseProperty = _interopRequireDefault(require("../property/base-property"));

var _validationError = _interopRequireDefault(require("../../utils/errors/validation-error"));

var _decorators = require("../../decorators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_chai.default.use(_chaiAsPromised.default);

_chai.default.use(_chaiChange.default);

_chai.default.use(_sinonChai.default);

describe('Record', function () {
  let record;
  let params = {
    param1: 'john'
  };
  afterEach(function () {
    _sinon.default.restore();
  });
  describe('#get', function () {
    context('record with nested parameters', function () {
      const nested3level = 'value';
      beforeEach(function () {
        params = {
          nested1level: {
            nested2level: {
              nested3level
            }
          }
        };
        record = new _baseRecord.default(params, {});
      });
      it('returns deepest field when all up-level keys are given', function () {
        (0, _chai.expect)(record.get('nested1level.nested2level.nested3level')).to.equal(nested3level);
      });
      it('returns object when all up-level keys are given except one', function () {
        (0, _chai.expect)(record.get('nested1level.nested2level')).to.deep.equal({
          nested3level
        });
      });
      it('returns object when only first level key is given', function () {
        (0, _chai.expect)(record.get('nested1level')).to.deep.equal({
          nested2level: {
            nested3level
          }
        });
      });
      it('returns undefined when passing unknown param', function () {
        (0, _chai.expect)(record.get('nested1level.nested2')).to.be.undefined;
      });
    });
  });
  describe('#constructor', function () {
    it('returns empty object if params are not passed to the constructor', function () {
      record = new _baseRecord.default({}, {});
      (0, _chai.expect)(record.params).to.deep.equal({});
    });
    it('stores flatten object params', function () {
      record = new _baseRecord.default({
        auth: {
          login: 'login'
        }
      }, {});
      (0, _chai.expect)(record.params).to.deep.equal({
        'auth.login': 'login'
      });
    });
  });
  describe('#save', function () {
    const newParams = {
      param2: 'doe'
    };
    const properties = [new _baseProperty.default({
      path: '_id',
      isId: true
    })];
    let resource;
    beforeEach(function () {
      resource = _sinon.default.createStubInstance(_baseResource.default, {
        properties: _sinon.default.stub().returns(properties),
        create: _sinon.default.stub().resolves(newParams),
        update: _sinon.default.stub().resolves(newParams)
      });
    });
    it('uses BaseResource#create method when there is no id property', async function () {
      record = new _baseRecord.default(newParams, resource);
      record.save();
      (0, _chai.expect)(resource.create).to.have.been.calledWith(newParams);
    });
    it('uses BaseResource#update method when there is a id property', function () {
      const _id = '1231231313';
      record = new _baseRecord.default(_objectSpread(_objectSpread({}, newParams), {}, {
        _id
      }), resource);
      record.save();
      (0, _chai.expect)(resource.update).to.have.been.calledWith(_id, _objectSpread(_objectSpread({}, newParams), {}, {
        _id
      }));
    });
    it('stores validation error when they happen', async function () {
      const propertyErrors = {
        param2: {
          type: 'required',
          message: 'Field is required'
        }
      };
      resource.create = _sinon.default.stub().rejects(new _validationError.default(propertyErrors));
      record = new _baseRecord.default(newParams, resource);
      await record.save();
      (0, _chai.expect)(record.error('param2')).to.deep.equal(propertyErrors.param2);
    });
  });
  describe('#update', function () {
    const newParams = {
      param2: 'doe'
    };
    const properties = [new _baseProperty.default({
      path: '_id',
      isId: true
    })];
    params = {
      param1: 'john',
      _id: '1381723981273'
    };
    let resource;
    context('resource stores the value', function () {
      beforeEach(async function () {
        resource = _sinon.default.createStubInstance(_baseResource.default, {
          properties: _sinon.default.stub().returns(properties),
          update: _sinon.default.stub().resolves(newParams)
        });
        record = new _baseRecord.default(params, resource);
        await record.update(newParams);
      });
      it('stores what was returned by BaseResource#update to this.params', function () {
        (0, _chai.expect)(record.get('param2')).to.equal(newParams.param2);
      });
      it('resets the errors when there are no', function () {
        (0, _chai.expect)(record.errors).to.deep.equal({});
      });
      it('calls the BaseResource#update function with the id and new params', function () {
        (0, _chai.expect)(resource.update).to.have.been.calledWith(params._id, newParams);
      });
    });
    context('resource throws validation error', function () {
      const propertyErrors = {
        param2: {
          type: 'required',
          message: 'Field is required'
        }
      };
      beforeEach(async function () {
        resource = _sinon.default.createStubInstance(_baseResource.default, {
          properties: _sinon.default.stub().returns(properties),
          update: _sinon.default.stub().rejects(new _validationError.default(propertyErrors))
        });
        record = new _baseRecord.default(params, resource);
        this.returnedValue = await record.update(newParams);
      });
      it('stores validation errors', function () {
        (0, _chai.expect)(record.error('param2')).to.deep.equal(propertyErrors.param2);
      });
      it('returns itself', function () {
        (0, _chai.expect)(this.returnedValue).to.equal(record);
      });
    });
  });
  describe('#isValid', function () {
    it('returns true when there are no errors', function () {
      record.errors = {};
      (0, _chai.expect)(record.isValid()).to.equal(true);
    });
    it('returns false when there is at least on error', function () {
      record.errors = {
        pathWithError: {
          type: 'required',
          message: 'I am error'
        }
      };
      (0, _chai.expect)(record.isValid()).to.equal(false);
    });
  });
  describe('#title', function () {
    const properties = [new _baseProperty.default({
      path: 'name'
    })];
    params = {
      name: 'john',
      _id: '1381723981273'
    };
    it('returns value in title property', function () {
      const resource = _sinon.default.createStubInstance(_baseResource.default, {
        properties: _sinon.default.stub().returns(properties)
      });

      record = new _baseRecord.default(params, resource);
      (0, _chai.expect)(record.title()).to.equal(params.name);
    });
  });
  describe('#populate', function () {
    it('sets populated field', function () {
      const populated = {
        value: new _baseRecord.default({}, {})
      };
      record = new _baseRecord.default(params, {});
      record.populate('value', populated.value);
      (0, _chai.expect)(record.populated.value).to.equal(populated.value);
    });
    it('clears populated field when record is null or undefined', () => {
      record = new _baseRecord.default(params, {});
      record.populate('value', 'something');
      (0, _chai.expect)(() => {
        record.populate('value', null);
      }).to.alter(() => record.populated.value, {
        from: 'something',
        to: undefined
      });
    });
  });
  describe('#toJSON', () => {
    const param = 'populatedProperty';
    let resource;
    beforeEach(() => {
      resource = _sinon.default.createStubInstance(_baseResource.default, {
        properties: _sinon.default.stub().returns([]),
        decorate: _sinon.default.stub().returns(_sinon.default.createStubInstance(_decorators.ResourceDecorator, {
          recordActions: _sinon.default.stub().returns([]),
          bulkActions: _sinon.default.stub().returns([])
        }))
      });
      record = new _baseRecord.default(params, resource);
    });
    it('changes populated records to JSON', () => {
      const refRecord = _sinon.default.createStubInstance(_baseRecord.default, {
        toJSON: _sinon.default.stub()
      });

      record.populate(param, refRecord);

      _sinon.default.stub(record, 'id').returns('1');

      record.toJSON();
      (0, _chai.expect)(refRecord.toJSON).to.have.been.calledOnce;
    });
    it('does not changes to JSON when in populated there is something else than BaseRecord', () => {
      record.populate(param, 'something else');

      _sinon.default.stub(record, 'id').returns('1');

      (0, _chai.expect)(() => {
        record.toJSON();
      }).not.to.throw();
    });
  });
});