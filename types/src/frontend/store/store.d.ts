import type { useLocation } from 'react-router';
import { Assets, BrandingOptions, VersionProps } from '../../adminjs-options.interface';
import { PageJSON, ResourceJSON } from '../interfaces';
import { CurrentAdmin } from '../../current-admin.interface';
import { Locale } from '../../locale/config';
import { NoticeMessage } from '../hoc/with-notice';
export declare type DashboardInState = {
    component?: string;
};
export declare type NoticeMessageInState = NoticeMessage & {
    message: string;
    id: string;
    type: NoticeMessage['type'];
    progress: number;
};
export declare type Paths = {
    rootPath: string;
    logoutPath: string;
    loginPath: string;
    assetsCDN?: string;
};
export declare type RouterProps = {
    from: Partial<ReturnType<typeof useLocation>>;
    to: Partial<ReturnType<typeof useLocation>>;
};
export declare type ReduxState = {
    resources: Array<ResourceJSON>;
    branding: BrandingOptions;
    assets: Assets;
    paths: Paths;
    session: CurrentAdmin | null;
    dashboard: DashboardInState;
    notices: Array<NoticeMessageInState>;
    versions: VersionProps;
    pages: Array<PageJSON>;
    locale: Locale;
    router: RouterProps;
};
declare const _default: (initialState?: {}) => import("redux").Store<import("redux").EmptyObject & ReduxState, import("redux").AnyAction>;
export default _default;
