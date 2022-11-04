import type { useLocation } from 'react-router';
export declare const INITIAL_ROUTE = "INITIAL_ROUTE";
export declare const ROUTE_CHANGED = "ROUTE_CHANGED";
export declare type RouteChangedResponse = {
    type: typeof ROUTE_CHANGED;
    data: any;
};
export declare const initializeRoute: (location: Partial<ReturnType<typeof useLocation>>) => RouteChangedResponse;
export declare const changeRoute: (location: ReturnType<typeof useLocation>) => RouteChangedResponse;
