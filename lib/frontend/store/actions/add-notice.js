"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNotice = exports.ADD_NOTICE = void 0;
const ADD_NOTICE = 'ADD_NOTICE';
exports.ADD_NOTICE = ADD_NOTICE;

const addNotice = (data = {
  message: ''
}) => ({
  type: ADD_NOTICE,
  data: {
    message: data.message,
    id: Math.random().toString(36).substr(2, 9),
    type: data.type || 'success',
    progress: 0
  }
});

exports.addNotice = addNotice;