"use strict";

var _chai = require("chai");

var _loginTemplate = _interopRequireDefault(require("./login-template"));

var _adminjs = _interopRequireDefault(require("../adminjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('login-template', function () {
  const action = '/login';
  it('renders error message', async function () {
    const adminJs = new _adminjs.default({});
    const errorMessage = 'Something went wrong';
    const html = await (0, _loginTemplate.default)(adminJs, {
      action,
      errorMessage
    });
    (0, _chai.expect)(html).to.contain(errorMessage);
  });
});