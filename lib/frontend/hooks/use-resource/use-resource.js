"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResource = exports.default = void 0;

var _reactRedux = require("react-redux");

/**
 * @load ./use-resource.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @new in version 3.3
 * @bundle
 * @param {string} resourceId    Id of a resource you want to get
 */
const useResource = resourceId => {
  const resources = (0, _reactRedux.useSelector)(state => state.resources);
  const foundResource = resources.find(resource => resource.id === resourceId);
  return foundResource;
};

exports.useResource = exports.default = useResource;