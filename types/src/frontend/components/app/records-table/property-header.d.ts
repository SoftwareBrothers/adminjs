import React from 'react';
import { BasePropertyJSON } from '../../../interfaces';
export declare type PropertyHeaderProps = {
    property: BasePropertyJSON;
    /**
     * Property which should be treated as main property.
     */
    titleProperty: BasePropertyJSON;
    /**
     * currently selected direction. Either 'asc' or 'desc'.
     */
    direction?: 'asc' | 'desc';
    /**
     * currently selected field by which list is sorted.
     */
    sortBy?: string;
    display?: string | Array<string>;
};
export declare const PropertyHeader: React.FC<PropertyHeaderProps>;
export default PropertyHeader;
