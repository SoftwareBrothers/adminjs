import factory from 'factory-girl'
import RecordJSON from '../../../backend/decorators/record-json.interface'

factory.define<RecordJSON>('RecordJSON', Object, {
  params: {
    param1: 'value1',
    'nested.param': 'value2',
  },
  populated: {},
  errors: {},
  id: factory.sequence('JSONRecord.id', n => `someId${n}`),
  title: factory.sequence('JSONRecord.id', n => `someTitle${n}`),
  recordActions: [],
  bulkActions: [],
})
