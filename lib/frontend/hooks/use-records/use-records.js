"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRecords = exports.default = useRecords;

var _react = require("react");

var _reactRouter = require("react-router");

var _useNotice = _interopRequireDefault(require("../use-notice"));

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _useTranslation = require("../use-translation");

var _appendForceRefresh = require("../../components/actions/utils/append-force-refresh");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const api = new _apiClient.default();
/**
 * @load ./use-records.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 *
 * @param {string} resourceId      id of a resource for which you want to fetch records
 * @return {UseRecordsResult}
 * @new In version 3.3
 * @bundle
 * @type {Function}
 */

function useRecords(resourceId) {
  const [records, setRecords] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(false);
  const [perPage, setPerPage] = (0, _react.useState)(10);
  const [page, setPage] = (0, _react.useState)(1);
  const [total, setTotal] = (0, _react.useState)(0);
  const [direction, setDirection] = (0, _react.useState)('asc');
  const [sortBy, setSortBy] = (0, _react.useState)();
  const location = (0, _reactRouter.useLocation)();
  const history = (0, _reactRouter.useHistory)();
  const addNotice = (0, _useNotice.default)();
  const {
    translateMessage
  } = (0, _useTranslation.useTranslation)();
  const onNotice = (0, _useNotice.default)();

  const fetchData = () => {
    setLoading(true);
    const query = new URLSearchParams(location.search);
    const promise = api.resourceAction({
      actionName: 'list',
      resourceId,
      params: query
    });
    promise.then(response => {
      const listActionResponse = response.data;

      if (listActionResponse.notice) {
        onNotice(listActionResponse.notice);
      }

      if (listActionResponse.redirectUrl) {
        history.push(listActionResponse.redirectUrl, {
          previousPage: window.location.href
        });
        return;
      }

      setRecords(listActionResponse.records);
      setPage(listActionResponse.meta.page);
      setPerPage(listActionResponse.meta.perPage);
      setTotal(listActionResponse.meta.total);
      setDirection(listActionResponse.meta.direction);
      setSortBy(listActionResponse.meta.sortBy);
      setLoading(false);
    }).catch(() => {
      addNotice({
        message: translateMessage('errorFetchingRecords', resourceId),
        type: 'error'
      });
    });
    return promise;
  };

  (0, _react.useEffect)(() => {
    if ((0, _appendForceRefresh.hasForceRefresh)(location.search)) {
      const locationState = location.state || {};

      if (!locationState.previousPage) {
        locationState.previousPage = window.location.href;
      }

      history.replace({
        pathname: location.pathname,
        state: locationState,
        search: (0, _appendForceRefresh.removeForceRefresh)(location.search).toString()
      });
    } else {
      fetchData();
    }
  }, [resourceId, location.search, location.state]);
  return {
    records,
    loading,
    page,
    total,
    direction,
    sortBy,
    perPage,
    fetchData
  };
}