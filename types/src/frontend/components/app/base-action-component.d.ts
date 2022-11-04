import React from 'react';
import { ActionProps } from '../actions/action.props';
/**
 * Component which renders all the default and custom actions for both the Resource and the Record.
 *
 * It passes all props down to the actual Action component.
 *
 * Example of creating your own actions:
 * ```
 * // AdminJS options
 * const AdminJSOptions = {
 *   resources: [
 *      resource,
 *      options: {
 *        actions: {
 *           myNewAction: {
 *             label: 'amazing action',
 *             icon: 'Add',
 *             inVisible: (resource, record) => record.param('email') !== '',
 *             actionType: 'record',
 *             component: AdminJS.bundle('./my-new-action'),
 *             handler: (request, response, data) => {
 *               return {
 *                  ...
 *               }
 *             }
 *           }
 *        }
 *      }
 *   ]
 * }
 * ```
 *
 * ```
 * // ./my-new-action.jsx
 * import { Box } from 'adminjs'
 *
 * const MyNewAction = (props) => {
 *   const { resource, action, record } = props
 *   // do something with the props and render action
 *   return (
 *     <Box>Some Action Content</Box>
 *   )
 * }
 * ```
 *
 * @component
 * @name BaseActionComponent
 * @subcategory Application
 */
export declare const BaseActionComponent: React.FC<ActionProps>;
export default BaseActionComponent;
