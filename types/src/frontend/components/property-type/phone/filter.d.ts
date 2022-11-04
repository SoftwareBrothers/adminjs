import { PhoneInputProps } from '@adminjs/design-system';
import { FC } from 'react';
import { EditPropertyProps } from '../base-property-props';
declare type PhoneEditPropertyProps = EditPropertyProps & PhoneInputProps;
declare const Filter: FC<PhoneEditPropertyProps>;
export default Filter;
