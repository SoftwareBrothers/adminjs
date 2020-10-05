import { ButtonGroupProps } from '@admin-bro/design-system'
import { expect } from 'chai'
import factory from 'factory-girl'
import { ActionJSON } from '../../../interfaces'
import { actionsToButtonGroup } from './actions-to-button-group'

import '../../spec/action-json.factory'

describe.only('actionsToButtonGroup', () => {
  let actions: Array<ActionJSON>
  const params = {
    recordId: 'recordId',
    resourceId: 'resourceId',
    recordsId: ['recordId'],
  }

  const search = ''
  const handleClick = () => true

  beforeEach(() => {

  })

  context('flat actions (no nesting)', () => {
    const actionsCount = 5
    let buttonGroupProps: ButtonGroupProps['buttons']

    beforeEach(async () => {
      actions = await factory.buildMany<ActionJSON>('ActionJSON', actionsCount, {
        actionType: 'record',
      })

      buttonGroupProps = actionsToButtonGroup({
        actions,
        params,
        search,
        handleClick,
      })
    })

    it('returns all buttons', () => {
      expect(buttonGroupProps.length).to.eq(actionsCount)
    })
  })
})
