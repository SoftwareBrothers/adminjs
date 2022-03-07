"use strict";

var _sinon = _interopRequireDefault(require("sinon"));

var _chai = require("chai");

var _baseResource = _interopRequireDefault(require("../../adapters/resource/base-resource"));

var _baseRecord = _interopRequireDefault(require("../../adapters/record/base-record"));

var _validationError = _interopRequireDefault(require("../../utils/errors/validation-error"));

var _actionErrorHandler = _interopRequireDefault(require("./action-error-handler"));

var _forbiddenError = _interopRequireDefault(require("../../utils/errors/forbidden-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ActionErrorHandler', function () {
  let resource;
  let record;
  let translateMessage;
  let context;
  const notice = {
    message: 'stubbed translation message',
    type: 'error'
  };
  const currentAdmin = {};
  beforeEach(function () {
    resource = _sinon.default.createStubInstance(_baseResource.default);
    record = _sinon.default.createStubInstance(_baseRecord.default);
    translateMessage = _sinon.default.stub().returns(notice.message);
    context = {
      resource,
      record,
      currentAdmin,
      translateMessage
    };
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  it('returns record with validation error when ValidationError is thrown', function () {
    const errors = {
      fieldWithError: {
        type: 'required',
        message: 'Field is required'
      }
    };
    const error = new _validationError.default(errors);
    (0, _chai.expect)((0, _actionErrorHandler.default)(error, context)).to.deep.equal({
      record: {
        errors,
        params: {},
        populated: {}
      },
      notice
    });
  });
  it('throws any undefined error back to the app', function () {
    const unknownError = new Error();
    (0, _chai.expect)(() => {
      (0, _actionErrorHandler.default)(unknownError, context);
    }).to.throw(unknownError);
  });
  it('returns record with forbidden error when ForbiddenError is thrown', function () {
    const errorMessage = 'you cannot perform this action';
    const error = new _forbiddenError.default(errorMessage);
    (0, _chai.expect)((0, _actionErrorHandler.default)(error, context)).to.deep.equal({
      notice: {
        message: errorMessage,
        type: 'error'
      }
    });
  });
});