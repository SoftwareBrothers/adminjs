"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEntireRecordGiven = exports.default = void 0;

const isEntireRecordGiven = (propertyOrRecord, value) => !!(typeof value === 'undefined' // user can pass property and omit value. This makes sense when
// third argument of the function (selectedRecord) is passed to onChange
// callback
&& !(typeof propertyOrRecord === 'string') // we assume that only params has to be given
&& propertyOrRecord.params);

exports.isEntireRecordGiven = exports.default = isEntireRecordGiven;