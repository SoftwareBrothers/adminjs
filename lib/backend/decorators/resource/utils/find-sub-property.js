"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findSubProperty = void 0;

/**
 * @private
 *
 * @param   {PathParts}  pathParts    parts returned by `pathToParts` method
 * @param   {PropertyDecorator}       rootProperty where function should recursively search for
 *                                    a subProperty matching one of the pathParts
 *
 * @return  {PropertyDecorator | null}  found subProperty
 */
const findSubProperty = (pathParts, rootProperty) => {
  const subProperties = rootProperty.subProperties();
  const foundPath = pathParts.find(path => subProperties.find(supProperty => supProperty.propertyPath === path));

  if (foundPath) {
    const subProperty = subProperties.find(supProperty => supProperty.propertyPath === foundPath);

    if (subProperty && foundPath !== pathParts[pathParts.length - 1]) {
      // if foundPath is not the last (full) path - checkout recursively all subProperties
      return findSubProperty(pathParts, subProperty);
    }

    return subProperty || null;
  }

  return null;
};

exports.findSubProperty = findSubProperty;