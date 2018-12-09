const expectedResult = {
  showRecordUrl: 'url',
  editRecordUrl: 'url',
  deleteRecordUrl: 'url',
  customRecordActionUrl: 'url',
}

module.exports = sinon => (
  {
    showRecordUrl: sinon.stub().returns(expectedResult.showRecordUrl),
    editRecordUrl: sinon.stub().returns(expectedResult.editRecordUrl),
    deleteRecordUrl: sinon.stub().returns(expectedResult.deleteRecordUrl),
    customRecordActionUrl: sinon.stub().returns(expectedResult.customRecordActionUrl),
  }
)

module.exports.expectedResult = expectedResult
