import { factory } from 'factory-girl'

factory.define('property', Object, {
  isId: false,
  isSortable: true,
  isTitle: true,
  label: factory.sequence('property.label', (n) => `some property ${n}`),
  name: factory.sequence('property.name', (n) => `someProperty${n}`),
  position: factory.sequence('property.position', (n) => n),
  type: 'string',
})
