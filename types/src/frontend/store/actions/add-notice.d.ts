import { NoticeMessageInState } from '../store';
import { NoticeMessage } from '../../hoc/with-notice';
export declare const ADD_NOTICE = "ADD_NOTICE";
export declare type AddNoticeResponse = {
    type: typeof ADD_NOTICE;
    data: NoticeMessageInState;
};
export declare const addNotice: (data?: NoticeMessage) => AddNoticeResponse;
