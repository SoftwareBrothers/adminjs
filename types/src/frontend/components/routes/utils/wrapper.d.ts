import React from 'react';
import { BoxProps } from '@adminjs/design-system';
declare type WrapperProps = BoxProps & {
    showFilter?: boolean;
    children?: React.ReactNode;
};
declare const Wrapper: React.FC<WrapperProps>;
export default Wrapper;
