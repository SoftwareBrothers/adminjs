"use strict";

var _factoryGirl = _interopRequireDefault(require("factory-girl"));

require("./action-json.factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_factoryGirl.default.define('RecordJSON', Object, {
  params: {
    param1: 'value1',
    'nested.param': 'value2'
  },
  populated: {},
  errors: {},
  id: _factoryGirl.default.sequence('JSONRecord.id', n => `someId${n}`),
  title: _factoryGirl.default.sequence('JSONRecord.id', n => `someTitle${n}`),
  recordActions: [],
  bulkActions: []
});

_factoryGirl.default.extend('RecordJSON', 'RecordJSON.total', {
  // params set for properties from ResourceJSON.total factory's properties
  params: {
    name: 'John',
    surname: 'Doe',
    gender: 'MALE'
  }
}, {
  afterBuild: async model => {
    const showAction = await _factoryGirl.default.build('ActionJSON', {
      name: 'show',
      actionType: 'record'
    });
    const editAction = await _factoryGirl.default.build('ActionJSON', {
      name: 'edit',
      actionType: 'record'
    });
    const deleteAction = await _factoryGirl.default.build('ActionJSON', {
      name: 'delete',
      actionType: 'record'
    });
    return _objectSpread(_objectSpread({}, model), {}, {
      recordActions: [showAction, editAction, deleteAction]
    });
  }
});