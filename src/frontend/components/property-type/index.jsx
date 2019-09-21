import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from '../app/error-boundary'

import { propertyType, resourceType, recordType } from '../../types'

import ArrayType from './array'
import MixedType from './mixed'

import defaultType from './default-type'
import boolean from './boolean'
import datetime from './datetime'
import richtext from './richtext'
import reference from './reference'

const types = {
  boolean,
  datetime,
  reference,
  date: datetime,
  richtext,
}

/**
 * Component which renders properties in all the places in the AdminBro UI. By all the
 * places I mean:
 * - **list**: on the List,
 * - **edit**: on default actions where user can modify the record like: {@link EditAction},
 * and {@link NewAction},
 * - **show**: on the default {@link ShowAction} where user can see the details of a record,
 * - **filter**: and finally on the sidebar filter,
 *
 * Based on the type of given property and where the property is rendered **BasePropertyComponent**
 * picks Component to use. That is how **date** fields are rendered as **datepickers**
 * or **boolean** values as **checkbox**'es.
 *
 * You can override default behaviour by changing **components** param
 * for given property in **AdminBroOptions**. Take a look at the folowing example:
 *
 * ```
 * const AdminBro = require('admin-bro')
 * const ResourceModel = require('./resource-model')
 * const AdminBroOptions = {
 *   resources: [{
 *     resource: ResourceModel
 *     options: {
 *       properties: {
 *         name: {
 *           components: {
 *             show: AdminBro.require('./my-react-component'),
 *           },
 *         },
 *       },
 *     },
 *   }],
 * }
 * ```
 *
 * In the example above we are altering how **name** property will look
 * like on the {@link ShowAction}. When we will define **my-react-component.jsx** like this:
 *
 * ```
 * import React from 'react'
 * import PropertyInShow from 'admin-bro/components'
 *
 * const MyReactComponent = props => {
 *   const { record, property } = props
 *   const value = record.params[property.name] === 'foo' ? 'bar' : 'zoe'
 *   return (
 *     <PropertyInShow property={property}>
 *       {value}
 *     </PropertyInShow>
 *   )
 * }
 * ```
 *
 * When record value for given property (**name**) equals 'foo' we will reder 'bar', otherwise 'zoe'
 *
 * We also use {@link PropertyInShow} helper component to render field with a label that it looks
 * similar to alredy defined properties. For other places you can use
 * a different _wrapper components_:
 * - `edit`: {@link PropertyInEdit}
 * - `show`: {@link PropertyInShow}
 * - `filter`: {@link PropertyInFilter}
 * - `list`: doesn't have any special wrapper,
 *
 * In your components you have access to the following prop types:
 *
 * @component
 * @name BasePropertyComponent
 * @category Base
 * @example
 * const booleanProperty = {
 *   isTitle: false,
 *   name: 'awesome',
 *   isId: false,
 *   position: -1,
 *   label: 'I am awesome',
 *   type: 'boolean',
 * }
 *
 * const stringProperty = {
 *   isTitle: true,
 *   name: 'name',
 *   isId: false,
 *   position: -1,
 *   label: 'Name of a user',
 *   type: 'string',
 * }
 * // Resource is taken from the database
 * const resource = {
 *   id: 'User',
 *   name: 'User Model',
 *   titleProperty: 'name',
 *   recordActions: [],
 *   resourceActions: [],
 *   listProperties: [booleanProperty, stringProperty],
 *   editProperties: [booleanProperty, stringProperty],
 *   showProperties: [booleanProperty, stringProperty],
 *   filterProperties: [booleanProperty, stringProperty],
 * }
 *
 * const record = {
 *   id: '1',
 *   title: 'John',
 *   params: {
 *     name: 'John',
 *     gender: 'male',
 *   }
 * }
 *
 * return (
 *   <WrapperBox border>
 *     <BasePropertyComponent
 *       property={booleanProperty}
 *       resource={resource}
 *       where="edit"
 *       record={record}
 *     />
 *     <BasePropertyComponent
 *       property={stringProperty}
 *       resource={resource}
 *       where="edit"
 *       record={record}
 *     />
 *   </WrapperBox>
 * )
 */
export default class BasePropertyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
    }
  }

  componentDidMount() {
    this.setState({ isClient: true })
  }

  render() {
    const { property, resource, record, filter, where, onChange } = this.props
    const { isClient } = this.state

    let Component = (types[property.type] && types[property.type][where])
    || defaultType[where]

    if (property.components && property.components[where] && isClient) {
      Component = AdminBro.UserComponents[property.components[where]]
      return (
        <ErrorBoundary>
          <Component
            property={property}
            resource={resource}
            record={record}
            filter={filter}
            onChange={onChange}
          />
        </ErrorBoundary>
      )
    }

    const Array = ArrayType[where]
    const Mixed = MixedType[where]

    if (property.isArray) {
      return (
        <Array
          {...this.props}
          ItemComponent={BasePropertyComponent}
        />
      )
    }

    if (property.type === 'mixed' && property.subProperties && property.subProperties.length) {
      return (
        <Mixed
          {...this.props}
          ItemComponent={BasePropertyComponent}
        />
      )
    }

    return (
      <ErrorBoundary>
        <Component
          property={property}
          resource={resource}
          record={record}
          filter={filter}
          onChange={onChange}
        />
      </ErrorBoundary>
    )
  }
}

BasePropertyComponent.propTypes = {
  /**
   * Object of type: {@link BaseProperty~JSON}
   */
  property: propertyType.isRequired,
  /**
   * Object of type: {@link BaseResource~JSON}
   */
  resource: resourceType.isRequired,
  /**
   * Object of type: {@link BaseRecord~JSON}
   */
  record: recordType,
  /**
   * Filter object taken from the query params. It is used on the _filter_ components
   */
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  where: PropTypes.oneOf(['edit', 'filter', 'show', 'list']).isRequired,
  /**
   * Function which indicates change of the property value. It takes either
   * one argument which is entire {@link BaseRecord~JSON} or 2 arguments - one
   * property.name and the second one: value. Used by the _edit_ and _filter_ components
   */
  onChange: PropTypes.func,
}

BasePropertyComponent.defaultProps = {
  filter: {},
  record: null,
  onChange: null,
}


const camelizePropertyType = type => ({
  Edit: type.edit,
  Show: type.show,
  List: type.list,
  Filter: type.filter,
})

BasePropertyComponent.DefaultType = camelizePropertyType(defaultType)
BasePropertyComponent.Boolean = camelizePropertyType(boolean)
BasePropertyComponent.DateTime = camelizePropertyType(datetime)
BasePropertyComponent.RichText = camelizePropertyType(richtext)
BasePropertyComponent.Reference = camelizePropertyType(reference)
