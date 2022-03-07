import React, { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router';
import { BasePropertyJSON } from '../../interfaces';
export declare type SortLinkProps = {
    property: BasePropertyJSON;
    direction?: 'asc' | 'desc';
    sortBy?: string;
};
declare class SortLink extends React.PureComponent<SortLinkProps & RouteComponentProps> {
    constructor(props: any);
    isActive(): boolean;
    render(): ReactNode;
}
declare const _default: React.ComponentClass<Pick<SortLinkProps & RouteComponentProps<{}, import("react-router").StaticContext, unknown>, "direction" | "sortBy" | "property"> & {
    wrappedComponentRef?: ((instance: SortLink | null) => void) | React.RefObject<SortLink> | null | undefined;
}, any> & import("react-router").WithRouterStatics<typeof SortLink>;
export default _default;
