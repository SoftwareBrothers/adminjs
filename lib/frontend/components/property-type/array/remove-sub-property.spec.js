"use strict";

var _chai = require("chai");

var _removeSubProperty = require("./remove-sub-property");

var _factory = _interopRequireDefault(require("../../spec/factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('removeSubProperty', () => {
  let record;
  let populated1;
  let populated2;
  beforeEach(async () => {
    populated1 = await _factory.default.build('RecordJSON');
    populated2 = await _factory.default.build('RecordJSON');
    record = await _factory.default.build('RecordJSON', {
      params: {
        'property.0': 'val1',
        'property.1': 'val2',
        'property.2': 'val3',
        'property.3.nested.0': 'val1',
        'property.3.nested.1': 'val2',
        'property.3.nested.2': 'val2',
        'property.4': 'val3',
        'notPopulated.0': 'val1',
        'notPopulated.1': 'val2'
      },
      populated: {
        'property.0': null,
        'property.1': populated1,
        'property.2.nested.1': populated2
      }
    });
  });
  context('remove populated record', () => {
    let updatedRecord;
    beforeEach(() => {
      updatedRecord = (0, _removeSubProperty.removeSubProperty)(record, 'property.1');
    });
    it('removes selected, populated, property from params and adjusts the keys', () => {
      (0, _chai.expect)(updatedRecord.params).to.deep.equal({
        'property.0': 'val1',
        'property.1': 'val3',
        'property.2.nested.0': 'val1',
        'property.2.nested.1': 'val2',
        'property.2.nested.2': 'val2',
        'property.3': 'val3',
        'notPopulated.0': 'val1',
        'notPopulated.1': 'val2'
      });
    });
    it('removes populated, record, adjusts the keys and keep it unflatten', () => {
      (0, _chai.expect)(updatedRecord.populated).to.deep.equal({
        'property.0': null,
        'property.1.nested.1': populated2
      });
    });
  });
});