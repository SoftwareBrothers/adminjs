On change callback - It can take: 

* one argument which is an entire {@link RecordJSON} 
* 2 arguments - one __property.path__ and the second one: __value__. 

* Used by the __edit__ and __filter__ components.
 
Let's take a look at an example of the edit component

It has one button: "Set Name". When this button is clicked - it triggers `onChange` callback
function. In this case, we are passing an updated record, so that we can change the value of another
property: `name`.

```javascript
  import React from 'react'
  import { Button, Box } from '@adminjs/design-system'

  const ValueTrigger = (props) => {
    const { onChange, record } = props

    const handleClick = (): void => {
      onChange({
        ...record,
        params: {
          ...record.params,
          name: 'my new name',
        },
      })
    }

    return (
      <Box mb="xxl">
        <Button type="button" onClick={handleClick}>Set Name</Button>
      </Box>
    )
  }

  export default ValueTrigger
 
```