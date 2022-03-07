"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _designSystem = require("@adminjs/design-system");

var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers/view-helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "reference-value__StyledLink",
  componentId: "sc-1ujousf-0"
})(["", ";padding-left:", ";padding-right:", ";"], _designSystem.ButtonCSS, ({
  theme
}) => theme.space.xs, ({
  theme
}) => theme.space.xs);

const ReferenceValue = props => {
  const {
    property,
    record
  } = props;
  const h = new _viewHelpers.default();
  const refId = record.params[property.path];
  const populated = record.populated[property.path];
  const value = populated && populated.title || refId;

  if (!property.reference) {
    throw new Error(`property: "${property.path}" does not have a reference`);
  }

  if (populated && populated.recordActions.find(a => a.name === 'show')) {
    const href = h.recordActionUrl({
      resourceId: property.reference,
      recordId: refId,
      actionName: 'show'
    });
    return /*#__PURE__*/_react.default.createElement(StyledLink, {
      variant: "text",
      to: href
    }, value);
  }

  return /*#__PURE__*/_react.default.createElement("span", null, value);
};

var _default = ReferenceValue;
exports.default = _default;