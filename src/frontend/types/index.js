import PropTypes from 'prop-types'

export const pathsType = PropTypes.shape({
  loginPath: PropTypes.string.isRequired,
  rootPath: PropTypes.string.isRequired,
  logoutPath: PropTypes.string.isRequired,
})

export const sessionType = PropTypes.shape({
  email: PropTypes.string,
})

export const brandingType = PropTypes.shape({
  logo: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  softwareBrothers: PropTypes.bool.isRequired,
})

const propertyTypeShape = {
  isId: PropTypes.bool.isRequired,
  isSortable: PropTypes.bool.isRequired,
  isTitle: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  position: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  availableValues: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  })),
  reference: PropTypes.oneOfType([PropTypes.string]),
  isArray: PropTypes.boolean,
}

export const propertyType = PropTypes.shape(propertyTypeShape)

propertyTypeShape.subProperties = PropTypes.arrayOf(propertyType)


export const versionsType = PropTypes.shape({
  admin: PropTypes.string,
  app: PropTypes.string,
})

export const simplifiedPropertyType = PropTypes.shape({
  isId: PropTypes.bool,
  isSortable: PropTypes.bool,
  isTitle: PropTypes.bool,
  isVisible: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  position: PropTypes.number,
  type: PropTypes.string,
  availableValues: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  })),
  reference: PropTypes.oneOfType([PropTypes.string]),
})

export const actionType = PropTypes.shape({
  actionType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showFilter: PropTypes.bool,
})

export const resourceParentType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
})

export const resourceType = PropTypes.shape({
  editProperties: PropTypes.arrayOf(propertyType).isRequired,
  filterProperties: PropTypes.arrayOf(propertyType).isRequired,
  href: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  listProperties: PropTypes.arrayOf(propertyType).isRequired,
  name: PropTypes.string.isRequired,
  parent: resourceParentType.isRequired,
  resourceActions: PropTypes.arrayOf(actionType).isRequired,
  showProperties: PropTypes.arrayOf(propertyType).isRequired,
  titleProperty: propertyType.isRequired,
})

export const resourceParentWithResourcesType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(resourceType).isRequired,
})

export const recordType = PropTypes.shape({
  params: PropTypes.object.isRequired,
  populated: PropTypes.object,
  errors: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  recordActions: PropTypes.arrayOf(actionType).isRequired,
})

export const locationType = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
})

export const historyType = PropTypes.shape({
  push: PropTypes.func.isRequired,
})

export const matchType = PropTypes.shape({
  params: PropTypes.shape({
    resourceId: PropTypes.string,
    recordId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    actionName: PropTypes.string,
  }),
})

export const childrenType = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string,
    PropTypes.number,
  ])),
  PropTypes.string,
  PropTypes.number,
])

export const noticeType = PropTypes.shape({
  message: PropTypes.string,
  progress: PropTypes.number,
  type: PropTypes.oneOf(['success', 'error']),
})
