import React, { ReactNode } from 'react';
import { FilterPropertyProps, SelectRecord } from '../base-property-props';
declare type CombinedProps = FilterPropertyProps;
declare type FilterState = {
    options: Array<SelectRecord>;
};
declare class Filter extends React.PureComponent<CombinedProps, FilterState> {
    private api;
    constructor(props: CombinedProps);
    handleChange(selected: SelectRecord): void;
    loadOptions(inputValue: string): Promise<Array<{
        value: string | number;
        label: string;
    }>>;
    render(): ReactNode;
}
export default Filter;
