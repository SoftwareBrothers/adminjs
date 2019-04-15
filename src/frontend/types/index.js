import PropTypes from 'prop-types'

export const pathsType = PropTypes.shape({
  loginPath: PropTypes.string.isRequired,
  rootPath: PropTypes.string.isRequired,
  logoutPath: PropTypes.string.isRequired,
})

export const sessionType = PropTypes.shape({
  email: PropTypes.string.isRequired,
})

export const brandingType = PropTypes.shape({
  logo: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  softwareBrothers: PropTypes.bool.isRequired,
})

export const propertyType = PropTypes.shape({
  isId: PropTypes.bool.isRequired,
  isSortable: PropTypes.bool.isRequired,
  isTitle: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
})

export const actionType = PropTypes.shape({
  actionType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  icon: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
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
  recordActions: PropTypes.arrayOf(actionType).isRequired,
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
  id: PropTypes.string,
  title: PropTypes.string,
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
    recordId: PropTypes.string,
    actionName: PropTypes.string,
  }),
})
