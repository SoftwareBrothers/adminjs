import { factory } from 'factory-girl'

factory.define('action', Object, {
  name: factory.sequence('action.name', n => `action${n}`),
  actionType: 'record',
  icon: 'icon',
  label: factory.sequence('action.label', n => `action label ${n}`),
  guard: null,
  showFilter: false,
  component: undefined,
})

factory.extend('action', 'recordAction', {
  actionType: 'record',
})

factory.extend('action', 'resourceAction', {
  actionType: 'resource',
})
