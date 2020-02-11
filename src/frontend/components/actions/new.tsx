import React, { FC } from 'react'
import { useHistory } from 'react-router'

import PropertyType from '../property-type'

import { ActionProps } from './action.props'
import { DrawerContent, Box, DrawerFooter, Button } from '../design-system'
import ActionHeader from '../app/action-header'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import useResource from '../../hooks/use-resource'
import { appendForceRefresh } from './utils/append-force-refresh'

const New: FC<ActionProps> = (props) => {
  const { record: initialRecord, resource, action } = props
  const { record, handleChange, handleSubmit } = useResource(initialRecord, resource.id)
  const history = useHistory()

  const submit = (event: React.FormEvent<HTMLFormElement>): boolean => {
    event.preventDefault()
    handleSubmit().then((response) => {
      if (response.data.redirectUrl) {
        history.push(appendForceRefresh(response.data.redirectUrl))
      }
      // if record has id === has been created
      if (response.data.record.id) {
        handleChange({ params: {}, populated: {}, errors: {} } as RecordJSON)
      }
    })
    return false
  }

  return (
    <Box
      as="form"
      onSubmit={submit}
      flex
      flexGrow={1}
      flexDirection="column"
      height={1}
    >
      <DrawerContent>
        {action?.showInDrawer ? <ActionHeader {...props} /> : null}
        {resource.editProperties.map(property => (
          <PropertyType
            key={property.name}
            where="edit"
            onChange={handleChange}
            property={property}
            resource={resource}
            record={record as RecordJSON}
          />
        ))}
      </DrawerContent>
      <DrawerFooter>
        <Button variant="primary" size="lg">
          Save
        </Button>
      </DrawerFooter>
    </Box>
  )
}

export default New
