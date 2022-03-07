import { DashboardInState } from '../store';
export declare const DASHBOARD_INITIALIZE = "DASHBOARD_INITIALIZE";
export declare type InitializeDashboardResponse = {
    type: typeof DASHBOARD_INITIALIZE;
    data: DashboardInState;
};
export declare const initializeDashboard: (data: DashboardInState) => InitializeDashboardResponse;
