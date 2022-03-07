"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _designSystem = require("@adminjs/design-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SortLink extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.isActive = this.isActive.bind(this);
  }

  isActive() {
    const {
      sortBy,
      property
    } = this.props;
    return sortBy === property.propertyPath;
  }

  render() {
    const {
      property,
      location,
      direction
    } = this.props;
    const query = new URLSearchParams(location.search);
    const oppositeDirection = this.isActive() && direction === 'asc' ? 'desc' : 'asc';
    const sortedByIcon = `Caret${direction === 'asc' ? 'Up' : 'Down'}`;
    query.set('direction', oppositeDirection);
    query.set('sortBy', property.propertyPath);
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
      to: {
        search: query.toString()
      },
      className: (0, _designSystem.cssClass)('SortLink')
    }, property.label, this.isActive() ? /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
      icon: sortedByIcon,
      color: "primary100",
      ml: "default"
    }) : '');
  }

}

var _default = (0, _reactRouterDom.withRouter)(SortLink);

exports.default = _default;