import React from 'react'
import PropTypes from 'prop-types'

import Placeholder from './placeholder'

const PLACEHOLDER_HEIGHT = 14

/**
 * Renders placeholders in a table row
 *
 * @component
 * @hideconstructor
 *
 * @example
 * return (
 * <Table>
 *   <PlaceholderInList columns={4} />
 *   <PlaceholderInList columns={4} />
 * </Table>
 * )
 */
const PlaceholderInList = (props) => {
  const { columns } = props
  return (
    <tr>
      {[...Array(columns)].map(i => (
        <td key={i}><Placeholder style={{ height: PLACEHOLDER_HEIGHT }} /></td>
      ))}
    </tr>
  )
}

PlaceholderInList.propTypes = {
  /**
   * How many placeholder columns should be rendered
   */
  columns: PropTypes.number.isRequired,
}

export default PlaceholderInList
