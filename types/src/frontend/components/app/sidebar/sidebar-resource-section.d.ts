import React from 'react';
import { ResourceJSON } from '../../../interfaces';
/**
 * @alias SidebarResourceSectionProps
 * @memberof SidebarResourceSection
 */
export declare type SidebarResourceSectionProps = {
    /** List of the resources which should be rendered */
    resources: Array<ResourceJSON>;
};
declare const SidebarResourceSection: React.ComponentType<SidebarResourceSectionProps & {
    OriginalComponent?: React.ComponentType<SidebarResourceSectionProps> | undefined;
}>;
export { SidebarResourceSection };
export default SidebarResourceSection;
