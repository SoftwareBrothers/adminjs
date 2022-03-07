"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _sinon = _interopRequireDefault(require("sinon"));

var _chaiAsPromised = _interopRequireDefault(require("chai-as-promised"));

var _baseResource = _interopRequireDefault(require("./base-resource"));

var _notImplementedError = _interopRequireDefault(require("../../utils/errors/not-implemented-error"));

var _baseRecord = _interopRequireDefault(require("../record/base-record"));

var _adminjs = _interopRequireDefault(require("../../../adminjs"));

var _resourceDecorator = _interopRequireDefault(require("../../decorators/resource/resource-decorator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai.default.use(_chaiAsPromised.default);

describe('BaseResource', function () {
  let resource;
  beforeEach(function () {
    resource = new _baseResource.default({});
  });
  afterEach(function () {
    _sinon.default.restore();
  });
  describe('.isAdapterFor', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(() => _baseResource.default.isAdapterFor({})).to.throw(_notImplementedError.default);
    });
  });
  describe('#databaseName', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(() => resource.databaseName()).to.throw(_notImplementedError.default);
    });
  });
  describe('#databaseType', function () {
    it('returns "database" by default', async function () {
      (0, _chai.expect)(resource.databaseType()).to.eq('other');
    });
  });
  describe('#id', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(() => resource.id()).to.throw(_notImplementedError.default);
    });
  });
  describe('#properties', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(() => resource.properties()).to.throw(_notImplementedError.default);
    });
  });
  describe('#property', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(() => resource.property('someProperty')).to.throw(_notImplementedError.default);
    });
  });
  describe('#count', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(resource.count({})).to.be.rejectedWith(_notImplementedError.default);
    });
  });
  describe('#find', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(resource.find({}, {})).to.be.rejectedWith(_notImplementedError.default);
    });
  });
  describe('#findOne', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(resource.findOne('someId')).to.be.rejectedWith(_notImplementedError.default);
    });
  });
  describe('#build', function () {
    it('returns new BaseRecord', async function () {
      const params = {
        param: 'value'
      };
      (0, _chai.expect)(resource.build(params)).to.be.instanceOf(_baseRecord.default);
    });
  });
  describe('#create', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(resource.create({})).to.be.rejectedWith(_notImplementedError.default);
    });
  });
  describe('#update', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(resource.update('id', {})).to.be.rejectedWith(_notImplementedError.default);
    });
  });
  describe('#delete', function () {
    it('throws NotImplementedError', async function () {
      (0, _chai.expect)(resource.delete('id')).to.be.rejectedWith(_notImplementedError.default);
    });
  });
  describe('#decorate', function () {
    it('returns new Decorator when resource has been decorated', function () {
      _sinon.default.stub(resource, 'properties').returns([]);

      resource.assignDecorator(new _adminjs.default(), {});
      (0, _chai.expect)(resource.decorate()).to.be.instanceOf(_resourceDecorator.default);
    });
    it('throws error when resource has not been decorated', function () {
      (0, _chai.expect)(() => resource.decorate()).to.throw('resource does not have any assigned decorator yet');
    });
  });
});