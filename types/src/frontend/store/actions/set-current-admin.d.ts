import { CurrentAdmin } from '../../../current-admin.interface';
export declare const SESSION_INITIALIZE = "SESSION_INITIALIZE";
export declare type SetCurrentAdminResponse = {
    type: typeof SESSION_INITIALIZE;
    data: CurrentAdmin | null;
};
export declare const setCurrentAdmin: (data?: CurrentAdmin | null) => SetCurrentAdminResponse;
