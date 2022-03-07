"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _async = _interopRequireDefault(require("react-select/async"));

var _styledComponents = require("styled-components");

var _designSystem = require("@adminjs/design-system");

var _apiClient = _interopRequireDefault(require("../../../utils/api-client"));

var _propertyLabel = require("../utils/property-label");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Edit = props => {
  var _record$populated$pro;

  const {
    onChange,
    property,
    record,
    theme
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
  const selectedId = record === null || record === void 0 ? void 0 : record.params[property.path];
  const [loadedRecord, setLoadedRecord] = (0, _react.useState)();
  const [loadingRecord, setLoadingRecord] = (0, _react.useState)(0);
  const selectedValue = (_record$populated$pro = record === null || record === void 0 ? void 0 : record.populated[property.path]) !== null && _record$populated$pro !== void 0 ? _record$populated$pro : loadedRecord;
  const selectedOption = selectedId && selectedValue ? {
    value: selectedValue.id,
    label: selectedValue.title
  } : {
    value: '',
    label: ''
  };
  const styles = (0, _designSystem.selectStyles)(theme);
  (0, _react.useEffect)(() => {
    if (!selectedValue && selectedId) {
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
  }, [selectedValue, selectedId, resourceId]);
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: Boolean(error)
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(_async.default, _extends({
    cacheOptions: true,
    value: selectedOption,
    styles: styles,
    defaultOptions: true,
    loadOptions: loadOptions,
    onChange: handleChange,
    isClearable: true,
    isDisabled: property.isDisabled,
    isLoading: loadingRecord
  }, property.props)), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error === null || error === void 0 ? void 0 : error.message));
};

var _default = (0, _styledComponents.withTheme)(Edit);

exports.default = _default;