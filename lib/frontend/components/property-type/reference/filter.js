"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _designSystem = require("@adminjs/design-system");
var _apiClient = _interopRequireDefault(require("../../../utils/api-client"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Filter extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.api = new _apiClient.default();
    this.loadOptions = this.loadOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      options: []
    };
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
    const options = records.map(r => ({
      value: r.id,
      label: r.title
    }));
    this.setState({
      options
    });
    return options;
  }
  render() {
    const {
      property,
      filter
    } = this.props;
    const {
      options
    } = this.state;
    const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path];
    const selected = (options || []).find(o => String(o.value) === String(value));
    return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, null, /*#__PURE__*/_react.default.createElement(_designSystem.Label, null, property.label), /*#__PURE__*/_react.default.createElement(_designSystem.SelectAsync, {
      variant: "filter",
      value: typeof selected === 'undefined' ? '' : selected,
      isClearable: true,
      cacheOptions: true,
      loadOptions: this.loadOptions,
      onChange: this.handleChange,
      defaultOptions: true
    }));
  }
}
var _default = Filter;
exports.default = _default;