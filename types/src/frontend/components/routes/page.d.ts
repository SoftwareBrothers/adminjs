import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router';
import { ReduxState } from '../../store/store';
declare type State = {
    isClient: boolean;
};
declare type PropsFromState = {
    pages: ReduxState['pages'];
};
declare type Props = PropsFromState & RouteComponentProps<{
    pageName: string;
}>;
declare class Page extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): ReactNode;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Page, Pick<React.ClassAttributes<Page> & PropsFromState & RouteComponentProps<{
    pageName: string;
}, import("react-router").StaticContext, unknown>, "ref" | "key" | "location" | "history" | "match" | "staticContext">>;
export default _default;
