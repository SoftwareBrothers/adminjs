import { Box, Button, DrawerContent, DrawerFooter, Icon } from '@adminjs/design-system'
import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router'

import allowOverride from '../../hoc/allow-override.js'
import useRecord from '../../hooks/use-record/use-record.js'
import { useTranslation } from '../../hooks/use-translation.js'
import { RecordJSON } from '../../interfaces/index.js'
import { getActionElementCss } from '../../utils/index.js'
import ActionHeader from '../app/action-header/action-header.js'
import BasePropertyComponent from '../property-type/index.js'
import { ActionProps } from './action.props.js'
import { appendForceRefresh } from './utils/append-force-refresh.js'
import LayoutElementRenderer from './utils/layout-element-renderer.js'

const Edit: FC<ActionProps> = (props) => {
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
          <BasePropertyComponent
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
        <Button variant="contained" type="submit" data-css={buttonTag} data-testid="button-save" disabled={loading}>
          {loading ? (<Icon icon="Loader" spin />) : null}
          {translateButton('save', resource.id)}
        </Button>
      </DrawerFooter>
    </Box>
  )
}

const OverridableEdit = allowOverride(Edit, 'DefaultEditAction')

export {
  OverridableEdit as default,
  OverridableEdit as Edit,
  Edit as OriginalEdit,
}
