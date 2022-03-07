"use strict";

var _chai = require("chai");

var _layoutTemplate = _interopRequireDefault(require("./layout-template"));

var _adminjs = _interopRequireDefault(require("../adminjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('layoutTemplate', function () {
  context('AdminJS with branding options set as a function', function () {
    const companyName = 'Dynamic Company';
    let html;
    beforeEach(async function () {
      const adminJs = new _adminjs.default({
        branding: async () => ({
          companyName
        })
      });
      html = await (0, _layoutTemplate.default)(adminJs, undefined, '/');
    });
    it('renders default company name', function () {
      (0, _chai.expect)(html).to.contain(companyName);
    });
    it('links to global bundle', async function () {
      (0, _chai.expect)(html).to.contain('global.bundle.js');
    });
  });
  describe('AdminJS with branding options given', function () {
    const branding = {
      softwareBrothers: false,
      companyName: 'Other name',
      favicon: '/someImage.png'
    };
    let html;
    beforeEach(async function () {
      const adminJs = new _adminjs.default({
        branding
      });
      html = await (0, _layoutTemplate.default)(adminJs, undefined, '/');
    });
    it('renders company name', function () {
      (0, _chai.expect)(html).to.contain(branding.companyName);
    });
    it('renders favicon', function () {
      (0, _chai.expect)(html).to.contain(`<link rel="shortcut icon" type="image/png" href="${branding.favicon}" />`);
    });
  });
  context('custom styles and scripts were defined in AdminJS options', function () {
    let html;
    const scriptUrl = 'http://somescript.com';
    const styleUrl = 'http://somestyle.com';
    beforeEach(async function () {
      const adminJs = new _adminjs.default({
        assets: {
          styles: [styleUrl],
          scripts: [scriptUrl]
        }
      });
      html = await (0, _layoutTemplate.default)(adminJs, undefined, '/');
    });
    it('adds styles to the head section', function () {
      (0, _chai.expect)(html).to.contain(styleUrl);
    });
    it('adds scripts to the body', function () {
      (0, _chai.expect)(html).to.contain(scriptUrl);
    });
  });
});