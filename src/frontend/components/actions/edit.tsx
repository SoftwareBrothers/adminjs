import React, { FC } from 'react'
import { useHistory } from 'react-router'

import PropertyType from '../property-type'
import { ActionProps } from './action.props'
import { DrawerContent, Box, DrawerFooter, Button, Icon } from '../design-system'
import ActionHeader from '../app/action-header'
import useRecord from '../../hooks/use-record'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { appendForceRefresh } from './utils/append-force-refresh'
import { useTranslation } from '../../hooks/use-translation'

const Edit: FC<ActionProps> = (props) => {
  const { record: initialRecord, resource, action } = props

  const {
    record,
    handleChange,
    submit: handleSubmit,
    loading,
  } = useRecord(initialRecord, resource.id)
  const { translateButton } = useTranslation()
  const history = useHistory()

  const submit = (event: React.FormEvent<HTMLFormElement>): boolean => {
    event.preventDefault()
    handleSubmit().then((response) => {
      if (response.data.redirectUrl) {
        history.push(appendForceRefresh(response.data.redirectUrl))
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
        <Button variant="primary" size="lg" type="submit" data-testid="button-save">
          {loading ? (<Icon icon="Fade" spin />) : null}
          {translateButton('save', resource.id)}
        </Button>
      </DrawerFooter>
    </Box>
  )
}

export default Edit
