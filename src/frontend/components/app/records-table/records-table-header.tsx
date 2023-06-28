import { CheckBox, TableCell, TableHead, TableRow } from '@adminjs/design-system'
import React from 'react'

import allowOverride from '../../../hoc/allow-override.js'
import { BasePropertyJSON } from '../../../interfaces/index.js'
import { getResourceElementCss } from '../../../utils/index.js'
import PropertyHeader from './property-header.js'
import { display } from './utils/display.js'

/**
 * @memberof RecordsTableHeader
 * @alias RecordsTableHeaderProps
 */
export type RecordsTableHeaderProps = {
  /**
   * Property which should be treated as a Title Property
   */
  titleProperty: BasePropertyJSON;
  /**
   * All properties which should be presented
   */
  properties: Array<BasePropertyJSON>;
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
 * ```
 * import { RecordsTableHeader } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
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
 * <Box py="xl">
 *   <Table>
 *    <RecordsTableHeader
 *      properties={properties}
 *      titleProperty={properties[0]}
 *      sortBy={'firstName'}
 *      direction={'asc'}
 *    />
 *    <TableBody>
 *      <TableRow>
 *        <TableCell>John</TableCell>
 *        <TableCell>Doe</TableCell>
 *        <TableCell></TableCell>
 *      </TableRow>
 *      <TableRow>
 *        <TableCell>Max</TableCell>
 *        <TableCell>Kodaly</TableCell>
 *        <TableCell></TableCell>
 *      </TableRow>
 *    </TableBody>
 *   </Table>
 * </Box>
 * )
 */
const RecordsTableHeader: React.FC<RecordsTableHeaderProps> = (props) => {
  const {
    titleProperty, properties,
    sortBy, direction,
    onSelectAll, selectedAll } = props

  const contentTag = getResourceElementCss(titleProperty.resourceId, 'table-head')

  const rowTag = `${titleProperty.resourceId}-table-head-row`
  const checkboxCss = `${titleProperty.resourceId}-checkbox-table-cell`
  return (
    <TableHead data-css={contentTag}>
      <TableRow data-css={rowTag}>
        <TableCell data-css={checkboxCss}>
          {onSelectAll ? (
            <CheckBox
              style={{ marginLeft: 5 }}
              onChange={() => onSelectAll()}
              checked={selectedAll}
            />
          ) : null}
        </TableCell>
        {properties.map((property) => (
          <PropertyHeader
            display={display(property.isTitle)}
            key={property.propertyPath}
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

const OverridableRecordsTableHeader = allowOverride(RecordsTableHeader, 'RecordsTableHeader')

export {
  OverridableRecordsTableHeader as default,
  OverridableRecordsTableHeader as RecordsTableHeader,
  RecordsTableHeader as OriginalRecordsTableHeader,
}
