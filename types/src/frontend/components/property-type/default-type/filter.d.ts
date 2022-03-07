import React, { ReactNode } from 'react';
import { ThemeProps, DefaultTheme } from 'styled-components';
import { FilterPropertyProps } from '../base-property-props';
declare class Filter extends React.PureComponent<FilterPropertyProps & ThemeProps<DefaultTheme>> {
    constructor(props: any);
    handleInputChange(event: any): void;
    handleSelectChange(selected: any): void;
    renderInput(): ReactNode;
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
