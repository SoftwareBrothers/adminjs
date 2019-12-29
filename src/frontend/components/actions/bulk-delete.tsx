import React, { useState } from 'react'

import { RouteComponentProps, withRouter } from 'react-router'
import PropertyType from '../property-type'
import WrapperBox from '../ui/wrapper-box'
import { ActionProps } from './action.props'
import { PropertyPlace } from '../../../backend/decorators/property-json.interface'
import Table from '../ui/table'
import { ErrorMessageBox, StyledButton } from '../ui'
import ApiClient from '../../utils/api-client'
import withNotice, { AddNoticeProps } from '../../store/with-notice'

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
      <ErrorMessageBox title="No records selected">
        In order to remove records, you have to pick them first.
      </ErrorMessageBox>
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
        history.push(response.data.redirectUrl)
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
    <WrapperBox border>
      <h1>Following records will be removed:</h1>
      <Table>
        {records.map(record => (
          <tr>
            {resource.listProperties.map(property => (
              <td key={property.name} className={resource.titleProperty.name === property.name ? 'main' : undefined}>
                <PropertyType
                  where={PropertyPlace.list}
                  property={property}
                  resource={resource}
                  record={record}
                />
              </td>
            ))}
          </tr>
        ))}
      </Table>
      <p>
        <StyledButton
          onClick={handleClick}
          className={`is-primary${loading ? ' is-loading' : ''}`}
        >
          {`Confirm the removal of ${records.length} records`}
        </StyledButton>
      </p>
    </WrapperBox>
  )
}

export default withNotice(withRouter(BulkDelete))
