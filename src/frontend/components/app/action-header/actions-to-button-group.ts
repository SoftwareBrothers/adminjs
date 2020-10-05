import { ButtonGroupProps, ButtonInGroupProps } from '@admin-bro/design-system'

import { actionHref, ActionJSON, buildActionTestId } from '../../../interfaces'
import { DifferentActionParams } from '../../../hooks'

export type actionsToButtonGroupOptions = {
  actions: Array<ActionJSON>;
  params: DifferentActionParams;
  search: Location['search'];
  handleClick: ButtonInGroupProps['onClick'];
}

export const actionsToButtonGroup = (
  options: actionsToButtonGroupOptions,
): ButtonGroupProps['buttons'] => {
  const { actions, params, search, handleClick } = options
  const buttons = actions.map((action) => {
    const href = actionHref(action, params, search)
    return {
      icon: action.icon,
      label: action.label,
      variant: action.variant,
      source: action,
      href,
      onClick: handleClick,
      'data-testid': buildActionTestId(action),
      buttons: [],
    }
  })
  return buttons
}
