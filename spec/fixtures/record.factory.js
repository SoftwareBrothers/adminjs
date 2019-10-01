import { factory } from 'factory-girl'

factory.define('record', Object, {
  params: {
    param1: 'value',
    'nested.param': 'value2',
    _id: '5d6165fc1af7720536be0930',
  },
  populated: {},
  errors: {},
  id: '5d6165fc1af7720536be0930',
})
