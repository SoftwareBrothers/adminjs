import factory from 'factory-girl'
import './action-json.factory'
import { ActionJSON, RecordJSON } from '../../interfaces'

factory.define<RecordJSON>('RecordJSON', Object, {
  params: {
    param1: 'value1',
    'nested.param': 'value2',
  },
  populated: {},
  baseError: null,
  errors: {},
  id: factory.sequence('JSONRecord.id', n => `someId${n}`),
  title: factory.sequence('JSONRecord.id', n => `someTitle${n}`),
  recordActions: [],
  bulkActions: [],
})


factory.extend<RecordJSON>('RecordJSON', 'RecordJSON.total', {
  // params set for properties from ResourceJSON.total factory's properties
  params: {
    name: 'John',
    surname: 'Doe',
    gender: 'MALE',
  },
}, {
  afterBuild: async (model) => {
    const showAction = await factory.build<ActionJSON>('ActionJSON', {
      name: 'show', actionType: 'record',
    })
    const editAction = await factory.build<ActionJSON>('ActionJSON', {
      name: 'edit', actionType: 'record',
    })
    const deleteAction = await factory.build<ActionJSON>('ActionJSON', {
      name: 'delete', actionType: 'record',
    })
    return {
      ...model,
      recordActions: [showAction, editAction, deleteAction],
    }
  },
})
