`useModal` hook is used to utilize @adminjs-design-system `Modal` molecule embedded in AdminJS components structure.

### Where you might want to use it?

The hook was designed to be used in three cases
* display alert information (non blocking)
* display confirm window
* display any content in modal

## Examples

Let's create simple React component with button to fire modal example.
We will change `openModal` props to demonstrate modal usage

```javascript
import { Box, Button, Input, Label, Text, TextArea } from '@adminjs/design-system'
import { useModal } from 'adminjs'
import React from 'react'

const ModalPage = () => {
  const { openModal, closeModal } = useModal()  
  
  const modalConfig = { // here we put modal config }
  
  return (
    <Button
        onClick={() => {
          openModal(modalConfig)
        }}
      >
        Open modal
      </Button>
  )
}
```

### Alert

To display alert modal we feed following object into `openModal` function

```javascript
const modalConfig = {
  modalProps: { title: 'somethingHappened', variant: 'info' },
  type: 'alert',
}
```

### Confirm

Confirm modal require function `confirmAction` which will be fired after confirm, so example config can look like this

```javascript
const modalConfig = {
 modalProps: { title: 'areYouSureToDoThis', variant: 'danger' },
 type: 'confirm',
 confirmAction: () => {
   console.log('Confirmed !!!')
 },
}
```

### Form
We can display any content in our modal. For demo purposes we create simple form component


```javascript
const feedbackForm = () => {
  return (
    <Box>
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
        Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
      <Box mt="lg">
        <Label htmlFor="name">Name</Label>
        <Input id="name" width={1} />
      </Box>
      <Box mt="lg">
        <Label htmlFor="comment">Feedback</Label>
        <TextArea id="comment" width={1} />
      </Box>
    </Box>
  )
}

```

Then add few lines above our modal config

```javascript
const feedbackFormComponent = feedbackForm()

const sendFeedback = () => {
  console.log('Feedback sent ...')
  closeModal()
}

const modalConfig = {
  modalProps: {
    variant: 'success',
    icon: 'Grid',
    label: 'feedback',
    title: 'pleaseSendUsFeedback',
    buttons: [{ label: 'cancel' }, { label: 'sendFeedback', variant: 'success', onClick: sendFeedback }],
    children: feedbackFormComponent,
    width: 0.4,
  },
}
```

Modal props are described in 
[adminjs-design-system source code](https://github.com/SoftwareBrothers/adminjs-design-system/tree/master/src/molecules/modal)

