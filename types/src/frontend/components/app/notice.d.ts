import React, { ReactNode } from 'react';
import { NoticeMessageInState } from '../../store/store';
export declare type NotifyProgress = (options: {
    noticeId: string;
    progress: number;
}) => void;
export declare type NoticeElementProps = {
    notice: NoticeMessageInState;
    drop: () => any;
    notifyProgress: NotifyProgress;
};
export declare type NoticeElementState = {
    progress: number;
};
export declare class NoticeElement extends React.Component<NoticeElementProps, NoticeElementState> {
    private timer;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): ReactNode;
}
declare type NoticeBoxPropsFromState = {
    notices: Array<NoticeMessageInState>;
};
declare type NoticeBoxDispatchFromState = {
    drop: (noticeId: string) => void;
    notifyProgress: NotifyProgress;
};
declare const ConnectedNoticeBox: import("react-redux").ConnectedComponent<React.FC<NoticeBoxPropsFromState & NoticeBoxDispatchFromState>, Pick<NoticeBoxPropsFromState & NoticeBoxDispatchFromState, never>>;
export { ConnectedNoticeBox as default, ConnectedNoticeBox as NoticeBox, };
