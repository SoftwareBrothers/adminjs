"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropNotice = exports.DROP_NOTICE = void 0;
const DROP_NOTICE = 'DROP_NOTICE';
exports.DROP_NOTICE = DROP_NOTICE;

const dropNotice = noticeId => ({
  type: 'DROP_NOTICE',
  data: {
    noticeId
  }
});

exports.dropNotice = dropNotice;