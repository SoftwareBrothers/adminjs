export declare const SET_NOTICE_PROGRESS = "SET_NOTICE_PROGRESS";
export declare type SetNoticeProgress = {
    noticeId: string;
    progress: number;
};
export declare type SetNoticeProgressResponse = {
    type: typeof SET_NOTICE_PROGRESS;
    data: SetNoticeProgress;
};
export declare const setNoticeProgress: (data: SetNoticeProgress) => SetNoticeProgressResponse;
