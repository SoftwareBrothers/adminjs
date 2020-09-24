A powerful, hook which allows you to manage an entire record of a given type.


Take a look at the process of creating a component rendering a form for some non-existing
record in a database.

The form has `name` and `surname` fields. We used {@link BasePropertyComponent} to render them.

After clicking the "save" button, the user will create a new record.
Where all the consecutive calls will update it.

```javascript
import { BasePropertyComponent, useRecord, Box, useTranslation } from '@admin-bro/design-system'

const MyRecordActionComponent = (props) => {
  const { record: initialRecord, resource, action } = props

  const { record, handleChange, submit } = useRecord(initialRecord, resource.id)
  const { translateButton } = useTranslation()

  const nameProperty = resource.editProperties.find((property) => property.name === 'name')
  const surnameProperty = resource.editProperties.find((property) => property.name === 'surname')

  const handleSubmit = (event) => {
    submit().then(() => {
       // do something
    })
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
    >
      <BasePropertyComponent
        where="edit"
        onChange={handleChange}
        property={nameProperty}
        resource={resource}
        record={record}
      />
      <BasePropertyComponent
        where="edit"
        onChange={handleChange}
        property={surnameProperty}
        resource={resource}
        record={record}
      />
      <Button variant="primary" size="lg">
        {translateButton('save', resource.id)}
      </Button>
    </Box>
  )
}
export default MyRecordActionComponent
```

Returns {@link UseRecordResult}.
