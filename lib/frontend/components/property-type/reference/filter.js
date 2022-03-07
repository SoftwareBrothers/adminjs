"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _async = _interopRequireDefault(require("react-select/async"));

var _styledComponents = require("styled-components");

var _designSystem = require("@adminjs/design-system");

var _apiClient = _interopRequireDefault(require("../../../utils/api-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Filter extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.api = new _apiClient.default();
    this.options = [];
    this.loadOptions = this.loadOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    const {
      onChange,
      property
    } = this.props;
    onChange(property.path, selected ? selected.value : '');
  }

  async loadOptions(inputValue) {
    const {
      property
    } = this.props;
    const records = await this.api.searchRecords({
      resourceId: property.reference,
      query: inputValue
    });
    this.options = records.map(r => ({
      value: r.id,
      label: r.title
    }));
    return this.options;
  }

  render() {
    const {
      property,
      filter,
      theme
    } = this.props;
    const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path];
    const selected = (this.options || []).find(o => o.value === value);
    return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, null, /*#__PURE__*/_react.default.createElement(_designSystem.Label, null, property.label), /*#__PURE__*/_react.default.createElement(_async.default, {
      value: typeof selected === 'undefined' ? '' : selected,
      isClearable: true,
      cacheOptions: true,
      styles: (0, _designSystem.filterStyles)(theme),
      loadOptions: this.loadOptions,
      onChange: this.handleChange,
      defaultOptions: true
    }));
  }

}

var _default = (0, _styledComponents.withTheme)(Filter);

exports.default = _default;