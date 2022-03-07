"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNoticeProgress = exports.SET_NOTICE_PROGRESS = void 0;
const SET_NOTICE_PROGRESS = 'SET_NOTICE_PROGRESS';
exports.SET_NOTICE_PROGRESS = SET_NOTICE_PROGRESS;

const setNoticeProgress = data => ({
  type: SET_NOTICE_PROGRESS,
  data
});

exports.setNoticeProgress = setNoticeProgress;