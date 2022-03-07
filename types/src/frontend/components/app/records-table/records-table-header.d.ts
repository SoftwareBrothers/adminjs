import React from 'react';
import { BasePropertyJSON } from '../../../interfaces';
/**
 * @memberof RecordsTableHeader
 * @alias RecordsTableHeaderProps
 */
export declare type RecordsTableHeaderProps = {
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
};
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
export declare const RecordsTableHeader: React.FC<RecordsTableHeaderProps>;
export default RecordsTableHeader;
