Returns sub-property from the flatten params. When the property path is not given function returns
an entire unflatten object.

### Example

```javascript

import flat from '@adminjs'

const params = {
  name: 'John',
  'education.school.name': 'Harvard',
  'education.school.id': 123,
}

const data = flat.get(params, 'education.school')
// results to {
//   name: 'Harvard',
//   id: 321,
// }

// value is undefined
const data = flat.get(params)
// results to {
//   name: 'John',
//   education: {
//     school: {
//       name: 'Harvard',
//       id: 321,
//     }
//   }
// }
```