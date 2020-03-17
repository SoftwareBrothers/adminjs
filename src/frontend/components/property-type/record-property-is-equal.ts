/* eslint-disable import/prefer-default-export */
import { EditPropertyProps, ShowPropertyProps } from './base-property-props'

/**
 * Function used in React memo to compare if previous property value and next
 * property value are the same.
 *
 * @private
 */
export const recordPropertyIsEqual = (
  prevProps: EditPropertyProps | ShowPropertyProps,
  nextProps: EditPropertyProps | ShowPropertyProps,
): boolean => {
  const prevValue = prevProps.record.params[prevProps.property.name]
  const nextValue = nextProps.record.params[nextProps.property.name]

  const prevError = prevProps.record.errors[prevProps.property.name]
  const nextError = nextProps.record.errors[nextProps.property.name]

  return prevValue === nextValue && prevError === nextError
}
