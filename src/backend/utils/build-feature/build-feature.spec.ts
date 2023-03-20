/* eslint-disable @typescript-eslint/no-empty-function */
import { expect } from 'chai'
import { mergeResourceOptions } from './build-feature.js'
import { Before, After, ActionResponse, ActionHandler } from '../../actions/action.interface.js'

describe('mergeResourceOptions', function () {
  it('chaines before hooks', function () {
    const existingOptions = {
      actions: {
        new: {
          before: function firstBeforeHook() {} as unknown as Before,
          handler: null,
        },
        edit: {
          after: [function firstAfterHook() {} as unknown as After<ActionResponse>],
        },
      },
    }
    const newOptions = {
      actions: {
        new: {
          before: function lastBeforeHook() {} as unknown as Before,
          handler: function lastHandler() {} as unknown as ActionHandler<ActionResponse>,
        },
        edit: {
          after: function lastAfterHook() {} as unknown as After<ActionResponse>,
        },
        newAction: {
          handler: function newHandler() {} as unknown as ActionHandler<ActionResponse>,
        },
      },
    }

    expect(mergeResourceOptions(existingOptions, newOptions)).to.deep.eq({
      actions: {
        new: {
          before: [
            existingOptions.actions.new.before,
            newOptions.actions.new.before,
          ],
          handler: [
            newOptions.actions.new.handler,
          ],
        },
        edit: {
          after: [
            existingOptions.actions.edit.after[0],
            newOptions.actions.edit.after,
          ],
        },
        newAction: {
          handler: [
            newOptions.actions.newAction.handler,
          ],
        },
      },
    })
  })

  it('chaines properties', function () {
    const existingOptions = {
      properties: {
        password: {
          isVisible: true,
          component: 'ala',
        },
      },
    }
    const newOptions = {
      properties: {
        password2: {
          isVisible: false,
          component: 'ela',
        },
      },
    }

    expect(mergeResourceOptions(existingOptions, newOptions)).to.deep.eq({
      properties: {
        ...existingOptions.properties,
        ...newOptions.properties,
      },
    })
  })

  it('merges falsey options', function () {
    const existingOptions = {
      navigation: {
        name: 'db',
      },
    }
    const newOptions = {
      navigation: false,
    }

    expect(mergeResourceOptions(existingOptions, newOptions)).to.deep.eq({
      navigation: false,
    })
  })
})
