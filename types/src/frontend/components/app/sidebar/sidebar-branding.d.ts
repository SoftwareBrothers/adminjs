import React from 'react';
import { Link } from 'react-router-dom';
import { BrandingOptions } from '../../../../adminjs-options.interface';
declare type Props = {
    branding: BrandingOptions;
};
export declare const StyledLogo: import("styled-components").StyledComponent<typeof Link, import("styled-components").DefaultTheme, {}, never>;
declare const _default: React.ComponentType<Props & {
    OriginalComponent?: React.FunctionComponent<Props> | React.ComponentClass<Props, any> | undefined;
}>;
export default _default;
