import { VersionProps } from '../../../adminjs-options.interface';
export declare const VERSIONS_INITIALIZE = "VERSIONS_INITIALIZE";
export declare type InitializeVersionsResponse = {
    type: typeof VERSIONS_INITIALIZE;
    data: VersionProps;
};
export declare const initializeVersions: (data: VersionProps) => InitializeVersionsResponse;
