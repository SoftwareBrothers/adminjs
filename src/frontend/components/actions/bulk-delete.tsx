import React, { useState } from 'react'
import {
  Table, TableBody, TableRow, TableCell, Text,
  DrawerContent, DrawerFooter, Button, MessageBox, Icon,
} from '@admin-bro/design-system'

import { RouteComponentProps, withRouter } from 'react-router'
import PropertyType from '../property-type'
import { ActionProps } from './action.props'
import ApiClient from '../../utils/api-client'
import withNotice, { AddNoticeProps } from '../../hoc/with-notice'
import { appendForceRefresh } from './utils/append-force-refresh'

import ActionHeader from '../app/action-header/action-header'
import { useTranslation } from '../../hooks'

/**
 * @name ShowAction
 * @category Actions
 * @description Shows a given record.
 * @component
 * @private
 */
const BulkDelete: React.FC<ActionProps & AddNoticeProps & RouteComponentProps> = (props) => {
  const { resource, records, action, addNotice, history } = props

  const [loading, setLoading] = useState(false)
  const { translateMessage, translateButton } = useTranslation()

  if (!records) {
    return (
      <Text>
        {translateMessage('pickSomeFirstToRemove', resource.id)}
      </Text>
    )
  }

  const handleClick = (): void => {
    const api = new ApiClient()
    setLoading(true)
    const recordIds = records.map(r => r.id)
    api.bulkAction({
      resourceId: resource.id,
      actionName: action.name,
      recordIds,
      method: 'post',
    }).then(((response) => {
      setLoading(false)
      if (response.data.notice) {
        addNotice(response.data.notice)
      }
      if (response.data.redirectUrl) {
        const search = new URLSearchParams(window.location.search)
        // bulk function have recordIds in the URL so it has to be stripped before redirect
        search.delete('recordIds')
        history.push(appendForceRefresh(response.data.redirectUrl, search.toString()))
      }
    })).catch((error) => {
      setLoading(false)
      addNotice({
        message: translateMessage('bulkDeleteError', resource.id),
        type: 'error',
      })
      throw error
    })
  }

  return (
    <React.Fragment>
      <DrawerContent>
        {action?.showInDrawer ? <ActionHeader omitActions {...props} /> : null}
        <MessageBox
          mb="xxl"
          variant="danger"
          message={translateMessage('theseRecordsWillBeRemoved', resource.id, { count: records.length })}
        />
        <Table>
          <TableBody>
            {records.map(record => (
              <TableRow key={record.id}>
                <TableCell>
                  <PropertyType
                    where="list"
                    property={resource.titleProperty}
                    resource={resource}
                    record={record}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DrawerContent>
      <DrawerFooter>
        <Button variant="primary" size="lg" onClick={handleClick}>
          {loading ? (<Icon icon="Fade" spin />) : null}
          {translateButton('confirmRemovalMany', resource.id, { count: records.length })}
        </Button>
      </DrawerFooter>
    </React.Fragment>
  )
}

const FormattedBulkDelete = withNotice(withRouter(BulkDelete))

export {
  FormattedBulkDelete as default,
  FormattedBulkDelete as BulkDelete,
}
