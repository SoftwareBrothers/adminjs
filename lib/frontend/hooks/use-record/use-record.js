"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRecord = exports.default = void 0;

var _react = require("react");

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _paramsToFormData = require("./params-to-form-data");

var _useNotice = _interopRequireDefault(require("../use-notice"));

var _mergeRecordResponse = _interopRequireDefault(require("./merge-record-response"));

var _updateRecord = _interopRequireDefault(require("./update-record"));

var _isEntireRecordGiven = _interopRequireDefault(require("./is-entire-record-given"));

var _filterRecord = require("./filter-record");

var _utils = require("../../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const api = new _apiClient.default();
/**
 * @load ./use-record.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @bundle
 * @param {RecordJSON} [initialRecord],
 * @param {string} resourceId
 * @param {UseRecordOptions} [options]
 * @return {UseRecordResult}
 */

const useRecord = (initialRecord, resourceId, options) => {
  var _filteredRecord$param, _initialRecord$errors, _initialRecord$popula;

  // setting up state
  const [loading, setLoading] = (0, _react.useState)(false);
  const [isSynced, setIsSynced] = (0, _react.useState)(true);
  const [progress, setProgress] = (0, _react.useState)(0);
  const filteredRecord = initialRecord ? (0, _filterRecord.filterRecordParams)(initialRecord, options) : null;
  const [record, setRecord] = (0, _react.useState)(_objectSpread(_objectSpread({}, filteredRecord), {}, {
    params: (_filteredRecord$param = filteredRecord === null || filteredRecord === void 0 ? void 0 : filteredRecord.params) !== null && _filteredRecord$param !== void 0 ? _filteredRecord$param : {},
    errors: (_initialRecord$errors = initialRecord === null || initialRecord === void 0 ? void 0 : initialRecord.errors) !== null && _initialRecord$errors !== void 0 ? _initialRecord$errors : {},
    populated: (_initialRecord$popula = initialRecord === null || initialRecord === void 0 ? void 0 : initialRecord.populated) !== null && _initialRecord$popula !== void 0 ? _initialRecord$popula : {}
  })); // it keeps the same format as useState function which can take either value or function

  const setFilteredRecord = (0, _react.useCallback)(value => {
    const newRecord = value instanceof Function ? value(record) : value;
    setRecord((0, _filterRecord.filterRecordParams)(newRecord, options));
  }, [options, record]);
  const onNotice = (0, _useNotice.default)();
  const handleChange = (0, _react.useCallback)((propertyOrRecord, value, incomingRecord) => {
    if ((0, _isEntireRecordGiven.default)(propertyOrRecord, value)) {
      setFilteredRecord(propertyOrRecord);
    } else if ((0, _filterRecord.isPropertyPermitted)(propertyOrRecord, options)) {
      setRecord((0, _updateRecord.default)(propertyOrRecord, value, incomingRecord));
    } else if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn([`You are trying to set property: "${propertyOrRecord}" which`, 'is not permitted. Take a look at `useRecord(..., { includeParams: [...]})`'].join('\n'));
    }

    setIsSynced(false);
  }, [setRecord, options]);
  const handleSubmit = (0, _react.useCallback)((customParams = {}, submitOptions) => {
    setLoading(true);

    const mergedParams = _utils.flat.merge(record.params, customParams);

    const formData = (0, _paramsToFormData.paramsToFormData)(mergedParams);
    const params = {
      resourceId,
      onUploadProgress: e => setProgress(Math.round(e.loaded * 100 / e.total)),
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    const promise = record.id ? api.recordAction(_objectSpread(_objectSpread({}, params), {}, {
      actionName: 'edit',
      recordId: record.id
    })) : api.resourceAction(_objectSpread(_objectSpread({}, params), {}, {
      actionName: 'new'
    }));
    promise.then(response => {
      if (response.data.notice) {
        onNotice(response.data.notice);
      }

      if ((submitOptions === null || submitOptions === void 0 ? void 0 : submitOptions.updateOnSave) !== false) {
        setFilteredRecord(prev => (0, _mergeRecordResponse.default)(prev, response.data));
      }

      setProgress(0);
      setLoading(false);
      setIsSynced(true);
    }).catch(() => {
      onNotice({
        message: 'There was an error updating record, Check out console to see more information.',
        type: 'error'
      });
      setProgress(0);
      setLoading(false);
    });
    return promise;
  }, [record, resourceId, setLoading, setProgress, setRecord]);
  return {
    record,
    handleChange,
    submit: handleSubmit,
    loading,
    progress,
    setRecord: setFilteredRecord,
    isSynced
  };
};

exports.useRecord = useRecord;
var _default = useRecord;
exports.default = _default;