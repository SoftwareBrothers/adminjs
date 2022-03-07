"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFaviconFromBranding = exports.getBranding = exports.getAssets = void 0;

var _merge = _interopRequireDefault(require("lodash/merge"));

var _viewHelpers = _interopRequireDefault(require("../view-helpers/view-helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultBranding = {
  companyName: "Company",
  softwareBrothers: true
};
const defaultAssets = {
  styles: [],
  scripts: [],
  headScripts: []
};

const getAssets = async (admin, currentAdmin) => {
  const {
    assets
  } = admin.options || {};
  const computed = typeof assets === "function" ? await assets(currentAdmin) : assets;
  return (0, _merge.default)({}, defaultAssets, computed);
};

exports.getAssets = getAssets;

const getBranding = async (admin, currentAdmin) => {
  const {
    branding
  } = admin.options;
  const h = new _viewHelpers.default(admin);
  const defaultLogo = h.assetPath("logo.svg");
  const computed = typeof branding === "function" ? await branding(currentAdmin) : branding;
  const merged = (0, _merge.default)({}, defaultBranding, computed); // checking for undefined because logo can also be `false` or `null`

  merged.logo = merged.logo !== undefined ? merged.logo : defaultLogo;
  return merged;
};

exports.getBranding = getBranding;

const getFaviconFromBranding = branding => {
  if (branding.favicon) {
    const {
      favicon
    } = branding;
    const type = favicon.match(/.*\.png$/) ? "image/png" : "image/x-icon";
    return `<link rel="shortcut icon" type="${type}" href="${favicon}" />`;
  }

  return "";
};

exports.getFaviconFromBranding = getFaviconFromBranding;