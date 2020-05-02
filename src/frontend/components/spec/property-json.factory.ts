import factory from 'factory-girl'
import PropertyJSON from '../../../backend/decorators/property-json.interface'


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
  subProperties: [],
  isRequired: true,
  components: undefined,
  resourceId: 'someResourceId',
})
