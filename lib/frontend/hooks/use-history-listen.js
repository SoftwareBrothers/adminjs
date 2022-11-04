"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _useLocalStorage = require("../hooks/use-local-storage");
var _routeChanged = require("../store/actions/route-changed");
const useHistoryListen = () => {
  const location = (0, _reactRouter.useLocation)();
  const [storedPath, setStoredPath] = (0, _useLocalStorage.useLocalStorage)('prevPage', {});
  const {
    to = {},
    from = {}
  } = (0, _reactRedux.useSelector)(state => state.router);
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    if (storedPath) {
      dispatch((0, _routeChanged.initializeRoute)(storedPath));
    }
  }, []);
  (0, _react.useEffect)(() => {
    const previousPath = [to.pathname, to.search].join('');
    const currentPath = [location.pathname, location.search].join('');
    if (previousPath !== currentPath) {
      dispatch((0, _routeChanged.changeRoute)(location));
    }
  }, [location]);
  (0, _react.useEffect)(() => {
    if (from.pathname) {
      setStoredPath(from);
    }
  }, [from]);
};
var _default = useHistoryListen;
exports.default = _default;