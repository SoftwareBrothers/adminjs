import factory from 'factory-girl'
import PropertyJSON from '../../../backend/decorators/property-json.interface'


factory.define('PropertyJSON', Object, {
  isTitle: false,
  isId: false,
  isSortable: true,
  availableValues: null,
  label: factory.sequence('JSONproperty.label', n => `some property ${n}`),
  name: factory.sequence('JSONproperty.name', n => `someProperty${n}`),
  position: factory.sequence('JSONproperty.position', n => n),
  type: 'string',
  reference: null,
  isArray: false,
  subProperties: [],
  components: undefined,
} as PropertyJSON)
