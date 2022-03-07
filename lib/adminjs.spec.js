"use strict";

var _path = _interopRequireDefault(require("path"));

var _chai = require("chai");

var _adminjs = _interopRequireDefault(require("./adminjs"));

var _baseDatabase = _interopRequireDefault(require("./backend/adapters/database/base-database"));

var _baseResource = _interopRequireDefault(require("./backend/adapters/resource/base-resource"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AdminJS', function () {
  beforeEach(function () {
    global.RegisteredAdapters = [];
  });
  describe('#constructor', function () {
    it('sets default root path when no given', function () {
      (0, _chai.expect)(new _adminjs.default().options.rootPath).to.equal('/admin');
    });
  });
  describe('.AdminJS.registerAdapter', function () {
    beforeEach(function () {
      class Database extends _baseDatabase.default {}

      class Resource extends _baseResource.default {}

      this.DatabaseAdapter = {
        Database,
        Resource
      };
    });
    it('adds given adapter to list off all available adapters', function () {
      _adminjs.default.registerAdapter(this.DatabaseAdapter);

      (0, _chai.expect)(global.RegisteredAdapters).to.have.lengthOf(1);
    });
    it('throws an error when adapter is not full', function () {
      (0, _chai.expect)(() => {
        _adminjs.default.registerAdapter({
          Resource: _baseResource.default,
          Database: null
        });
      }).to.throw('Adapter has to have both Database and Resource');
    });
    it('throws an error when adapter has elements not being subclassed from base adapter', function () {
      (0, _chai.expect)(() => {
        _adminjs.default.registerAdapter({
          Resource: {},
          Database: {}
        });
      }).to.throw('Adapter elements has to be a subclass of AdminJS.BaseResource and AdminJS.BaseDatabase');
    });
  });
  describe('resolveBabelConfigPath', function () {
    it('load .babelrc file', function () {
      const adminJS = new _adminjs.default({
        bundler: {
          babelConfig: '../.babelrc'
        }
      });
      (0, _chai.expect)(adminJS.options.bundler.babelConfig).not.to.undefined;
    });
    it('load with json object directly', function () {
      const adminJS = new _adminjs.default({
        bundler: {
          babelConfig: {
            presets: ['@babel/preset-react', ['@babel/preset-env', {
              targets: {
                node: '8'
              }
            }], '@babel/preset-typescript'],
            plugins: ['babel-plugin-styled-components'],
            only: ['src/', 'spec/'],
            ignore: ['src/frontend/assets/scripts/app-bundle.development.js', 'src/frontend/assets/scripts/app-bundle.production.js', 'src/frontend/assets/scripts/global-bundle.development.js', 'src/frontend/assets/scripts/global-bundle.production.js']
          }
        }
      });
      (0, _chai.expect)(adminJS.options.bundler.babelConfig).not.to.undefined;
    });
    it('load babel.config.js file', function () {
      const adminJS = new _adminjs.default({
        bundler: {
          babelConfig: './babel.test.config.js'
        }
      });
      (0, _chai.expect)(adminJS.options.bundler.babelConfig).not.to.undefined;
    });
  });
  describe('.bundle', function () {
    afterEach(function () {
      global.UserComponents = {};
    });
    context('file exists', function () {
      beforeEach(function () {
        this.result = _adminjs.default.bundle('../spec/fixtures/example-component');
      });
      it('adds given file to a UserComponents object', function () {
        (0, _chai.expect)(Object.keys(global.UserComponents || {})).to.have.lengthOf(1);
      });
      it('returns uniq id', function () {
        (0, _chai.expect)(global.UserComponents && global.UserComponents[this.result]).not.to.be.undefined;
        (0, _chai.expect)(this.result).to.be.a('string');
      });
      it('converts relative path to absolute path', function () {
        (0, _chai.expect)(global.UserComponents && global.UserComponents[this.result]).to.equal(_path.default.join(__dirname, '../spec/fixtures/example-component'));
      });
    });
    context('component name given', function () {
      const componentName = 'Dashboard';
      let result;
      beforeEach(function () {
        result = _adminjs.default.bundle('../spec/fixtures/example-component', componentName);
      });
      it('returns the same component name as which was given', function () {
        (0, _chai.expect)(result).to.eq(componentName);
      });
    });
    it('throws an error when component doesn\'t exist', function () {
      (0, _chai.expect)(() => {
        _adminjs.default.bundle('./fixtures/example-components');
      }).to.throw().property('name', 'ConfigurationError');
    });
  });
});