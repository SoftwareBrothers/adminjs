import { CurrencyInputProps } from '@adminjs/design-system';
import { FC } from 'react';
export declare type CurrencyInputWrapperProps = {
    id: string;
    initial: string;
    options?: Record<string, any>;
    onChange: (value: string | undefined) => void;
} & CurrencyInputProps;
export declare const CurrencyInputWrapper: FC<CurrencyInputWrapperProps>;
