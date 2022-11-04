import React from 'react';
import { EditPropertyProps, BasePropertyProps } from '../base-property-props';
declare type ItemComponentProps = BasePropertyProps;
interface Props {
    ItemComponent: React.FC<ItemComponentProps>;
}
declare const List: React.FC<Props & EditPropertyProps>;
export default List;
