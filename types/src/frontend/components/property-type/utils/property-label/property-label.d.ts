import { LabelProps } from '@adminjs/design-system';
import React from 'react';
import { PropertyJSON } from '../../../../interfaces';
export declare type PropertyLabelProps = {
    property: PropertyJSON;
    props?: LabelProps;
};
declare const PropertyLabel: React.FC<PropertyLabelProps>;
export { PropertyLabel as default, PropertyLabel, };
