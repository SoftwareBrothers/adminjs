import { CurrencyInputProps } from '@adminjs/design-system';
import { FC } from 'react';
import { EditPropertyProps } from '../base-property-props';
declare type CurrencyEditPropertyProps = EditPropertyProps & CurrencyInputProps;
declare const Filter: FC<CurrencyEditPropertyProps>;
export default Filter;
