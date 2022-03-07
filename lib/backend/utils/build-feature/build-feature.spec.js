"use strict";

var _chai = require("chai");

var _buildFeature = require("../build-feature");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('mergeResourceOptions', function () {
  it('chaines before hooks', function () {
    const existingOptions = {
      actions: {
        new: {
          before: function firstBeforeHook() {},
          handler: null
        },
        edit: {
          after: [function firstAfterHook() {}]
        }
      }
    };
    const newOptions = {
      actions: {
        new: {
          before: function lastBeforeHook() {},
          handler: function lastHandler() {}
        },
        edit: {
          after: function lastAfterHook() {}
        },
        newAction: {
          handler: function newHandler() {}
        }
      }
    };
    (0, _chai.expect)((0, _buildFeature.mergeResourceOptions)(existingOptions, newOptions)).to.deep.eq({
      actions: {
        new: {
          before: [existingOptions.actions.new.before, newOptions.actions.new.before],
          handler: [newOptions.actions.new.handler]
        },
        edit: {
          after: [existingOptions.actions.edit.after[0], newOptions.actions.edit.after]
        },
        newAction: {
          handler: [newOptions.actions.newAction.handler]
        }
      }
    });
  });
  it('chaines properties', function () {
    const existingOptions = {
      properties: {
        password: {
          isVisible: true,
          component: 'ala'
        }
      }
    };
    const newOptions = {
      properties: {
        password2: {
          isVisible: false,
          component: 'ela'
        }
      }
    };
    (0, _chai.expect)((0, _buildFeature.mergeResourceOptions)(existingOptions, newOptions)).to.deep.eq({
      properties: _objectSpread(_objectSpread({}, existingOptions.properties), newOptions.properties)
    });
  });
  it('merges falsey options', function () {
    const existingOptions = {
      navigation: {
        name: 'db'
      }
    };
    const newOptions = {
      navigation: false
    };
    (0, _chai.expect)((0, _buildFeature.mergeResourceOptions)(existingOptions, newOptions)).to.deep.eq({
      navigation: false
    });
  });
});