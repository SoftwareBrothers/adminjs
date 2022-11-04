import React from 'react';
import { ActionProps } from '../action.props';
import { PropertyPlace } from '../../../interfaces/property-json/property-json.interface';
import { ParsedLayoutElement } from '../../../../backend/utils/layout-element-parser';
import { BasePropertyProps } from '../../property-type/base-property-props';
declare type Props = ActionProps & {
    layoutElement: ParsedLayoutElement;
    where: PropertyPlace;
    onChange?: BasePropertyProps['onChange'];
};
export declare const LayoutElementRenderer: React.FC<Props>;
export default LayoutElementRenderer;
