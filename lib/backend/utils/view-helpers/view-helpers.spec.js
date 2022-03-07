"use strict";

var _chai = require("chai");

var _viewHelpers = _interopRequireDefault(require("./view-helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ViewHelpers', function () {
  describe('#urlBuilder', function () {
    it('returns joined path for default rootUrl', function () {
      const h = new _viewHelpers.default({});
      (0, _chai.expect)(h.urlBuilder(['my', 'path'])).to.equal('/admin/my/path');
    });
    it('returns correct url when user gives admin root path not starting with /', function () {
      const h = new _viewHelpers.default({
        options: {
          rootPath: 'admin'
        }
      });
      (0, _chai.expect)(h.urlBuilder(['my', 'path'])).to.equal('/admin/my/path');
    });
    it('returns correct url for rootPath set to /', function () {
      const h = new _viewHelpers.default({
        options: {
          rootPath: '/'
        }
      });
      (0, _chai.expect)(h.urlBuilder(['my', 'path'])).to.equal('/my/path');
    });
  });
});