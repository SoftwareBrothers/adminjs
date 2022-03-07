"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatSubProperties = void 0;

/**
 * Bu default all subProperties are nested as an array in root Property. This is easy for
 * adapter to maintain. But in AdminJS core we need a fast way to access them by path.
 *
 * This function changes an array to object recursively (for nested subProperties) so they
 * could be accessed via properties['path.to.sub.property']
 *
 * @param   {PropertyDecorator}  rootProperty
 *
 * @return  {Record<PropertyDecorator>}
 * @private
 */
const flatSubProperties = rootProperty => rootProperty.subProperties().reduce((subMemo, subProperty) => Object.assign(subMemo, {
  [subProperty.propertyPath]: subProperty
}, flatSubProperties(subProperty)), {});

exports.flatSubProperties = flatSubProperties;