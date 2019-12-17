import factory from 'factory-girl'
import RecordJSON from '../../../backend/decorators/record-json.interface'

factory.define('RecordJSON', Object, {
  params: {
    param1: 'value1',
    'nested.param': 'value2',
  },
  populated: {},
  errors: {},
  id: factory.sequence('JSONrecord.id', n => `someId${n}`),
  title: factory.sequence('JSONrecord.id', n => `someTitle${n}`),
  recordActions: [],
} as RecordJSON)
