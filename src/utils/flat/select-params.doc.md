From all keys in `params` it selects only those passed in arguments.

### Example

```javascript

import flat from '@admin-bro'

const params = {
  name: 'John',
  'education.school.name': 'Harvard',
  'education.school.id': 123,
}

flat.selectParams(params, 'education.school')
// results to {
//   'education.school.name': 'Harvard',
//   'education.school.id': 123,
// }

flat.selectParams(params, 'education.school.id', 'name')
// results to {
//   'name': 'John',
//   'education.school.id': 123,
// }