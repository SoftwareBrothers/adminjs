import React, { ReactNode } from 'react';
import { FilterPropertyProps } from '../base-property-props';
declare class Filter extends React.PureComponent<FilterPropertyProps> {
    constructor(props: any);
    handleInputChange(event: any): void;
    handleSelectChange(selected: any): void;
    renderInput(): ReactNode;
    render(): ReactNode;
}
export default Filter;
