From all keys in `params` it removes this passed in an argument.

### Example

```javascript

import flat from '@adminjs'

const params = {
  name: 'John',
  'education.school.name': 'Harvard',
  'education.school.id': 123,
}

flat.filterOutParams(params, 'education.school')
// results to {
//   name: 'John',
// }

flat.filterOurParams(params, 'name')
// results to {
//   'education.school.name': 'Harvard',
//   'education.school.id': 123,
// }