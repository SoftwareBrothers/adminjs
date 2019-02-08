const _ = require('lodash')

const expectedResult = {
  showRecordUrl: '#showUrl',
  editRecordUrl: '#editUrl',
  deleteRecordUrl: '#deleteUrl',
  customRecordActionUrl: 'customUrl',
}

module.exports = sinon => (
  {
    showRecordUrl: sinon.stub().returns(expectedResult.showRecordUrl),
    editRecordUrl: sinon.stub().returns(expectedResult.editRecordUrl),
    deleteRecordUrl: sinon.stub().returns(expectedResult.deleteRecordUrl),
    customRecordActionUrl: sinon.stub().returns(expectedResult.customRecordActionUrl),
    _,
  }
)

module.exports.expectedResult = expectedResult
