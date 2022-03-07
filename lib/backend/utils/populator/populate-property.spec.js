"use strict";

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _adapters = require("../../adapters");

var _decorators = require("../../decorators");

var _populateProperty = require("./populate-property");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('populateProperty', () => {
  const userId = '1234';
  const path = 'userId';
  let resourceDecorator;
  let referenceResource;
  let record;
  let userRecord;
  let property;
  let populatedResponse;
  beforeEach(() => {
    resourceDecorator = _sinon.default.createStubInstance(_decorators.ResourceDecorator);
    referenceResource = _sinon.default.createStubInstance(_adapters.BaseResource);
    record = _sinon.default.createStubInstance(_adapters.BaseRecord);
    userRecord = _sinon.default.createStubInstance(_adapters.BaseRecord);
    property = _sinon.default.createStubInstance(_decorators.PropertyDecorator);
    property.resource.returns(resourceDecorator);
    property.reference.returns(referenceResource);
    property.property = {
      reference: 'someRawReference'
    };
    property.propertyPath = path;
  });
  afterEach(() => {
    _sinon.default.restore();
  });
  it('returns empty array when no records are given', async () => {
    (0, _chai.expect)(await (0, _populateProperty.populateProperty)([], property)).to.deep.eq([]);
  });
  context('2 same records with reference key', () => {
    beforeEach(async () => {
      record.get.returns(userId);
      record.selectParams.returns({
        [path]: userId
      });
      userRecord.id.returns(userId);
      referenceResource.findMany.resolves([userRecord]);
      populatedResponse = await (0, _populateProperty.populateProperty)([record, record], property);
    });
    it('returns 2 records', async () => {
      var _populatedResponse;

      (0, _chai.expect)((_populatedResponse = populatedResponse) === null || _populatedResponse === void 0 ? void 0 : _populatedResponse.length).to.eq(2);
    });
    it('calls findMany in with the list of userIds just once', () => {
      (0, _chai.expect)(referenceResource.findMany).to.have.been.calledOnceWith([userId]);
    });
    it('adds reference resource to record.populated', () => {
      const populatedRecord = populatedResponse && populatedResponse[0];
      (0, _chai.expect)(populatedRecord === null || populatedRecord === void 0 ? void 0 : populatedRecord.populate).to.have.been.calledWith(path, userRecord);
    });
  });
  context('record with array property being also a reference', () => {
    const [userId1, userId2] = ['user1', 'user2'];
    beforeEach(async () => {
      record.get.returns([userId1, userId2]); // resourceDecorator

      userRecord.id.returns(userId);
      property.isArray.returns(true);
      referenceResource.findMany.resolves([userRecord]);
    });
    context('filled array ', () => {
      beforeEach(async () => {
        record.get.returns([userId1, userId2]);
        populatedResponse = await (0, _populateProperty.populateProperty)([record, record], property);
      });
      it('properly finds references in arrays', async () => {
        (0, _chai.expect)(referenceResource.findMany).to.have.been.calledOnceWith([userId1, userId2]);
      });
    });
    context('array value set to null', () => {
      beforeEach(async () => {
        record.get.returns(undefined);
        populatedResponse = await (0, _populateProperty.populateProperty)([record, record], property);
      });
      it('dees not look for any record', () => {
        (0, _chai.expect)(referenceResource.findMany).not.to.have.been.called;
      });
    });
  });
  context('empty references', () => {
    it('does not findMany for null values', async () => {
      record.get.returns(null);
      populatedResponse = await (0, _populateProperty.populateProperty)([record], property);
      (0, _chai.expect)(referenceResource.findMany).not.to.have.been.called;
    });
    it('does not findMany for undefined values', async () => {
      record.get.returns(undefined);
      populatedResponse = await (0, _populateProperty.populateProperty)([record], property);
      (0, _chai.expect)(referenceResource.findMany).not.to.have.been.called;
    });
    it('findMany for 0 values', async () => {
      record.get.returns(0);
      populatedResponse = await (0, _populateProperty.populateProperty)([record], property);
      (0, _chai.expect)(referenceResource.findMany).to.have.been.called;
    });
    it('does not findMany for "" empty strings', async () => {
      record.get.returns('');
      populatedResponse = await (0, _populateProperty.populateProperty)([record], property);
      (0, _chai.expect)(referenceResource.findMany).not.to.have.been.called;
    });
    it('does not findMany for "" empty strings in array', async () => {
      record.get.returns(['']);
      property.isArray.returns(true);
      populatedResponse = await (0, _populateProperty.populateProperty)([record], property);
      (0, _chai.expect)(referenceResource.findMany).not.to.have.been.called;
    });
  });
});