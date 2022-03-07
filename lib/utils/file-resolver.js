"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relativeFilePathResolver = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * resolve relative file path to absolute file path.
 * @param filePath relative file path
 * @param syntax syntax that match the stack
 */
const relativeFilePathResolver = (filePath, syntax) => {
  const stack = (new Error().stack || '').split('\n');
  const target = stack.findIndex(s => syntax.test(s)); // Node = 8 shows stack like that: '(/path/to/file.ts:77:27)

  const pathNode8 = stack[target + 1].match(/\((.*):[0-9]+:[0-9]+\)/); // Node >= 10 shows stack like that: 'at /path/to/file.ts:77:27

  const pathNode10 = stack[target + 1].match(/at (.*):[0-9]+:[0-9]+/);

  if (!pathNode8 && !pathNode10) {
    throw new Error('STACK does not have a file url. Check out if the node version >= 8');
  }

  const executionPath = pathNode8 && pathNode8[1] || pathNode10 && pathNode10[1];
  return _path.default.join(_path.default.dirname(executionPath), filePath);
};

exports.relativeFilePathResolver = relativeFilePathResolver;