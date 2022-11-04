import React from 'react';
import { RecordJSON, ResourceJSON } from '../../interfaces';
export declare const BreadcrumbLink: import("styled-components").StyledComponent<React.ForwardRefExoticComponent<import("react-router-dom").LinkProps & React.RefAttributes<HTMLAnchorElement>>, import("styled-components").DefaultTheme, {}, never>;
export declare const BreadcrumbText: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, any, never>;
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
