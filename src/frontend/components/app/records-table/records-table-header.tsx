import React from 'react'

import PropertyHeader from './property-header'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import Th from './styled/th.styled'
import { CheckBox, TableHead, TableRow, TableCell } from '../../design-system'

/**
 * @memberof RecordsTableHeader
 * @alias RecordsTableHeader
 */
type Props = {
  /**
   * Property which should be treated as a Title Property
   */
  titleProperty: PropertyJSON;
  /**
   * All properties which should be presented
   */
  properties: Array<PropertyJSON>;
  /**
   * Name of the property which should be marked as currently sorted by
   */
  sortBy?: string;
  /**
   * Sort direction
   */
  direction?: 'asc' | 'desc';
  /**
   * Handler function invoked when checkbox is clicked. If given extra column
   * with checkbox will be rendered
   */
  onSelectAll?: () => any;
  /**
   * Indicates if "bulk" checkbox should be checked
   */
  selectedAll?: boolean;
}

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
const RecordsTableHeader: React.FC<Props> = (props) => {
  const {
    titleProperty, properties,
    sortBy, direction,
    onSelectAll, selectedAll } = props
  return (
    <TableHead>
      <TableRow>
        {onSelectAll ? (
          <TableCell>
            <CheckBox
              style={{ marginLeft: 5 }}
              onChange={(): void => onSelectAll()}
              checked={selectedAll}
            />
          </TableCell>
        ) : null}
        {properties.map(property => (
          <PropertyHeader
            key={property.name}
            titleProperty={titleProperty}
            property={property}
            sortBy={sortBy}
            direction={direction}
          />
        ))}
        <TableCell key="actions" style={{ width: 80 }} />
      </TableRow>
    </TableHead>
  )
}

export default RecordsTableHeader
