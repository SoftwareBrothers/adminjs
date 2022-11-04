"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _designSystem = require("@adminjs/design-system");
var _apiClient = _interopRequireDefault(require("../../../utils/api-client"));
var _propertyLabel = require("../utils/property-label");
var _flat = require("../../../../utils/flat");
var _recordPropertyIsEqual = require("../record-property-is-equal");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Edit = props => {
  const {
    onChange,
    property,
    record
  } = props;
  const {
    reference: resourceId
  } = property;
  if (!resourceId) {
    throw new Error(`Cannot reference resource in property '${property.path}'`);
  }
  const handleChange = selected => {
    if (selected) {
      onChange(property.path, selected.value, selected.record);
    } else {
      onChange(property.path, null);
    }
  };
  const loadOptions = async inputValue => {
    const api = new _apiClient.default();
    const optionRecords = await api.searchRecords({
      resourceId,
      query: inputValue
    });
    return optionRecords.map(optionRecord => ({
      value: optionRecord.id,
      label: optionRecord.title,
      record: optionRecord
    }));
  };
  const error = record === null || record === void 0 ? void 0 : record.errors[property.path];
  const selectedId = (0, _react.useMemo)(() => _flat.flat.get(record === null || record === void 0 ? void 0 : record.params, property.path), [record]);
  const [loadedRecord, setLoadedRecord] = (0, _react.useState)();
  const [loadingRecord, setLoadingRecord] = (0, _react.useState)(0);
  (0, _react.useEffect)(() => {
    if (selectedId) {
      setLoadingRecord(c => c + 1);
      const api = new _apiClient.default();
      api.recordAction({
        actionName: 'show',
        resourceId,
        recordId: selectedId
      }).then(({
        data
      }) => {
        setLoadedRecord(data.record);
      }).finally(() => {
        setLoadingRecord(c => c - 1);
      });
    }
  }, [selectedId, resourceId]);
  const selectedValue = loadedRecord;
  const selectedOption = selectedId && selectedValue ? {
    value: selectedValue.id,
    label: selectedValue.title
  } : {
    value: '',
    label: ''
  };
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: Boolean(error)
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(_designSystem.SelectAsync, _extends({
    cacheOptions: true,
    value: selectedOption,
    defaultOptions: true,
    loadOptions: loadOptions,
    onChange: handleChange,
    isClearable: true,
    isDisabled: property.isDisabled,
    isLoading: !!loadingRecord
  }, property.props)), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error === null || error === void 0 ? void 0 : error.message));
};
var _default = /*#__PURE__*/(0, _react.memo)(Edit, _recordPropertyIsEqual.recordPropertyIsEqual);
exports.default = _default;