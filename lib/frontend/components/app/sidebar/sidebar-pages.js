"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _reactRouter = require("react-router");

var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers/view-helpers"));

var _useTranslation = require("../../../hooks/use-translation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const h = new _viewHelpers.default();

const SidebarPages = props => {
  const {
    pages
  } = props;
  const {
    translateLabel
  } = (0, _useTranslation.useTranslation)();
  const location = (0, _reactRouter.useLocation)();
  const history = (0, _reactRouter.useHistory)();

  if (!pages || !pages.length) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  }

  const isActive = page => !!location.pathname.match(`/pages/${page.name}`);

  const elements = pages.map(page => ({
    id: page.name,
    label: page.name,
    isSelected: isActive(page),
    icon: page.icon,
    href: h.pageUrl(page.name),
    onClick: (event, element) => {
      event.preventDefault();

      if (element.href) {
        history.push(element.href, {
          previousPage: window.location.href
        });
      }
    }
  }));
  return /*#__PURE__*/_react.default.createElement(_designSystem.Navigation, {
    label: translateLabel('pages'),
    elements: elements
  });
};

var _default = SidebarPages;
exports.default = _default;