Updates the flatten param object with a given value. Value can be anything and, this anything will
be flattened and added to `params`.

`params` is not mutated here.


### Example

```javascript

import flat from '@admin-bro'

const params = {
  name: 'John',
  'education.school.name': 'Harvard',
  'education.school.id': 123,
}

const data = flat.set(params, 'education.shool', {
  name: 'Yale',
  id: 321,
})
// results to data === {
//   name: 'John',
//   'education.school.name': 'Yale`,
//   'education.school.id': 321,
// }

// value is undefined
const data = flat.set(params, 'education') // results to data === { name: 'John' }
```