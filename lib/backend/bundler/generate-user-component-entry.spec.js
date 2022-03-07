"use strict";

var _path = _interopRequireDefault(require("path"));

var _adminjs = _interopRequireDefault(require("../../adminjs"));

var _generateUserComponentEntry = _interopRequireDefault(require("./generate-user-component-entry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exampleComponent = '../../../spec/fixtures/example-component';
const entryPath = './';
describe('generateUserComponentEntry', function () {
  it('defines AdminJS.UserComponents', function () {
    const adminJs = new _adminjs.default();
    const entryFile = (0, _generateUserComponentEntry.default)(adminJs, entryPath);
    expect(entryFile).to.have.string('AdminJS.UserComponents = {}\n');
  });
  it('adds env variables to the entry file', function () {
    const adminJs = new _adminjs.default({
      env: {
        ENV_NAME: 'value'
      }
    });
    const entryFile = (0, _generateUserComponentEntry.default)(adminJs, entryPath);
    expect(entryFile).to.have.string('AdminJS.env.ENV_NAME = "value"\n');
  });
  it('adds components to the entry file', function () {
    const adminJs = new _adminjs.default();

    const componentId = _adminjs.default.bundle(exampleComponent);

    const rootEntryPath = _path.default.resolve(entryPath);

    const filePath = _path.default.relative(rootEntryPath, _path.default.normalize(_path.default.join(__dirname, exampleComponent)));

    const entryFile = (0, _generateUserComponentEntry.default)(adminJs, entryPath);
    expect(entryFile).to.have.string([`import ${componentId} from '${filePath}'`, `AdminJS.UserComponents.${componentId} = ${componentId}`].join('\n'));
    _adminjs.default.UserComponents = {};
  });
});