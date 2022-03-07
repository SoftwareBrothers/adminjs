/// <reference types="react" />
export * from './new';
export * from './action.props';
export * from './edit';
export * from './show';
export * from './list';
export * from './bulk-delete';
export * from './utils';
export declare const actions: {
    new: import("react").FC<import("./action.props").ActionProps>;
    edit: import("react").FC<import("./action.props").ActionProps>;
    show: import("react").FC<import("./action.props").ActionProps>;
    list: import("react").FC<import("./action.props").ActionProps>;
    bulkDelete: import("react-redux").ConnectedComponent<any, Pick<unknown, never>>;
};
