"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_factoryGirl.default.define('ActionJSON', Object, {
  actionType: 'record',
  showInDrawer: true,
  name: _factoryGirl.default.sequence('ActionJSON.name', n => `action${n}`),
  label: _factoryGirl.default.sequence('ActionJSON.label', n => `action ${n}`),
  showFilter: false,
  resourceId: 'resource',
  hideActionHeader: false,
  containerWidth: 1,
  layout: null,
  variant: 'default',
  parent: null,
  hasHandler: true,
  custom: {}
});