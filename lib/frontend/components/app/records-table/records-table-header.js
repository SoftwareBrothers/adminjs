"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RecordsTableHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _propertyHeader = _interopRequireDefault(require("./property-header"));

var _display = require("./utils/display");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
const RecordsTableHeader = props => {
  const {
    titleProperty,
    properties,
    sortBy,
    direction,
    onSelectAll,
    selectedAll
  } = props;
  return /*#__PURE__*/_react.default.createElement(_designSystem.TableHead, null, /*#__PURE__*/_react.default.createElement(_designSystem.TableRow, null, /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, null, onSelectAll ? /*#__PURE__*/_react.default.createElement(_designSystem.CheckBox, {
    style: {
      marginLeft: 5
    },
    onChange: () => onSelectAll(),
    checked: selectedAll
  }) : null), properties.map(property => /*#__PURE__*/_react.default.createElement(_propertyHeader.default, {
    display: (0, _display.display)(property.isTitle),
    key: property.propertyPath,
    titleProperty: titleProperty,
    property: property,
    sortBy: sortBy,
    direction: direction
  })), /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
    key: "actions",
    style: {
      width: 80
    }
  })));
};

exports.RecordsTableHeader = RecordsTableHeader;
var _default = RecordsTableHeader;
exports.default = _default;