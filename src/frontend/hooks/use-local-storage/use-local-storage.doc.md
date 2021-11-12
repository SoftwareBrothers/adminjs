The hook which allows you to store particular data into local storage.

It works very similar to `useState` with the exception that it requires the key under which data
will be stored.

### Usage

```javascript
import { useLocalStorage } from 'adminjs'

const MyRecordActionComponent = (props) => {
  const [isOpen, setIsOpen] = useLocalStorage('isSidebarOpen', false)
  // ....

  return (
    <Box>
      { isOpen ? (
        <Drawer>
          Drawer content
        </Drawer>
      ) : ''}
    </Box>
  )
}
export default MyRecordActionComponent
```

Returns {@link UseRecordResult}.
