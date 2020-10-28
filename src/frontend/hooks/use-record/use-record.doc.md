A powerful, hook which allows you to create and save records from the Frontend side.

## What does it mean?

Let say you have a record action defined like this:

```javascript
actions: {
  comment: {
    actionType: 'record',
    component: AdminBro.bundle('./comment-component.tsx'),
  }
},
properties: {
  comment: { type: 'textarea' },
}
```

And, inside the component, you would like to update a comment property and save it to the database.

You can use `useRecord` hook to do all of this.

### Usage - simplest case.

This is how `CommentComponent` from the previous example could look like:

```javascript
import { BasePropertyComponent, useRecord, Box, useTranslation } from '@admin-bro/design-system'

const MyRecordActionComponent = (props) => {
  const { record: initialRecord, resource, action } = props

  const { record, handleChange, submit } = useRecord(initialRecord, resource.id)

  const { translateButton } = useTranslation()

  const handleSubmit = (event) => {
    submit().then((response) => {
       // you can do something like redirect user, or update state of the component
       // `response.data.record` holds the updated record
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
        property={resource.properties.comment}
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

We used `useRecord` along with `BasePropertyComponent` which renders input for a given property.

In the first step:

```javascript
const { record, handleChange, submit } = useRecord(initialRecord, resource.id)
```

`useRecord` has been initialized with the initial state returned by AdminBro. It was possible because
record actions have the current record in the props.
The next argument was the `resource.id` which tells useRecord where it should send API requests.

You can always put a `null` there, which will result in an empty record returned. In such case
`useRecord` will try to create it in the first `submit` call.

Next, in `BasePropertyComponent` we use `handleChange` callback which usually takes 2 arguments:

* path (name) of the field
* and updated value.

In our case, `BasePropertyComponent` invokes it with arguments 'comment' and whatever is in the
`textarea`. Base on that `useRecord` updates `record` which was returned in the invocation.

> To see more information about the possible way of invoking `handleChange` callback see 
> {@link OnPropertyChange}

Finally, this initial state has to be send to the Backend via the API to update the record in DB.
It is done with `submit()` method.

### More complicated use cases

That was a simple use case. But this is just the start. You can use `useRecord` hook to build:

* complicated custom forms
* handle one to many relationships
* filter data send from the frontend
* and many more.

Check out all the {@link UseRecordOptions options} and see what you can use from the returned
{@link UseRecordResult object}