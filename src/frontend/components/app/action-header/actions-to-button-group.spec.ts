import { ButtonGroupProps } from '@admin-bro/design-system'
import { expect } from 'chai'
import factory from 'factory-girl'
import { ActionJSON } from '../../../interfaces'
import { actionsToButtonGroup } from './actions-to-button-group'

import '../../spec/action-json.factory'

describe('actionsToButtonGroup', () => {
  let actions: Array<ActionJSON>
  const actionsCount = 5
  const params = {
    recordId: 'recordId',
    resourceId: 'resourceId',
    recordsId: ['recordId'],
  }
  let buttonGroupProps: ButtonGroupProps['buttons']

  const handleClick = () => true

  context('flat actions (no nesting)', () => {
    beforeEach(async () => {
      actions = await factory.buildMany<ActionJSON>('ActionJSON', actionsCount, {
        actionType: 'record',
      })

      buttonGroupProps = actionsToButtonGroup({
        actions,
        params,
        handleClick,
      })
    })

    it('returns all buttons', () => {
      expect(buttonGroupProps.length).to.eq(actionsCount)
    })
  })

  context('nested actions', () => {
    let rootActions: {
      normal: ActionJSON;
      publish: ActionJSON;
      export: ActionJSON;
    }
    let actionsPublish: Array<ActionJSON>
    let actionsExport: Array<ActionJSON>

    beforeEach(async () => {
      rootActions = {
        normal: await factory.build<ActionJSON>(
          'ActionJSON', { actionType: 'record' },
        ),
        publish: await factory.build<ActionJSON>(
          'ActionJSON', { actionType: 'record', name: 'publish' },
        ),
        export: await factory.build<ActionJSON>(
          'ActionJSON', { actionType: 'record', name: 'publish' },
        ),
      }
      actionsPublish = await factory.buildMany<ActionJSON>('ActionJSON', actionsCount, {
        actionType: 'record',
        parent: 'publish',
      })
      actionsExport = await factory.buildMany<ActionJSON>('ActionJSON', actionsCount, {
        actionType: 'record',
        parent: 'export',
      })

      buttonGroupProps = actionsToButtonGroup({
        actions: [
          ...Object.values(rootActions),
          ...actionsPublish,
          ...actionsExport,
        ],
        params,
        handleClick,
      })
    })

    it('returns 3 root buttons', () => {
      expect(buttonGroupProps.length).to.eq(3)
    })

    it('returns 5 buttons for each nested action', () => {
      const publishButton = buttonGroupProps[1]
      const exportButton = buttonGroupProps[2]

      expect(publishButton.buttons).to.have.lengthOf(actionsCount)
      expect(exportButton.buttons).to.have.lengthOf(actionsCount)
    })
  })

  context('action with not existing parent', () => {
    const parent = 'newParent'

    beforeEach(async () => {
      actions = [
        await factory.build<ActionJSON>('ActionJSON', {
          actionType: 'record',
          parent,
        }),
      ]

      buttonGroupProps = actionsToButtonGroup({
        actions,
        params,
        handleClick,
      })
    })

    it('returns just one root action', () => {
      expect(buttonGroupProps).to.have.lengthOf(1)
    })

    it('creates button for not existing parent', async () => {
      const parentButton = buttonGroupProps[0]

      expect(parentButton.label).to.equal(parent)
    })

    it('nests remaining action under parent', () => {
      const parentButton = buttonGroupProps[0]

      expect(parentButton.buttons).to.have.lengthOf(1)
    })
  })
})
