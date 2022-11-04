import { ButtonGroupProps, ButtonInGroupProps } from '@adminjs/design-system';
import { ActionJSON } from '../../../interfaces';
import { DifferentActionParams } from '../../../hooks';
export declare type actionsToButtonGroupOptions = {
    actions: Array<ActionJSON>;
    params: DifferentActionParams;
    handleClick: ButtonInGroupProps['onClick'];
};
export declare const actionsToButtonGroup: (options: actionsToButtonGroupOptions) => ButtonGroupProps['buttons'];
