import React from 'react';
import { RouteComponentProps } from 'react-router';
import { ResourceActionParams } from '../../../backend/utils/view-helpers/view-helpers';
import { ResourceJSON } from '../../interfaces';
declare type PropsFromState = {
    resources: Array<ResourceJSON>;
};
declare type Props = PropsFromState & RouteComponentProps<StringifiedBulk<ResourceActionParams>>;
declare type StringifiedBulk<T> = Omit<T, 'recordsId'> & {
    recordsIds?: string;
};
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, "location" | "history" | "match" | "staticContext">>;
export default _default;
