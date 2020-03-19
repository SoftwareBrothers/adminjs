import factory from 'factory-girl'
import ActionJSON from '../../../backend/decorators/action-json.interface'

factory.define<ActionJSON>('ActionJSON', Object, {
  actionType: 'record',
  showInDrawer: true,
  name: 'edit',
  label: 'someLabel',
  showFilter: false,
  resourceId: 'resource',
  hideActionHeader: false,
  containerWidth: 1,
})
