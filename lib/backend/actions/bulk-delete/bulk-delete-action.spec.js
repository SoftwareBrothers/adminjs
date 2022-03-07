"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));

var _sinon = _interopRequireDefault(require("sinon"));

var _bulkDeleteAction = _interopRequireDefault(require("./bulk-delete-action"));

var _baseRecord = _interopRequireDefault(require("../../adapters/record/base-record"));

var _adminjs = _interopRequireDefault(require("../../../adminjs"));

var _viewHelpers = _interopRequireDefault(require("../../utils/view-helpers/view-helpers"));

var _baseResource = _interopRequireDefault(require("../../adapters/resource/base-resource"));

var _actionDecorator = _interopRequireDefault(require("../../decorators/action/action-decorator"));

var _notFoundError = _interopRequireDefault(require("../../utils/errors/not-found-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai.default.use(_chaiAsPromised.default);

describe('BulkDeleteAction', function () {
  let data;
  const request = {};
  let response;
  describe('.handler', function () {
    afterEach(function () {
      _sinon.default.restore();
    });
    beforeEach(async function () {
      data = {
        _admin: _sinon.default.createStubInstance(_adminjs.default),
        translateMessage: _sinon.default.stub().returns('translatedMessage'),
        h: _sinon.default.createStubInstance(_viewHelpers.default),
        resource: _sinon.default.createStubInstance(_baseResource.default),
        action: _sinon.default.createStubInstance(_actionDecorator.default)
      };
    });
    it('throws error when no records are given', async function () {
      await (0, _chai.expect)(_bulkDeleteAction.default.handler(request, response, data)).to.rejectedWith(_notFoundError.default);
    });
    context('2 records were selected', function () {
      let record;
      let recordJSON;
      beforeEach(function () {
        recordJSON = {
          id: 'someId'
        };
        record = _sinon.default.createStubInstance(_baseRecord.default, {
          toJSON: _sinon.default.stub().returns(recordJSON)
        });
        data.records = [record];
      });
      it('returns all records for get request', async function () {
        request.method = 'get';
        await (0, _chai.expect)(_bulkDeleteAction.default.handler(request, response, data)).to.eventually.deep.equal({
          records: [recordJSON]
        });
      });
      it('deletes all records for post request', async function () {
        request.method = 'post';
        await _bulkDeleteAction.default.handler(request, response, data);
        (0, _chai.expect)(data.resource.delete).to.have.been.calledOnce;
      });
      it('returns deleted records, notice and redirectUrl for post request', async function () {
        request.method = 'post';
        const actionResponse = await _bulkDeleteAction.default.handler(request, response, data);
        (0, _chai.expect)(actionResponse).to.have.property('notice');
        (0, _chai.expect)(actionResponse).to.have.property('redirectUrl');
        (0, _chai.expect)(actionResponse).to.have.property('records');
      });
    });
  });
});