import { Box, Button, DrawerContent, DrawerFooter, Icon } from '@adminjs/design-system'
import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'

import allowOverride from '../../hoc/allow-override'
import useRecord from '../../hooks/use-record/use-record'
import { useTranslation } from '../../hooks/use-translation'
import { RecordJSON } from '../../interfaces'
import { getActionElementCss } from '../../utils'
import ActionHeader from '../app/action-header/action-header'
import PropertyType from '../property-type'
import { ActionProps } from './action.props'
import { appendForceRefresh } from './utils/append-force-refresh'
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
  const navigate = useNavigate()

  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord)
    }
  }, [initialRecord])

  const submit = (event: React.FormEvent<HTMLFormElement>): boolean => {
    event.preventDefault()
    handleSubmit().then((response) => {
      if (response.data.redirectUrl) {
        navigate(appendForceRefresh(response.data.redirectUrl))
      }
      // if record has id === has been created
      if (response.data.record.id && !Object.keys(response.data.record.errors).length) {
        handleChange({ params: {}, populated: {}, errors: {} } as RecordJSON)
      }
    })
    return false
  }

  const contentTag = getActionElementCss(resource.id, action.name, 'drawer-content')
  const formTag = getActionElementCss(resource.id, action.name, 'form')
  const footerTag = getActionElementCss(resource.id, action.name, 'drawer-footer')
  const buttonTag = getActionElementCss(resource.id, action.name, 'drawer-submit')

  return (
    <Box
      as="form"
      onSubmit={submit}
      flex
      flexGrow={1}
      flexDirection="column"
      data-css={formTag}
    >
      <DrawerContent data-css={contentTag}>
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
        )) : resource.editProperties.map((property) => (
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
      <DrawerFooter data-css={footerTag}>
        <Button variant="primary" size="lg" type="submit" data-css={buttonTag} data-testid="button-save" disabled={loading}>
          {loading ? (<Icon icon="Fade" spin />) : null}
          {translateButton('save', resource.id)}
        </Button>
      </DrawerFooter>
    </Box>
  )
}

const OverridableNew = allowOverride(New, 'DefaultNewAction')

export {
  OverridableNew as default,
  OverridableNew as New,
}
