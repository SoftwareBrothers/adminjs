"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _styledComponents = require("styled-components");

var _designSystem = require("@adminjs/design-system");

var _mapValue = _interopRequireDefault(require("./map-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Filter extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    const {
      onChange,
      property
    } = this.props;
    const value = selected ? selected.value : '';
    onChange(property.path, value);
  }

  render() {
    const {
      property,
      filter = {},
      theme
    } = this.props;
    const value = typeof filter[property.path] === 'undefined' ? '' : filter[property.path];
    const options = [{
      value: true,
      label: (0, _mapValue.default)(true)
    }, {
      value: false,
      label: (0, _mapValue.default)(false)
    }];
    const selected = options.find(o => o.value === value);
    return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, null, /*#__PURE__*/_react.default.createElement(_designSystem.Label, null, property.label), /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
      value: typeof selected === 'undefined' ? '' : selected,
      isClearable: true,
      options: options,
      styles: (0, _designSystem.filterStyles)(theme),
      onChange: this.handleChange
    }));
  }

}

var _default = (0, _styledComponents.withTheme)(Filter);

exports.default = _default;