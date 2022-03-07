import { ResourceJSON } from '../../interfaces';
export declare const RESOURCES_INITIALIZE = "RESOURCES_INITIALIZE";
export declare type InitializeResourcesResponse = {
    type: typeof RESOURCES_INITIALIZE;
    data: Array<ResourceJSON>;
};
export declare const initializeResources: (data: Array<ResourceJSON>) => InitializeResourcesResponse;
