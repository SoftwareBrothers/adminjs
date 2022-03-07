"use strict";

var _chai = require("chai");

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

require("../../../spec/record-json.factory");

require("../../../spec/action-json.factory");

var _getBulkActionsFromRecords = _interopRequireDefault(require("./get-bulk-actions-from-records"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getBulkActionsFromRecords', function () {
  context('records with 2 bulk actions', function () {
    let actions = [];
    let records;
    it('returns array of uniq bulk actions', async function () {
      actions = [await _factoryGirl.default.build('ActionJSON', {
        name: 'bulkAction1',
        actionType: 'bulk'
      }), await _factoryGirl.default.build('ActionJSON', {
        name: 'bulkAction2',
        actionType: 'bulk'
      })];
      records = await _factoryGirl.default.buildMany('RecordJSON', 5, {
        bulkActions: actions
      });
      (0, _chai.expect)((0, _getBulkActionsFromRecords.default)(records)).to.deep.equal(actions);
    });
  });
});