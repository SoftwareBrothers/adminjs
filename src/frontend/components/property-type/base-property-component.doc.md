The component which renders properties in all the places in the AdminJS UI. By all the
places I mean:

- **list**: on the List,
- **edit**: on default actions where user can modify the record like: {@link EditAction}, and {@link NewAction},
- **show**: on the default {@link ShowAction} where user can see the details of a record,
- **filter**: and finally on the sidebar filter,

Based on the type of given property and where the property is rendered **BasePropertyComponent**
picks Component to use. That is how **date** fields are rendered as **datepicker**
or **boolean** values as **checkbox**'es.

### Overriding default render logic

By default BasePropertyComponent will render the corresponding
component: input for string, DatePicker for dates, etc.
But you can override this by passing a custom component to {@link PropertyOptions}.

Take a look at the following example:

```javascript
const AdminJS = require('adminjs')
const ResourceModel = require('./resource-model')
const AdminJSOptions = {
  resources: [{
    resource: ResourceModel
    options: {
      properties: {
        name: {
          components: {
            show: AdminJS.bundle('./my-react-component'),
          },
        },
      },
    },
  }],
}
```

In the example above we are altering how **name** property will look
like on the Show action. We can define **my-react-component.jsx** like this:

```jsx
import React from 'react'
import { InputGroup, Label } from '@adminjs/design-system'

const MyReactComponent = props => {
  const { record, property } = props
  const value = record.params[property.path]
  return (
    <InputGroup>
      <Label>{property.label}</Label>
      {value} [meters]
    </InputGroup>
  )
}
```

### Live example

```reactComponent
const booleanProperty = {
  isTitle: false,
  name: 'awesome',
  isId: false,
  position: -1,
  label: 'I am awesome',
  type: 'boolean',
}

const stringProperty = {
  isTitle: true,
  name: 'name',
  isId: false,
  position: -1,
  label: 'Name of a user',
  type: 'string',
}
// Resource is taken from the database
const resource = {
  id: 'User',
  name: 'User Model',
  titleProperty: 'name',
  resourceActions: [],
  listProperties: [booleanProperty, stringProperty],
  editProperties: [booleanProperty, stringProperty],
  showProperties: [booleanProperty, stringProperty],
  filterProperties: [booleanProperty, stringProperty],
}

const initialRecord = {
  id: '1',
  title: 'John',
  params: {
    name: 'John',
    gender: 'male',
  },
  errors: {},
  recordActions: [],
}
const Wrapper = () => {
  const { record, handleChange, submit } = useRecord(initialRecord, resource.id)
  const params = JSON.stringify(record.params)
  return (
    <Box py="lg">
      <BasePropertyComponent
        property={booleanProperty}
        resource={resource}
        onChange={handleChange}
        where="edit"
        record={record}
      />
      <BasePropertyComponent
        property={stringProperty}
        resource={resource}
        onChange={handleChange}
        where="edit"
        record={record}
      />
     <Box>
       <Label>Params:</Label>
       {params}
     </Box>
     <Box my="lg">
       <Button variant="primary" onClick={submit}>Submit</Button>
       <Text variant="sm">
         This will throw an error because there is no AdminJS instance running
       </Text>
     </Box>
    </Box>
  )
}

return (<Wrapper />)
```