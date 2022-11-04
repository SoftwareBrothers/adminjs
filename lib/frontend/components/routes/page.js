"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _errorBoundary = _interopRequireDefault(require("../app/error-boundary"));
var _errorMessage = _interopRequireDefault(require("../app/error-message"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Page = () => {
  const [pages] = (0, _reactRedux.useSelector)(state => [state.pages]);
  const params = (0, _reactRouter.useParams)();
  const {
    pageName
  } = params;
  const [isClient, setIsClient] = (0, _react.useState)(false);
  const currentPage = pages.find(page => page.name === pageName);
  (0, _react.useEffect)(() => {
    setIsClient(true);
  }, []);
  if (!currentPage) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.default, {
      title: "There is no page of given name"
    }, /*#__PURE__*/_react.default.createElement("p", null, "Page:", /*#__PURE__*/_react.default.createElement("b", null, ` "${pageName}" `), "does not exist."));
  }
  const Component = AdminJS.UserComponents[currentPage.component];
  if (!Component || !isClient) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.default, {
      title: "No component specified"
    }, /*#__PURE__*/_react.default.createElement("p", null, "You have to specify component which will render this Page"));
  }
  return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(Component, null));
};
var _default = Page;
exports.default = _default;