export declare const DROP_NOTICE = "DROP_NOTICE";
export declare type DropNoticeResponse = {
    type: typeof DROP_NOTICE;
    data: {
        noticeId: string;
    };
};
export declare const dropNotice: (noticeId: string) => DropNoticeResponse;
