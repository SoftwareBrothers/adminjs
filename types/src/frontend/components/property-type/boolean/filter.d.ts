import React, { ReactNode } from 'react';
import { FilterPropertyProps } from '../base-property-props';
declare class Filter extends React.PureComponent<FilterPropertyProps> {
    constructor(props: any);
    handleChange(selected: any): void;
    render(): ReactNode;
}
export default Filter;
