import React from 'react';
import { ResourceJSON } from '../../interfaces';
export declare type FilterProps = {
    resource: ResourceJSON;
    toggleFilter: () => void;
    isVisible: boolean;
};
export declare const FilterDrawer: React.FC<FilterProps>;
export default FilterDrawer;
