import { factory } from 'factory-girl'

factory.define('action', Object, {
  name: 'customAction',
  actionType: ['resource', 'record'],
  icon: 'icon',
  label: 'Custom action',
  guard: null,
  showFilter: false,
  component: undefined,
})

factory.extend('action', 'recordAction', {
  actionType: ['record'],
})

factory.extend('action', 'resourceAction', {
  actionType: ['resource'],
})
