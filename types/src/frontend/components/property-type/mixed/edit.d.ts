import React from 'react';
import { EditPropertyProps } from '../base-property-props';
declare type Props = {
    ItemComponent: typeof React.Component;
};
declare const Edit: React.FC<Props & EditPropertyProps>;
export default Edit;
