import React from 'react'
import PropTypes from 'prop-types'

import PropertyHeader from './property-header'
import { propertyType } from '../../types'

/**
 * Prints `thead` section for table with records.
 *
 * @component
 * @example <caption>List with 2 properties</caption>
 * const properties = [{
 *   label: 'First Name',
 *   name: 'firstName',
 *   isSortable: true,
 * }, {
 *   label: 'Last Name',
 *   name: 'lastName',
 * }]
 * return (
 * <WrapperBox border>
 *   <Table>
 *    <RecordsTableHeader
 *      properties={properties}
 *      titleProperty={properties[0]}
 *      sortBy={'firstName'}
 *      direction={'asc'}
 *    />
 *    <tbody><tr>
 *      <td>John</td>
 *      <td>Doe</td>
 *      <td><StyledButton>Do something with John</StyledButton></td>
 *    </tr></tbody>
 *   </Table>
 * </WrapperBox>
 * )
 */
const RecordsTableHeader = (props) => {
  const { titleProperty, properties, sortBy, direction } = props
  return (
    <thead>
      <tr key="header">
        {properties.map(property => (
          <PropertyHeader
            key={property.name}
            titleProperty={titleProperty}
            property={property}
            sortBy={sortBy}
            direction={direction}
          />
        ))}
        <th key="actions" style={{ width: 80 }} />
      </tr>
    </thead>
  )
}

RecordsTableHeader.propTypes = {
  /**
   * {@link BaseProperty~JSON}
   */
  titleProperty: propertyType.isRequired,
  /**
   * Array of {@link BaseProperty~JSON}
   */
  properties: PropTypes.arrayOf(propertyType).isRequired,
  /**
   * Name of the property which should be marked as currently sorted by
   */
  sortBy: PropTypes.string.isRequired,
  /**
   * Sort direction
   */
  direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
}

export default RecordsTableHeader
