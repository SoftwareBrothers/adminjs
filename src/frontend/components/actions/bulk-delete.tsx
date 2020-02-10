import React, { useState } from 'react'

import { RouteComponentProps, withRouter } from 'react-router'
import PropertyType from '../property-type'
import { ActionProps } from './action.props'
import ApiClient from '../../utils/api-client'
import withNotice, { AddNoticeProps } from '../../store/with-notice'
import { appendForceRefresh } from './utils/append-force-refresh'

import {
  Table, TableBody, TableRow, TableCell, Text,
  DrawerContent, DrawerFooter, Button, MessageBox,
} from '../design-system'
import ActionHeader from '../app/action-header'

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

  if (!records) {
    return (
      <Text>
        In order to remove records, you have to pick them first.
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
        message: 'There was an error deleting records, Check out console to see more information.',
        type: 'error',
      })
      throw error
    })
  }

  return (
    <React.Fragment>
      <DrawerContent>
        <ActionHeader {...props} />
        <MessageBox mb="xxl" variant="danger" message="Following records will be removed" />
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
          {`Confirm the removal of ${records.length} records`}
        </Button>
      </DrawerFooter>
    </React.Fragment>
  )
}

export default withNotice(withRouter(BulkDelete))
