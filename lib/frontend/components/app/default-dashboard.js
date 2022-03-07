"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DashboardHeader = exports.Dashboard = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _designSystem = require("@adminjs/design-system");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pageHeaderHeight = 284;
const pageHeaderPaddingY = 74;
const pageHeaderPaddingX = 250;

const DashboardHeader = () => {
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    position: "relative",
    overflow: "hidden"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    position: "absolute",
    top: 50,
    left: -10,
    opacity: [0.2, 0.4, 1],
    animate: true
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Illustration, {
    variant: "Rocket"
  })), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    position: "absolute",
    top: -70,
    right: -15,
    opacity: [0.2, 0.4, 1],
    animate: true
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Illustration, {
    variant: "Moon"
  })), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    bg: "grey100",
    height: pageHeaderHeight,
    py: pageHeaderPaddingY,
    px: ['default', 'lg', pageHeaderPaddingX]
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    textAlign: "center",
    color: "white"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.H2, null, translateMessage('welcomeOnBoard_title')), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    opacity: 0.8
  }, translateMessage('welcomeOnBoard_subtitle')))));
};

exports.DashboardHeader = DashboardHeader;

const boxes = ({
  translateMessage
}) => [{
  variant: 'Planet',
  title: translateMessage('addingResources_title'),
  subtitle: translateMessage('addingResources_subtitle'),
  href: 'https://adminjs.co/tutorial-passing-resources.html'
}, {
  variant: 'DocumentCheck',
  title: translateMessage('customizeResources_title'),
  subtitle: translateMessage('customizeResources_subtitle'),
  href: 'https://adminjs.co/tutorial-customizing-resources.html'
}, {
  variant: 'DocumentSearch',
  title: translateMessage('customizeActions_title'),
  subtitle: translateMessage('customizeActions_subtitle'),
  href: 'https://adminjs.co/tutorial-actions.html'
}, {
  variant: 'FlagInCog',
  title: translateMessage('writeOwnComponents_title'),
  subtitle: translateMessage('writeOwnComponents_subtitle'),
  href: 'https://adminjs.co/tutorial-writing-react-components.html'
}, {
  variant: 'Folders',
  title: translateMessage('customDashboard_title'),
  subtitle: translateMessage('customDashboard_subtitle'),
  href: 'https://adminjs.co/tutorial-custom-dashboard.html'
}, {
  variant: 'Astronaut',
  title: translateMessage('roleBasedAccess_title'),
  subtitle: translateMessage('roleBasedAccess_subtitle'),
  href: 'https://adminjs.co/tutorial-rbac.html'
}];

const Card = (0, _styledComponents.default)(_designSystem.Box).withConfig({
  displayName: "default-dashboard__Card",
  componentId: "sc-1be5kmo-0"
})(["display:", ";color:", ";text-decoration:none;border:1px solid transparent;&:hover{border:1px solid ", ";box-shadow:", ";}"], ({
  flex
}) => flex ? 'flex' : 'block', ({
  theme
}) => theme.colors.grey100, ({
  theme
}) => theme.colors.primary100, ({
  theme
}) => theme.shadows.cardHover);
Card.defaultProps = {
  variant: 'white',
  boxShadow: 'card'
};

const Dashboard = () => {
  const {
    translateMessage,
    translateButton
  } = (0, _hooks.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, null, /*#__PURE__*/_react.default.createElement(DashboardHeader, null), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    mt: ['xl', 'xl', '-100px'],
    mb: "xl",
    mx: [0, 0, 0, 'auto'],
    px: ['default', 'lg', 'xxl', '0'],
    position: "relative",
    flex: true,
    flexDirection: "row",
    flexWrap: "wrap",
    width: [1, 1, 1, 1024]
  }, boxes({
    translateMessage
  }).map((box, index) =>
  /*#__PURE__*/
  // eslint-disable-next-line react/no-array-index-key
  _react.default.createElement(_designSystem.Box, {
    key: index,
    width: [1, 1 / 2, 1 / 2, 1 / 3],
    p: "lg"
  }, /*#__PURE__*/_react.default.createElement(Card, {
    as: "a",
    href: box.href
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Illustration, {
    variant: box.variant,
    width: 100,
    height: 70
  }), /*#__PURE__*/_react.default.createElement(_designSystem.H5, {
    mt: "lg"
  }, box.title), /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, box.subtitle))))), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    width: [1, 1, 1 / 2],
    p: "lg"
  }, /*#__PURE__*/_react.default.createElement(Card, {
    as: "a",
    flex: true,
    href: "https://join.slack.com/t/adminbro/shared_invite/zt-djsqxxpz-_YCS8UMtQ9Ade6DPuLR7Zw"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexShrink: 0
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Illustration, {
    variant: "SlackLogo"
  })), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    ml: "xl"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.H4, null, translateMessage('community_title')), /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, translateMessage('community_subtitle'))))), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    width: [1, 1, 1 / 2],
    p: "lg"
  }, /*#__PURE__*/_react.default.createElement(Card, {
    as: "a",
    flex: true,
    href: "https://github.com/SoftwareBrothers/adminjs/issues"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexShrink: 0
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Illustration, {
    variant: "GithubLogo"
  })), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    ml: "xl"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.H4, null, translateMessage('foundBug_title')), /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, translateMessage('foundBug_subtitle'))))), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    variant: "white",
    boxShadow: "card",
    width: 1,
    m: "lg"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Illustration, {
    variant: "SoftwareBrothersLogo"
  }), /*#__PURE__*/_react.default.createElement(_designSystem.H4, null, translateMessage('needMoreSolutions_title')), /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, translateMessage('needMoreSolutions_subtitle')), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    mt: "xxl"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    as: "a",
    variant: "primary",
    href: "https://softwarebrothers.co/services"
  }, translateButton('contactUs')))))));
};

exports.Dashboard = Dashboard;
var _default = Dashboard;
exports.default = _default;