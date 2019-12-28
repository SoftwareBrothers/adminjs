import factory from 'factory-girl'
import ActionJSON from '../../../backend/decorators/action-json.interface'

factory.define<ActionJSON>('ActionJSON', Object, {
  actionType: 'record',
  name: 'edit',
  label: 'edit',
  showFilter: false,
})
