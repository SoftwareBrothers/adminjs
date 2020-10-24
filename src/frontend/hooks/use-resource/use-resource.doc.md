The hook which allows you to get {@link ResourceJSON} object for a particular resource ID from the store.

### Usage

```javascript
import { useResource } from 'admin-bro'

const MyRecordActionComponent = (props) => {
  const UsersResource = useResource('Users')

  const { properties } = UsersResource
  // ....
}
export default MyRecordActionComponent
```
