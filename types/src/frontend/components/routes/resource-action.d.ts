import React from 'react';
import { ResourceJSON } from '../../interfaces';
declare type PropsFromState = {
    resources: Array<ResourceJSON>;
};
declare const _default: import("react-redux").ConnectedComponent<React.FC<PropsFromState>, Omit<PropsFromState, "resources"> & import("react-redux").ConnectProps>;
export default _default;
