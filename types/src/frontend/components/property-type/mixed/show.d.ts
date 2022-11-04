import React from 'react';
import { BasePropertyProps } from '../base-property-props';
interface Props {
    ItemComponent: typeof React.Component;
}
declare const Show: React.FC<Props & BasePropertyProps>;
export default Show;
