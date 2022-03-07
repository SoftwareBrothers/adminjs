"use strict";

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _actionDecorator = _interopRequireDefault(require("./action-decorator"));

var _adminjs = _interopRequireDefault(require("../../../adminjs"));

var _baseResource = _interopRequireDefault(require("../../adapters/resource/base-resource"));

var _forbiddenError = _interopRequireDefault(require("../../utils/errors/forbidden-error"));

var _validationError = _interopRequireDefault(require("../../utils/errors/validation-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('ActionDecorator', function () {
  const request = {
    response: true
  };
  let admin;
  let resource;
  let context;
  let handler;
  beforeEach(function () {
    admin = _sinon.default.createStubInstance(_adminjs.default);
    resource = _sinon.default.createStubInstance(_baseResource.default);
    context = {
      resource,
      _admin: admin
    };
    handler = _sinon.default.stub();
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  describe('#before', function () {
    it('calls all functions if they were given as an array', async function () {
      // 3 hooks one adding response1 key and the other adding response2 key
      // and finally one async adding response3
      const before = [() => ({
        response1: true
      }), response => _objectSpread(_objectSpread({}, response), {}, {
        response2: true
      }), async response => _objectSpread(_objectSpread({}, response), {}, {
        response3: true
      })];
      const decorator = new _actionDecorator.default({
        action: {
          before,
          handler,
          name: 'myAction',
          actionType: 'resource'
        },
        admin,
        resource
      });
      const ret = await decorator.invokeBeforeHook({}, {});
      (0, _chai.expect)(ret).to.deep.eq({
        response1: true,
        response2: true,
        response3: true
      });
    });
  });
  describe('#after', function () {
    it('calls all functions if they were given as an array', async function () {
      // 2 hooks one adding response1 key and the other adding response2 key
      const after = [() => ({
        response1: true
      }), response => _objectSpread(_objectSpread({}, response), {}, {
        response2: true
      }), async response => _objectSpread(_objectSpread({}, response), {}, {
        response3: true
      })];
      const decorator = new _actionDecorator.default({
        action: {
          after,
          handler,
          name: 'myAction',
          actionType: 'resource'
        },
        admin,
        resource
      });
      const ret = await decorator.invokeAfterHook({}, {}, {});
      (0, _chai.expect)(ret).to.deep.eq({
        response1: true,
        response2: true,
        response3: true
      });
    });
  });
  describe('#handler', function () {
    it('calls the before action when it is given', async function () {
      const mockedRequest = {
        response: true
      };

      const before = _sinon.default.stub().returns(mockedRequest);

      const decorator = new _actionDecorator.default({
        action: {
          before,
          handler,
          name: 'myAction',
          actionType: 'resource'
        },
        admin,
        resource
      });
      await decorator.handler(request, 'res', context);
      (0, _chai.expect)(before).to.have.been.calledWith(request);
      (0, _chai.expect)(handler).to.have.been.calledWith(_sinon.default.match(mockedRequest));
    });
    it('calls the after action when it is given', async function () {
      const modifiedData = {
        records: false
      };
      const data = {};

      const after = _sinon.default.stub().returns(modifiedData);

      handler = handler.resolves(data);
      const decorator = new _actionDecorator.default({
        action: {
          name: 'myAction',
          handler,
          after,
          actionType: 'resource'
        },
        admin,
        resource
      });
      const ret = await decorator.handler(request, 'res', context);
      (0, _chai.expect)(ret).to.equal(modifiedData);
      (0, _chai.expect)(handler).to.have.been.called;
      (0, _chai.expect)(after).to.have.been.calledWith(data);
    });
    it('returns forbidden error when its thrown', async function () {
      const errorMessage = 'you cannot edit this resource';

      const before = _sinon.default.stub().throws(new _forbiddenError.default(errorMessage));

      const decorator = new _actionDecorator.default({
        action: {
          before,
          handler,
          name: 'myAction',
          actionType: 'record'
        },
        admin,
        resource
      });
      const ret = await decorator.handler(request, 'res', context);
      (0, _chai.expect)(before).to.have.been.calledWith(request);
      (0, _chai.expect)(ret).to.deep.equal({
        notice: {
          message: errorMessage,
          type: 'error'
        }
      });
      (0, _chai.expect)(handler).not.to.have.been.called;
    });
    it('returns record with validation errors when they are thrown', async function () {
      const errors = {
        email: {
          message: 'Wrong email',
          type: 'notGood'
        }
      };
      const notice = {
        message: 'There are validation errors',
        type: 'validationError'
      };

      const before = _sinon.default.stub().throws(new _validationError.default(errors, notice));

      const decorator = new _actionDecorator.default({
        action: {
          before,
          handler,
          name: 'myAction',
          actionType: 'record'
        },
        admin,
        resource
      });
      const ret = await decorator.handler(request, 'res', context);
      (0, _chai.expect)(before).to.have.been.calledWith(request);
      (0, _chai.expect)(ret).to.deep.equal({
        notice: {
          message: notice.message,
          type: 'error'
        },
        record: {
          errors,
          params: {},
          populated: {}
        }
      });
      (0, _chai.expect)(handler).not.to.have.been.called;
    });
  });
});