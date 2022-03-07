"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _styledComponents = require("styled-components");

var _designSystem = require("@adminjs/design-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Filter extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleInputChange(event) {
    const {
      onChange,
      property
    } = this.props;
    onChange(property.path, event.target.value);
  }

  handleSelectChange(selected) {
    const {
      onChange,
      property
    } = this.props;
    const value = selected ? selected.value : '';
    onChange(property.path, value);
  }

  renderInput() {
    const {
      property,
      filter,
      theme
    } = this.props;
    const filterKey = `filter-${property.path}`;
    const value = filter[property.path] || '';

    if (property.availableValues) {
      const selected = property.availableValues.find(av => av.value === value);
      return /*#__PURE__*/_react.default.createElement(_reactSelect.default, {
        value: typeof selected === 'undefined' ? '' : selected,
        isClearable: true,
        options: property.availableValues,
        styles: (0, _designSystem.filterStyles)(theme),
        onChange: this.handleSelectChange
      });
    }

    return /*#__PURE__*/_react.default.createElement(_designSystem.Input, {
      name: filterKey,
      onChange: this.handleInputChange,
      value: value
    });
  }

  render() {
    const {
      property
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
      variant: "filter"
    }, /*#__PURE__*/_react.default.createElement(_designSystem.Label, null, property.label), this.renderInput());
  }

}

var _default = (0, _styledComponents.withTheme)(Filter);

exports.default = _default;