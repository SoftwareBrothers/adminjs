import { ButtonGroupProps, ButtonInGroupProps } from '@admin-bro/design-system'

import { actionHref, ActionJSON, buildActionTestId } from '../../../interfaces'
import { DifferentActionParams } from '../../../hooks'

export type actionsToButtonGroupOptions = {
  actions: Array<ActionJSON>;
  params: DifferentActionParams;
  handleClick: ButtonInGroupProps['onClick'];
}

export const actionsToButtonGroup = (
  options: actionsToButtonGroupOptions,
): ButtonGroupProps['buttons'] => {
  const { actions, params, handleClick } = options
  const buttons = actions.map((action) => {
    const href = actionHref(action, params)
    return {
      icon: action.icon,
      label: action.label,
      variant: action.variant,
      source: action,
      href: href || undefined,
      // when href is not defined - handle click should also be not defined
      // This prevents from "cursor: pointer;"
      onClick: href ? handleClick : undefined,
      'data-testid': buildActionTestId(action),
      buttons: [],
    }
  })

  // nesting buttons
  const buttonsMap = buttons.reduce((memo, button) => {
    const action = button.source
    if (action.parent) {
      const parent: ButtonInGroupProps = memo[action.parent]
        || buttons.find(btn => btn.source.name === action.parent)
        || {
          label: action.parent,
        }

      parent.buttons = parent.buttons || []
      parent.buttons.push(button)
      return {
        ...memo,
        [action.parent]: parent,
      }
    }
    return {
      ...memo,
      [button.source.name]: button,
    }
  }, {} as Record<string, ButtonInGroupProps>)
  return Object.values(buttonsMap)
}
