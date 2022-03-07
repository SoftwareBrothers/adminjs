import React from 'react';
import { Link } from 'react-router-dom';
import { RecordJSON, ResourceJSON } from '../../interfaces';
export declare const BreadcrumbLink: import("styled-components").StyledComponent<typeof Link, import("styled-components").DefaultTheme, {}, never>;
/**
 * @memberof Breadcrumbs
 */
export declare type BreadcrumbProps = {
    /**
     * Resource
     */
    resource: ResourceJSON;
    /**
     * record
     */
    record?: RecordJSON | null;
    /**
     * Name of an action
     */
    actionName: string;
};
/**
 * @component
 * @private
 */
export declare const Breadcrumbs: React.FC<BreadcrumbProps>;
export default Breadcrumbs;
