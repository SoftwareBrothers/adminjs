import React, { ReactNode } from 'react';
/**
 * @alias DrawerPortalProps
 * @memberof DrawerPortal
 */
export declare type DrawerPortalProps = {
    /**
     * The drawer content
     */
    children: ReactNode;
    /**
     * Optional drawer width
     */
    width?: number | string | Array<number | string>;
};
/**
 * Shows all of its children in a Drawer on the right.
 * Instead of rendering it's own {@link Drawer} component it reuses
 * the global Drawer via React Portal.
 *
 * ### Usage
 *
 * ```
 * import { DrawerPortal } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
 */
export declare const DrawerPortal: React.FC<DrawerPortalProps>;
export default DrawerPortal;
