import { BaseProperty } from '../../../adapters';
import PropertyOptions from '../property-options.interface';
export declare type OverridableFromOptionsType = keyof Pick<BaseProperty, 'isSortable' | 'type' | 'isId' | 'isRequired' | 'isTitle'>;
export declare function overrideFromOptions<T extends OverridableFromOptionsType>(optionName: T, property: BaseProperty, options: PropertyOptions): ReturnType<BaseProperty[OverridableFromOptionsType]> | null | undefined;
