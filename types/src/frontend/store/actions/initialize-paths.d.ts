import { Paths } from '../store';
export declare const PATHS_INITIALIZE = "PATHS_INITIALIZE";
export declare type InitializePathsResponse = {
    type: typeof PATHS_INITIALIZE;
    data: Paths;
};
export declare const initializePaths: (data: Paths) => InitializePathsResponse;
