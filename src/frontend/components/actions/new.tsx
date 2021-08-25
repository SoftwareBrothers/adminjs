import React, { FC, useEffect } from 'react'
import { useHistory } from 'react-router'
import { DrawerContent, Box, DrawerFooter, Button, Icon } from '@adminjs/design-system'

import PropertyType from '../property-type'

import { ActionProps } from './action.props'
import ActionHeader from '../app/action-header/action-header'
import { RecordJSON } from '../../interfaces'
import useRecord from '../../hooks/use-record/use-record'
import { appendForceRefresh } from './utils/append-force-refresh'
import { useTranslation } from '../../hooks/use-translation'
import LayoutElementRenderer from './utils/layout-element-renderer'

const New: FC<ActionProps> = (props) => {
  const { record: initialRecord, resource, action } = props
  const {
    record,
    handleChange,
    submit: handleSubmit,
    loading,
    setRecord,
  } = useRecord(initialRecord, resource.id)
  const { translateButton } = useTranslation()
  const history = useHistory()

  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord)
    }
  }, [initialRecord])

  const submit = (event: React.FormEvent<HTMLFormElement>): boolean => {
    event.preventDefault()
    handleSubmit().then((response) => {
      if (response.data.redirectUrl) {
        history.push(appendForceRefresh(response.data.redirectUrl))
      }
      // if record has id === has been created
      if (response.data.record.id && !Object.keys(response.data.record.errors).length) {
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
    >
      <DrawerContent>
        {action?.showInDrawer ? <ActionHeader {...props} /> : null}
        {action.layout ? action.layout.map((layoutElement, i) => (
          <LayoutElementRenderer
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            layoutElement={layoutElement}
            {...props}
            where="edit"
            onChange={handleChange}
            record={record as RecordJSON}
          />
        )) : resource.editProperties.map(property => (
          <PropertyType
            key={property.propertyPath}
            where="edit"
            onChange={handleChange}
            property={property}
            resource={resource}
            record={record as RecordJSON}
          />
        ))}
      </DrawerContent>
      <DrawerFooter>
        <Button variant="primary" size="lg" type="submit" data-testid="button-save" disabled={loading}>
          {loading ? (<Icon icon="Fade" spin />) : null}
          {translateButton('save', resource.id)}
        </Button>
      </DrawerFooter>
    </Box>
  )
}

export {
  New as default,
  New,
}
