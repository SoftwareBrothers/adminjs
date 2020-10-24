The hook which allows you to use {@link ActionJSON} to perform actual actions on the backend.
Base on the action type and parameters (like {@link ActionJSON.guard}) it behaves differently.

### Usage

```javascript
import { useAction } from 'admin-bro'
import { Button } from '@admin-bro/design-system'

const myComponent = ({ action }) => {
  const { href, handleClick } = useAction(action, {
    resourceId, recordId, recordIds,
  }, actionPerformed)

  return (
    <Button as="a" onClick={handleClick} href={href}>Click this action</Button>
  )
}
```