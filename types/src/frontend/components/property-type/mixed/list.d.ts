import React from 'react';
import { EditPropertyProps } from '../base-property-props';
interface Props {
    ItemComponent: typeof React.Component;
}
export default class List extends React.PureComponent<Props & EditPropertyProps> {
    renderItems(): React.ReactChild;
    render(): React.ReactChild;
}
export {};
