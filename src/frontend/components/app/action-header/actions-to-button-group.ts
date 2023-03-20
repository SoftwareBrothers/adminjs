import { ButtonGroupProps, ButtonInGroupProps } from '@adminjs/design-system'

import { actionHref, ActionJSON, buildActionTestId, ModalFunctions } from '../../../interfaces/index.js'
import { DifferentActionParams } from '../../../hooks/index.js'
import { TranslateFunctions } from '../../../../utils/index.js'

export type actionsToButtonGroupOptions = {
  actions: Array<ActionJSON>;
  params: DifferentActionParams;
  handleClick: ButtonInGroupProps['onClick'];
  translateFunctions: TranslateFunctions;
  modalFunctions: ModalFunctions,
}

export const actionsToButtonGroup = (
  options: actionsToButtonGroupOptions,
): ButtonGroupProps['buttons'] => {
  const { actions, params, handleClick, translateFunctions } = options
  const { translateAction } = translateFunctions
  const { resourceId } = params
  const buttons = actions.map((action) => {
    const href = actionHref(action, params)
    return {
      icon: action.icon,
      label: translateAction(action.label, resourceId),
      variant: action.variant,
      source: action,
      href: href || undefined,
      // when href is not defined - handle click should also be not defined
      // This prevents from "cursor: pointer;"
      onClick: href ? handleClick : undefined,
      'data-testid': buildActionTestId(action),
      buttons: [],
      'data-css': `${action.resourceId}-${action.name}-button`,
    }
  })

  // nesting buttons
  const buttonsMap = buttons.reduce((memo, button) => {
    const action = button.source
    if (action.parent) {
      const parent: ButtonInGroupProps = memo[action.parent]
        || buttons.find((btn) => btn.source.name === action.parent)
        || { label: action.parent }

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
