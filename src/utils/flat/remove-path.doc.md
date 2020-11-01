This method removes the given path from the flatten object.

Most of the time removing one path is a trivial thing but when it comes to arrays it is more
complicated than just simply removing its key.


### Usage

```javascript

import { flat } from 'admin-bro'

// do something with flat.removePath
const paramsWithoutName = flat.removePath(otherParams, 'name.0')
```

### Why it exists?

Take a look at this example:

having the flatten object

```javascript
{
  'property.0': 'val1',
  'property.1': 'val2',
  'property.2': 'val3',
}
```

you want to remove `property.1` path. In order to do this you will need to remove key `property.1`
and rename `property.2` to `property.1`

and take a look at this example:

```javascript
{
  name: 'value',
  'notPopulated.0': 'val1',
  'notPopulated.1': 'val2',
  'property.0': 'val1',
  'property.1': 'val2',
  'property.2': 'val3',
  'property.3.nested.0': 'val1',
  'property.3.nested.1': 'val2',
  'property.3.nested.2': 'val3',
  'property.3.nested.3.some': 'val3',
  'property.3.nested.4.some-other': 'val41',
  'property.4': 'val4',
  'property.5.nested.0': 'val5',
}
```

what should happen when you want to remove `property.3.nested.3.some` ?

This function solves these problems for you.