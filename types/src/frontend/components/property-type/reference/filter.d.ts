import React, { ReactNode } from 'react';
import { ThemeProps, DefaultTheme } from 'styled-components';
import { FilterPropertyProps, SelectRecord } from '../base-property-props';
declare type CombinedProps = FilterPropertyProps & ThemeProps<DefaultTheme>;
declare class Filter extends React.PureComponent<CombinedProps> {
    private api;
    private options;
    constructor(props: CombinedProps);
    handleChange(selected: SelectRecord): void;
    loadOptions(inputValue: string): Promise<Array<{
        value: string;
        label: string;
    }>>;
    render(): ReactNode;
}
declare const _default: React.ForwardRefExoticComponent<Pick<import("../base-property-props").BasePropertyProps & {
    filter: any;
    onChange: import("../base-property-props").OnPropertyChange;
    record: undefined;
} & ThemeProps<DefaultTheme> & React.RefAttributes<Filter>, "record" | "resource" | "ref" | "filter" | "key" | "property" | "onChange" | "where"> & {
    theme?: DefaultTheme | undefined;
}>;
export default _default;
