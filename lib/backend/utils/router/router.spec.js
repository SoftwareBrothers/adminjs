"use strict";

var _chai = require("chai");

var _router = _interopRequireDefault(require("./router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Router', function () {
  it('has both assets and routes', function () {
    (0, _chai.expect)(_router.default.assets).not.to.be.undefined;
    (0, _chai.expect)(_router.default.routes).not.to.be.undefined;
  });
  it('returns development bundle by default', function () {
    const asset = _router.default.assets.find(a => a.path === '/frontend/assets/app.bundle.js');

    (0, _chai.expect)(asset && asset.src).to.contain('scripts/app-bundle.development.js');
  });
});