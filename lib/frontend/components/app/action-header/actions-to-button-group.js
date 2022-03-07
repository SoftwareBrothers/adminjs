"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionsToButtonGroup = void 0;

var _interfaces = require("../../../interfaces");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const actionsToButtonGroup = options => {
  const {
    actions,
    params,
    handleClick
  } = options;
  const buttons = actions.map(action => {
    const href = (0, _interfaces.actionHref)(action, params);
    return {
      icon: action.icon,
      label: action.label,
      variant: action.variant,
      source: action,
      href: href || undefined,
      // when href is not defined - handle click should also be not defined
      // This prevents from "cursor: pointer;"
      onClick: href ? handleClick : undefined,
      'data-testid': (0, _interfaces.buildActionTestId)(action),
      buttons: []
    };
  }); // nesting buttons

  const buttonsMap = buttons.reduce((memo, button) => {
    const action = button.source;

    if (action.parent) {
      const parent = memo[action.parent] || buttons.find(btn => btn.source.name === action.parent) || {
        label: action.parent
      };
      parent.buttons = parent.buttons || [];
      parent.buttons.push(button);
      return _objectSpread(_objectSpread({}, memo), {}, {
        [action.parent]: parent
      });
    }

    return _objectSpread(_objectSpread({}, memo), {}, {
      [button.source.name]: button
    });
  }, {});
  return Object.values(buttonsMap);
};

exports.actionsToButtonGroup = actionsToButtonGroup;