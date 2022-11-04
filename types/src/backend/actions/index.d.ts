import { BuildInActions } from './action.interface';
export * from './delete/delete-action';
export * from './show/show-action';
export * from './new/new-action';
export * from './edit/edit-action';
export * from './search/search-action';
export * from './list/list-action';
export * from './bulk-delete/bulk-delete-action';
export * from './action.interface';
export declare const ACTIONS: {
    [key in BuildInActions]: any;
};
