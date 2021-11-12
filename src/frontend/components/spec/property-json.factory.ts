import factory from 'factory-girl'
import { PropertyJSON } from '../../interfaces'


factory.define<PropertyJSON>('PropertyJSON', Object, {
  custom: {},
  isTitle: false,
  isId: false,
  isSortable: true,
  availableValues: null,
  label: factory.sequence('JSONProperty.label', n => `some property ${n}`),
  name: factory.sequence('JSONProperty.name', n => `someProperty${n}`),
  position: factory.sequence('JSONProperty.position', n => n),
  type: 'string',
  reference: null,
  isDisabled: false,
  isArray: false,
  isDraggable: false,
  subProperties: [],
  isRequired: true,
  components: undefined,
  path: factory.sequence('JSONProperty.path', n => `someProperty${n}`),
  propertyPath: factory.sequence('JSONProperty.propertyPath', n => `someProperty${n}`),
  resourceId: 'someResourceId',
  isVirtual: false,
  props: {},
  hideLabel: false,
})
